# Generated by Django 4.2.2 on 2023-07-04 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0001_initial'),
        ('category', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='restaurants',
            field=models.ManyToManyField(related_name='categories', to='restaurant.restaurant'),
        ),
    ]
