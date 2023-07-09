from django.urls import path

from restaurant.views import RestaurantListView, RestaurantCreateView, RestaurantGetUpdateDeleteView, \
    RestaurantUserListView, RestaurantCategoryListView

urlpatterns = [
    path('', RestaurantListView.as_view()),
    path('new/', RestaurantCreateView.as_view()),
    path('category/<int:category_id>/', RestaurantCategoryListView.as_view()),
    path('user/<int:user_id>/', RestaurantUserListView.as_view()),
    path('<int:id>/', RestaurantGetUpdateDeleteView.as_view()),
    ]
