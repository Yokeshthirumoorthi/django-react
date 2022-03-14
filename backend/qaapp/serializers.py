from rest_framework import serializers
from .models import Qaapp


class QaappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qaapp
        fields = ('id', 'question', 'answer')
