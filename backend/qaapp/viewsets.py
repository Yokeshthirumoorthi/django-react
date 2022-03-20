from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Qaapp
from .serializers import QaappSerializer


class QAViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Qaapp.objects.order_by("id")
    serializer_class = QaappSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        # Get only qa of group where the user belongs to.
        if not self.request.user.is_superuser:
            qs = qs.filter(group__in=self.request.user.groups.all())

        return qs
