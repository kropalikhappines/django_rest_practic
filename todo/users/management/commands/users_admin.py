from django.core.management.base import BaseCommand
from users.models import UserViewSet
from django.contrib.auth.models import User


class Command(BaseCommand):
    

    def handle(self, *args, **options):
        UserViewSet.objects.create_superuser(username='ars', password='ars30394', email='admin@yandex.ru')