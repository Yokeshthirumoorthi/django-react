
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import QaappView
from .viewsets import QAViewSet

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('owner/', QaappView.as_view(), name='qaappowner'),
]

router = DefaultRouter()
router.register(r'qas', QAViewSet)
urlpatterns += router.urls
