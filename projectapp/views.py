from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import Projects
from .serializers import ProjectModelSerializers
# Create your views here.

class ProjectsModelViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectModelSerializers
