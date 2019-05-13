from django.urls import reverse
from django.db.models.signals import pre_save, post_save

from postgres_copy import CopyManager

from . import Product, ProductManager


class ShoesManager(ProductManager):
    
    def all(self):
        return self.filter(type=self.model.SHOES)
    

class Shoes(Product):
    class Meta:
        proxy = True
        verbose_name = 'Shoes'
        verbose_name_plural = 'Shoes'
    
    objects = ShoesManager()
    pg_objects = CopyManager()

    def before_save(self):
        if not self.pk:
            self.type = self.SHOES
            self.is_digital = False
        super().before_save()
