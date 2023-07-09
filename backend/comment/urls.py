from django.urls import path
from comment.views import CreateCommentView, GetUserCommentsView, DeleteCommentView

urlpatterns = [
    path('new/<int:review_id>/', CreateCommentView.as_view()),
    path('<int:user_id>/', GetUserCommentsView.as_view()),
    path('delete/<int:comment_id>/', DeleteCommentView.as_view()),
]
