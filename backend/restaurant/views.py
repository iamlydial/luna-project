from django.contrib.auth import get_user_model
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView

from email_scheduler.models import EmailScheduler
from project.permissions import IsOwnerAdminOrReadOnly
from restaurant.models import Restaurant
from restaurant.serializers import RestaurantSerializer
from review.models import Review
from review.serializers import ReviewSerializer
from user.serializers import UserSerializer

User = get_user_model()


class RestaurantListView(ListAPIView):
    """
        get:
        List all the Restaurants in order of their rating
    """
    serializer_class = RestaurantSerializer

    def get_queryset(self):

        if self.request._request.path == '/api/home/':
            queryset = Restaurant.objects.all().order_by('-rating_average')[:4]
        else:
            queryset = Restaurant.objects.all().order_by('-rating_average')
        return queryset


class RestaurantUserListView(ListAPIView):
    """
        get:
        List all the Restaurants of a specific user in order of their rating
    """
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Restaurant.objects.filter(owner_id=user_id).order_by('-rating_average')


class RestaurantCategoryListView(ListAPIView):
    """
        get:
        List all the Restaurants of a specific category in order of their rating
    """
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Restaurant.objects.filter(categories__contains=category_id).order_by('-rating_average')


class RestaurantCreateView(CreateAPIView):
    """
        post:
        create a new restaurant
    """
    serializer_class = RestaurantSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

        # create email to user for confirmation
        mail_instance = EmailScheduler.objects.all()
        subject = 'Luna-3: new restaurant created'
        message = f'Dear {self.request.user.username}\n\n' \
                  f'You get this email to confirm, that you have just created a new restaurant:\n\n' \
                  f'{serializer.data["name"]} in {serializer.data["city"]}, {serializer.data["country"]}\n\n' \
                  f'See you soon on luna3!'
        mail_instance.create(subject=subject, message=message, recipient_list=self.request.user.email)


class RestaurantGetUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get the details of a restaurant by providing the id of the restaurant

        patch:
        Update a restaurant by id (allowed only for owner or admin)

        delete:
        Delete a restaurant by id (allowed only for owner or admin)
    """
    permission_classes = [IsOwnerAdminOrReadOnly, ]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    lookup_url_kwarg = 'id'

    def perform_update(self, serializer):
        serializer.save()

        # create email to user for confirmation
        mail_instance = EmailScheduler.objects.all()
        subject = 'Luna-3: restaurant updated'
        message = f'Dear {self.request.user.username}\n\n' \
                  f'You get this email to confirm, that the data of your restaurant has been updated:\n\n' \
                  f'{serializer.data["name"]} in {serializer.data["city"]}, {serializer.data["country"]}\n\n' \
                  f'See you soon on luna3!'
        mail_instance.create(subject=subject, message=message, recipient_list=self.request.user.email)

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass


class GeneralSearchListView(ListAPIView):
    """
        get:
        Search for ‘restaurants’, ‘reviews’ or ‘users’
        EXAMPLE - /api/search/?type=restaurants&search_string=Pub
        additional filter for category for restaurants and reviews
    """

    def get_serializer_class(self):
        search_type = self.request.query_params.get('type', None)
        if search_type == 'restaurants':
            return RestaurantSerializer
        if search_type == 'reviews':
            return ReviewSerializer
        if search_type == 'users':
            return UserSerializer
        return RestaurantSerializer

    def get_queryset(self):
        search_type = self.request.query_params.get('type', None)
        search_string = self.request.query_params.get('search_string', None)
        search_category = self.request.query_params.get('category', None)

        if search_type == 'restaurants':
            queryset = Restaurant.objects.all().order_by('-rating_average')
            if search_string is not None:
                queryset = queryset.filter(name__icontains=search_string)
            if search_category is not None:
                queryset = queryset.filter(categories__name=search_category)
            return queryset

        if search_type == 'reviews':
            queryset = Review.objects.all()
            if search_string is not None:
                queryset = queryset.filter(text_content__icontains=search_string)
            if search_category is not None:
                queryset = queryset.filter(restaurant__categories__name=search_category)
            return queryset

        if search_type == 'users' and search_string is not None:
            return User.objects.filter(Q(username__icontains=search_string) |
                                       Q(first_name__icontains=search_string) |
                                       Q(last_name__icontains=search_string))
        return
