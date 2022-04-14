# from django.shortcuts import get_object_or_404
# from rest_framework.viewsets import ViewSet
from rest_framework import mixins, viewsets


# from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import UserViewSet
from .serializers import UserSerializer


# class UserModelView(ViewSet):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

#     def list(self, request):
#         users = User.objects.all()
#         serializer_class = UserSerializer(users, many=True)
#         return Response(serializer_class.data)
    
#     def retrieve(self, request, pk=None):
#         user = get_object_or_404(User, pk=pk)
#         serializer_class = UserSerializer(user)
#         return Response(serializer_class.data)
    
#     def update(self, request, pk=None, format=None):
#         user = get_object_or_404(User, pk=pk)
#         serializer_class = UserSerializer(user)
#         return Response(serializer_class.data)

class UserCustomViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = UserViewSet.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

