from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import UserViewSet


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserViewSet
        fields = ('username', 'first_name', 'last_name', 'email')

        
