from unicodedata import name
from django_filters import rest_framework as filters
from .models import Projects, ToDo


class ProjectFilter(filters.FilterSet):
    name_proj = filters.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = Projects
        fields = ['name_proj']

class ToDoFilter(filters.FilterSet):
    create = filters.DateFromToRangeFilter()
    
    class Meta:
        model = ToDo
        fields = ['todo_proj', 'create']
