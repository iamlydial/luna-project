from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
PRICE_LEVEL_CHOICES = [
    (1, '$'),
    (2, '$$'),
    (3, '$$$'),
]


def user_directory_path(instance, filename):
    return f'restaurant/{instance.id}/{filename}'


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    country = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip = models.CharField(max_length=9, blank=True)
    website = models.URLField(max_length=200, blank=True)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=100, blank=True)
    opening_hours = models.CharField(max_length=100)
    price_level = models.IntegerField(choices=PRICE_LEVEL_CHOICES, default=1)
    image = models.ImageField(blank=True, null=True, upload_to=user_directory_path)
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='restaurants')
    created = models.DateTimeField(auto_now_add=True)
    rating_average = models.FloatField(default=0)
    review_count = models.IntegerField(default=0)

    def update_review_fields(self):
        reviews = self.reviews.all()
        self.rating_average = reviews.aggregate(models.Avg('rating')).get('rating__avg')
        self.review_count = reviews.count()
        self.save(update_fields=['rating_average', 'review_count'])

    def __str__(self):
        return f'{self.name}'
