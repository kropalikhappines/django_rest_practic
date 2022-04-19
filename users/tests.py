from http import client
from http.client import ImproperConnectionState
import imp
import math
from pydoc import cli
from urllib import response

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, force_authenticate, APISimpleTestCase, APITestCase, CoreAPIClient
from mixer.backend.django import mixer
# from django.contrib.auth.models import User

from users.views import UserCustomViewSet
from projectapp.views import ProjectsModelViewSet, ToDoModelViewSet
from users.models import UserViewSet
from projectapp.models import Projects, ToDo
# Create your tests here.




class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'Admin1234'
        self.email = 'admin1234@yandex.ru'

        self.data = {'username': 'alex123', 'first_name': 'Alex', 'last_name': 'Pushkin', 'password': 'Alex1234', 'email': 'alex1234@yandex.ru'}
        self.data_put = {'first_name': 'Grisha', 'last_name': 'Polyak', 'username': 'grisha123', 'password': 'Grisha1234', 'email': 'grisha1234@yandex.ru'}
        self.url = '/api/users/'
        self.admin = UserViewSet.objects.create_superuser(username=self.name, email=self.email, password=self.password)
        self.factory_API = APIRequestFactory()
        self.clientAPI = APIClient()


    def test_get_list(self):
        request = self.factory_API.get(self.url)
        view = UserCustomViewSet.as_view({'get':'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_user(self):
        request = self.factory_API.post(self.url, self.data, format='json')
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_create_admin(self):
        request = self.factory_API.post(self.url, self.data, format='json')
        force_authenticate(request, self.admin)
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_get_detail(self):
        user = UserViewSet.objects.create(**self.data)
        response = self.clientAPI.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_user_api(self):
        user = UserViewSet.objects.create(**self.data)
        response = self.clientAPI.put(f'{self.url}{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_create_admin_api(self):
        user = UserViewSet.objects.create(**self.data)
        self.clientAPI.login(username=self.name, password=self.password)
        response = self.clientAPI.put(f'{self.url}{user.id}/', self.data_put)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        auth = UserViewSet.objects.get(id=user.id)
        self.assertEqual(auth.first_name, 'Grisha')
        self.assertEqual(auth.last_name, 'Polyak')
        self.assertEqual(auth.email, 'grisha1234@yandex.ru')
        self.clientAPI.logout()


    def tearDown(self) -> None:
        pass


class TestProjectsViewSet(APITestCase):
    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'Admin1234'
        self.email = 'admin1234@yandex.ru'

        self.data_user = {'username': 'alex123', 'first_name': 'Alex', 'last_name': 'Pushkin', 'password': 'Alex1234', 'email': 'alex1234@yandex.ru'}
        self.data_user2 = {'username': 'grisha123', 'first_name': 'Grisha', 'last_name': 'Celov', 'password': 'Alex1234', 'email': 'grisha1234@yandex.ru'}
        self.user = UserViewSet.objects.create(**self.data_user)
        self.user2 = UserViewSet.objects.create(**self.data_user2)
        self.auth = UserViewSet.objects.get(id=self.user.id)
        self.auth2 = UserViewSet.objects.get(id=self.user2.id)
        self.authAll = [self.auth.id, self.auth2.id]
        print(self.authAll)
        self.data = {'name_proj': 'proj#1', 'repo_proj': 'https://github.com/kropalik_happines/'}
        self.data_put = {'name_proj': 'proj#12', 'repo_proj': 'https://github.com/kropalik_happines/1'}

        self.url = '/api/Projects/'
        self.admin = UserViewSet.objects.create_superuser(username=self.name, email=self.email, password=self.password)
        self.factory_API = APIRequestFactory()
        self.clientAPI = APIClient()


    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_put_admin(self):
        proj = Projects.objects.create(**self.data)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{proj.id}/', 
        {'name_proj': 'proj#12', 'repo_proj': 'https://github.com/kropalik_happines/1', 'users_proj': self.authAll})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        proj_ = Projects.objects.get(id=proj.id)
        self.assertEqual(proj_.name_proj, 'proj#12')
        self.client.logout()
    

    def test_put_mixer(self):
        proj = mixer.blend(Projects)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{proj.id}/', 
        {'name_proj': 'proj#12', 'repo_proj': 'https://github.com/kropalik_happines/1', 'users_proj': self.authAll})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass



# class TestProjectsCore(CoreAPIClient):

#     def setUp(self) -> None:
#         self.data = {'username': 'alex123', 'first_name': 'Alex', 'last_name': 'Pushkin', 'password': 'Alex1234', 'email': 'alex1234@yandex.ru'}

        
    

#     def test_core_api(self):
#         self.client = CoreAPIClient()
#         schema = client.get('http://127.0.0.1:8000/api/users/')
#         print(schema)
        



#     def tearDown(self) -> None:
#         pass