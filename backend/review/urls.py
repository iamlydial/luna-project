from django.urls import path

from review.views import CreateReviewsView, ListRestaurantReviewsView, RetrieveUpdateDeleteReviewsView, \
    ToggleLikeReview, ListUserReviewsView, ListLikedReviews, ListCommentedReviews


urlpatterns = [
    path('new/<int:restaurant_id>/', CreateReviewsView.as_view()),
    path('restaurant/<int:restaurant_id>/', ListRestaurantReviewsView.as_view()),
    path('user/<int:user_id>/', ListUserReviewsView.as_view()),
    path('<int:review_id>/', RetrieveUpdateDeleteReviewsView.as_view()),
    path('like/<int:review_id>/', ToggleLikeReview.as_view()),
    path('likes/', ListLikedReviews.as_view()),
    path('comments/', ListCommentedReviews.as_view())
]
