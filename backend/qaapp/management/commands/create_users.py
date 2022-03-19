from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model


UserModel = get_user_model()


class Command(BaseCommand):
    def handle(self, **options):
        # Create admin users
        if not UserModel.objects.filter(username='admin').exists():
            user = UserModel.objects.create_user('admin', password='admin')
            user.is_superuser = True
            user.is_staff = True
            user.save()

        # Create client users and groups.
        tech_group, created = Group.objects.get_or_create(name="TechGroup")
        fin_group, created = Group.objects.get_or_create(name="FinanceGroup")

        usernames = ["tech_user1", "tech_user2",
                     "fin_user1", "fin_user2"]

        for username in usernames:
            if get_user_model().objects.filter(username=username).exists():
                user = get_user_model().objects.get(username=username)
            else:
                user = get_user_model().objects.create_user(
                    username=username,
                    email="",
                    password=username,
                )

            if username in ["tech_user1", "tech_user2"]:
                user.groups.add(tech_group)

            if username in ["fin_user1", "fin_user2"]:
                user.groups.add(fin_group)
