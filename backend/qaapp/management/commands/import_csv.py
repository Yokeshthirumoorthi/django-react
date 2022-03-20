import csv
from qaapp.models import Qaapp
from django.core.management.base import BaseCommand


# TODO: Add validations
class Command(BaseCommand):
    def handle(self, **options):
        with open("data/sample.csv") as f:
            csv_reader = csv.DictReader(f)
            for row in csv_reader:
                _, created = Qaapp.objects.update_or_create(
                    user_id=row.get("User"),
                    group_id=row.get("Group"),
                    critical=row.get("Critical"),
                    question=row.get("Question"),
                    answer=row.get("Answer"),
                )
