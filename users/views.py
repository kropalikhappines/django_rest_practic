from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer


class UserModelViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    