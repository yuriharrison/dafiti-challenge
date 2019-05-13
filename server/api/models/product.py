import os
import random

from django.urls import reverse
from django.conf import settings
from django.db import models
from django.db.models import Q
from django.db.models.signals import pre_save, post_save
from django.core.files.storage import FileSystemStorage
from django.contrib.postgres.fields import ArrayField

from .baseManager import BaseManager
from ..utils import unique_slug_generator


def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    # print(instance)
    #print(filename)
    new_filename = random.randint(1,3910209312)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "products/{new_filename}/{final_filename}".format(
            new_filename=new_filename, 
            final_filename=final_filename
            )


class ProductQuerySet(models.query.QuerySet):

    def active(self):
        return self.filter(active=True)

    def featured(self):
        return self.filter(featured=True, active=True)

    def search(self, query):
        lookups = (Q(title__icontains=query) | 
                  Q(description__icontains=query) |
                  Q(price__icontains=query) |
                  Q(tag__title__icontains=query)
                  )
        return self.filter(lookups).distinct()


class ProductManager(BaseManager):

    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)

    def active(self):
        return self.get_queryset().active()

    def featured(self): #Product.objects.featured() 
        return self.get_queryset().featured()

    def get_by_id(self, id):
        qs = self.get_queryset().filter(id=id) # Product.objects == self.get_queryset()
        if qs.count() == 1:
            return qs.first()
        return None

    def search(self, query):
        return self.get_queryset().active().search(query)


class Product(models.Model):
    brand           = models.CharField(max_length=120)
    title           = models.CharField(max_length=120)
    slug            = models.SlugField(blank=True, max_length=130)
    description     = models.TextField()
    price           = models.DecimalField(decimal_places=2, max_digits=20, default=39.99)
    featured        = models.BooleanField(default=False)
    active          = models.BooleanField(default=True)
    timestamp       = models.DateTimeField(auto_now_add=True)
    is_digital      = models.BooleanField(default=False)
    image           = models.ImageField(blank=False, upload_to='static/productImg/', max_length=200)
    sizes           = ArrayField(models.CharField(max_length=60, blank=True), size=10)
    colors          = ArrayField(models.CharField(max_length=10, blank=True), size=10)

    # Type Choices
    SHOES           = 'SH'
    CLOTHING        = 'CL'
    BAGS            = 'BA'
    TYPE            = (
        (SHOES,     'Shoes'),
        (CLOTHING,  'Clothing'),
        (BAGS,      'Bags'),
    )
    type            = models.CharField(max_length=2, choices=TYPE)

    objects         = ProductManager()

    def __str__(self):
        return self.title

    def __unicode__(self):
        return self.title

    @property
    def name(self):
        return self.title

    def get_downloads(self):
        qs = self.productfile_set.all()
        return qs

    def before_save(self):
        if not self.slug:
            self.slug = unique_slug_generator(self)

    def save(self, *a, **kw):
        self.before_save()
        super().save()