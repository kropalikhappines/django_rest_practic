from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet


from .models import Projects, ToDo
from .serializers import ProjectModelSerializers, ToDoModelSerializers
# Create your views here.

class ProjectsModelViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectModelSerializers


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializers