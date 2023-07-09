from rest_framework import serializers

from comment.serializers import CommentSerializer
from restaurant.serializers import RestaurantSerializer
from review.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        restaurant = RestaurantSerializer()
        fields = ['id', 'text_content', 'created', 'updated', 'user', 'liked_by', 'rating',
                  'restaurant']
        read_only_fields = ['user', 'restaurant']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['restaurant'] = RestaurantSerializer(instance.restaurant, many=False, context=self.context).data
        representation['comments'] = CommentSerializer(instance.comments, many=True, allow_null=True).data
        return representation
