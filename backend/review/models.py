from django.db import models
from restaurant.models import Restaurant
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

User = get_user_model()


class Review(models.Model):
    text_content = models.CharField(max_length=500)
    rating = models.IntegerField(default=0, validators=[MaxValueValidator(5), MinValueValidator(0)])
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='reviews')
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE, related_name='reviews')
    liked_by = models.ManyToManyField(to=User, related_name='likes', blank=True)

    def save(self, *args, **kwargs):
        super(Review, self).save(*args, **kwargs)
        self.restaurant.update_review_fields()
