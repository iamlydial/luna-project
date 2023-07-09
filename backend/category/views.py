from rest_framework.generics import ListCreateAPIView

from category.models import Category
from category.serializers import CategorySerializer


class CategoryListView(ListCreateAPIView):
    """
        get:
        List all categories in alphabetical order

        post:
        create a new category (admin only)
    """
    # todo: permission: post only for admins
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
