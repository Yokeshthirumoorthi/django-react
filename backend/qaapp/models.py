from django.db import models

# Create your models here.


class Qaapp(models.Model):
    question = models.TextField()
    answer = models.TextField()

    def _str_(self):
        return self.question
