from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import User


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
