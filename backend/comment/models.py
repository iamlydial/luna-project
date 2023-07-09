from django.contrib.auth import get_user_model
from django.db import models
from review.models import Review

User = get_user_model()


class Comment(models.Model):
    text = models.CharField(max_length=300, blank=True)
    user = models.ForeignKey(to=User, related_name='comments', on_delete=models.CASCADE)
    review = models.ForeignKey(to=Review, related_name='comments', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} : {self.review}, {self.date_created}'
