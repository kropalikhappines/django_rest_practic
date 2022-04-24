"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from django.contrib import admin
from django.urls import path
import graphql
from rest_framework.routers import DefaultRouter
from projectapp.views import ProjectsModelViewSet, ToDoModelViewSet
from users.views import UserCustomViewSet
# from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView


schema_view = get_schema_view(
    openapi.Info(
        title='todo',
        default_version='0.2',
        description='my projects',
        contact=openapi.Contact(email='ars@yandex.ru'),
        license=openapi.License(name='MT')
    ),
    public=True,
)


router = DefaultRouter()
router.register('Projects', ProjectsModelViewSet)
router.register('ToDo', ToDoModelViewSet)
router.register('users', UserCustomViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    # Tokens
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path('api/<str:version>/users/', UserCustomViewSet.as_view({'get': 'list'})),
    path('swagger/', schema_view.with_ui('swagger')),
    path('graphql/', GraphQLView.as_view(graphiql=True)),

]
