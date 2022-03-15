from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Qaapp
from .serializers import QaappSerializer


class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Qaapp.objects.order_by("id")
    serializer_class = QaappSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        # Get only qa about current authenticated user
        qs = qs.filter(user=self.request.user)

        return qs
