import random

from django.core.management.base import BaseCommand

from faker import Faker

from ...models import Shoes
from .resources import imgs


def random_hex():
    r = lambda: random.randint(0,255)
    return '#%02X%02X%02X' % (r(),r(),r())


def random_price():
    return float(random.randrange(3000, 38009))/100


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        for _ in range(100):
            self.generate_and_save()

    def generate_and_save(self):
        fake = Faker('fr_FR')
        colors = [random_hex() for _ in range(random.randint(1,4))]
        sizes = [random.randint(36,46) for _ in range(random.randint(1,9))]
        Shoes(
            title=fake.sentence(),
            brand=fake.sentence(1).replace('.', ''),
            description=fake.text(),
            price=random_price(),
            image='static/productImg/{img}'.format(img=random.choice(imgs)),
            colors=colors,
            sizes=sizes,
        ).save()
            
            
