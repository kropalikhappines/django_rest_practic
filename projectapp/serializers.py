import imp
from rest_framework.serializers import ModelSerializer


from .models import Projects


class ProjectModelSerializers(ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'