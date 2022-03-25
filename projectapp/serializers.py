from dataclasses import field
import imp
from rest_framework.serializers import ModelSerializer


from .models import Projects, ToDo


class ProjectModelSerializers(ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'

class ToDoModelSerializers(ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'