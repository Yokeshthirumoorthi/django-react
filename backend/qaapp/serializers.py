from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Qaapp

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', )


class QaappSerializer(serializers.ModelSerializer):
    # Create new qa associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

    class Meta:
        model = Qaapp
        exclude = ('user', )
