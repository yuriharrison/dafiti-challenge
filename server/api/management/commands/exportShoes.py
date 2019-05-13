from django.core.management.base import BaseCommand

from ...models import Shoes


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        Shoes.pg_objects.to_csv('./shoes.csv')
        self.stdout.write(self.style.SUCCESS('Data Exported!'))