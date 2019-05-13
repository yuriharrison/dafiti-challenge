from django import forms
from django.contrib import admin

from .models import Product, Shoes


class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    list_display = ['title', 'slug', 'featured']


class ShoesAdminForm(forms.ModelForm):
    class Meta:
        model = Shoes
        fields = ['title', 'slug', 'description', 'price', 'featured', 'active', 'image',
            'sizes', 'colors'
        ]


@admin.register(Shoes)
class ShoesAdmin(admin.ModelAdmin):
    form = ShoesAdminForm
    list_display = ['title', 'slug', 'featured']
    
    def get_queryset(self, request):
        return self.model.objects.all()

