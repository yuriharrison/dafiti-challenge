# Generated by Django 2.2.1 on 2019-05-12 20:49

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20190512_1738'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='sizes',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=30), default=['37', '38', '39', '40', '41', '42'], size=10),
            preserve_default=False,
        ),
    ]
