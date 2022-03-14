from django.contrib import admin
from .models import Qaapp


class QaappAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer')


# Register your models here.
admin.site.register(Qaapp, QaappAdmin)
