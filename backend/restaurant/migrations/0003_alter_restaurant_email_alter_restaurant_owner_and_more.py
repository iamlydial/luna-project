# Generated by Django 4.2.2 on 2023-07-06 11:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurant', '0002_restaurant_description_alter_restaurant_zip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='email',
            field=models.EmailField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='restaurants', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='rating_average',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='review_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='website',
            field=models.URLField(blank=True, default=''),
        ),
    ]