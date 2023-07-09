from rest_framework.generics import DestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.response import Response

from comment.models import Comment
from comment.serializers import CommentSerializer
from email_scheduler.models import EmailScheduler
from project.permissions import IsOwnerAdminOrReadOnly
from review.models import Review


class CreateCommentView(CreateAPIView):
    """
        post:
        Comment on a review by providing the review id
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def post(self, request, *args, **kwargs):
        review_id = self.kwargs.get('review_id')
        review = Review.objects.get(pk=review_id)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user, review=review)

        # create email to review-author
        mail_instance = EmailScheduler.objects.all()
        subject = 'Luna-3: your review got commented'
        message = f'Dear {review.user.username}\n\n' \
                  f'Your review on {review.restaurant.name} just got a new comment.\n' \
                  f'{request.user.username} said:\n\n' \
                  f'{request.data.text}\n\n' \
                  f'So go on, and review other restaurants!\n\n' \
                  f'See you soon on luna3!'
        mail_instance.create(subject=subject, message=message, recipient_list=review.user.email)

        return Response(serializer.data)


class GetUserCommentsView(ListAPIView):
    """
        get:
        Get all the comments from a single user by user_id
    """
    serializer_class = CommentSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Comment.objects.filter(user_id=user_id).order_by('-date_created')


class DeleteCommentView(DestroyAPIView):
    """
        delete:
        Delete a comment by providing the comment id (owner or admin only)
    """
    permission_classes = [IsOwnerAdminOrReadOnly, ]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    lookup_url_kwarg = 'comment_id'
