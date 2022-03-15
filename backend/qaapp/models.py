from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model

User = get_user_model()


class Qaapp(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    question = models.TextField()
    answer = models.TextField()

    def _str_(self):
        return self.question
