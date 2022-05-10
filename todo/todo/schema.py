import graphene
from graphene import ObjectType, Schema, List, Field, Int, String, Mutation, ID
from graphene_django import DjangoObjectType
from users.models import UserViewSet
from projectapp.models import Projects, ToDo


class UsersType(DjangoObjectType):

    class Meta:
        model = UserViewSet
        fields = '__all__'


class ProjectsType(DjangoObjectType):

    class Meta:
        model = Projects
        fields = '__all__'


class ToDoType(DjangoObjectType):

    class Meta:
        model = ToDo
        fields = '__all__'



# {
# 	projectsName{
#     nameProj
#     usersProj{
#       username
#       todoSet{
#         textProj
#       }
#     }
#   }
# }
class Query(ObjectType):

    ToDo_id = List(ToDoType)
    projects_name = List(ProjectsType)
    users_name = List(UsersType, id=Int(required=True))


    def resolve_projects_name(root, info):
        return Projects.objects.all()
    

        
    def resolve_ToDo_id(root, info, id=None):
        return ToDo.objects.all()


    def resolve_users_name(root, info, id=None):
        try:
            return UserViewSet.objects.get(id=id)
        except UserViewSet.DoesNotExist:
            return None



class UserUpdateMutation(Mutation):

    class Arguments:
        first_name = String()
        last_name = String()
        print(first_name)
        id = ID()

    user = Field(UsersType)

    @classmethod
    def mutate(cls,root,info,first_name,id, last_name):
        user = UserViewSet.objects.get(id=id)
        user.last_name = last_name
        user.first_name = first_name
        user.save()
        return UserUpdateMutation(user=user)


class UserCreateMutation(Mutation):

    class Arguments:
        username = String()
        first_name = String()
        last_name = String()
        email = String()

    user = Field(UsersType)

    @classmethod
    def mutate(cls,root,info,username,first_name,last_name,email):
        user = UserViewSet.objects.create(username=username,first_name=first_name,last_name=last_name,email=email)
        return UserUpdateMutation(user=user)


class UserDeleteMutation(Mutation):

    class Arguments:
        id = ID()

    user = List(UsersType)

    @classmethod
    def mutate(cls,root,info,id):
        UserViewSet.objects.get(id=id).delete()
        return UserUpdateMutation(user=UserViewSet.objects.all())


class Mutations(ObjectType):
    update_user  = UserUpdateMutation.Field()
    create_user = UserCreateMutation.Field()
    delete_user = UserDeleteMutation.Field()


schema = Schema(query=Query, mutation=Mutations)