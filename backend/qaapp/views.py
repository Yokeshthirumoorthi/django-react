from django.shortcuts import render
from rest_framework import viewsets
from .serializers import QaappSerializer
from .models import Qaapp

# Create your views here.


class QaappView(viewsets.ModelViewSet):
    serializer_class = QaappSerializer
    queryset = Qaapp.objects.all()
