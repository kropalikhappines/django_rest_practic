# Generated by Django 3.2.12 on 2022-04-14 12:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projectapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='todo_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='projects',
            name='users_proj',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
