from django.db import models
from restaurant.models import Restaurant

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)
    restaurants = models.ManyToManyField(to=Restaurant, related_name='categories')

    def __str__(self):
        return self.name
