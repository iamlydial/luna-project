from rest_framework import serializers

from category.serializers import CategorySerializer
from restaurant.models import Restaurant
from user.serializers import UserSerializer
# from review.serializers import ReviewSerializer


class RestaurantSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['categories'] = CategorySerializer(instance.categories, many=True).data
        representation['owner'] = UserSerializer(instance.owner, many=False, read_only=True).data
        # representation['reviews'] = ReviewSerializer(instance.reviews, many=True, read_only=True).data
        return representation

    class Meta:
        model = Restaurant
        fields = '__all__'
