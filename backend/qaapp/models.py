from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model

User = get_user_model()


class Qaapp(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    critical = models.BooleanField(default=False)
    question = models.TextField()
    answer = models.TextField()

    def _str_(self):
        return self.question
