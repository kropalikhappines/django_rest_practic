from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    help = 'Create superuser and some test users'

    
    def add_arguments(self, parser):
        parser.add_argument('count', type=int)


    def handle(self, *args, **options):
        User.objects.all().delete()
        user_count = options['count']
        User.objects.create_superuser('ars', 'ars@yandex.ru', 'Ars30394')
        for i in range(user_count):
            User.objects.create_user(f'user{i}', f'user{i}@yandex.ru', 'Ars30394', 'Alex')
        

        print('done')