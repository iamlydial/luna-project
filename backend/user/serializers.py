from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


# class UserSerializerFollow(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['first_name', 'last_name']
#

class UserSerializer(serializers.ModelSerializer):
    # user_follows = UserSerializerFollow(read_only=True, many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'location', 'user_phone', 'user_description',
                  'date_joined', 'profile_picture']
        read_only_fields = ['email', 'date_joined', 'id']
