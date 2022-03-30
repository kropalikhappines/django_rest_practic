from email.policy import default
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from .models import Projects, ToDo
from .serializers import ProjectModelSerializers, ToDoModelSerializers
# Create your views here.


class ProjectsLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2
class ProjectsModelViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectModelSerializers
    pagination_class = ProjectsLimitOffsetPagination


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializers