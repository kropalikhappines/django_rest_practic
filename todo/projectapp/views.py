from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .filters import ProjectFilter, ToDoFilter
from rest_framework.response import Response
from rest_framework import status


from .models import Projects, ToDo
from .serializers import ProjectModelSerializers, ToDoModelSerializers
# Create your views here.


class ProjectsLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20
class ProjectsModelViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = ProjectModelSerializers
    filterset_class = ProjectFilter
    pagination_class = ProjectsLimitOffsetPagination
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.active_or_close = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
        

class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = ToDoModelSerializers
    filterset_class = ToDoFilter
    pagination_class = ToDoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.active_or_close = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
        