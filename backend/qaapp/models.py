from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.utils import timezone

User = get_user_model()


class Qaapp(models.Model):
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE)
    group = models.ForeignKey(
        Group, null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    critical = models.BooleanField(default=False)
    question = models.TextField(default="")
    answer = models.TextField(default="")

    def _str_(self):
        return self.question
