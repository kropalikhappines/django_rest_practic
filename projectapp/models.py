
from django.db import models
from users.models import User

# Create your models here.

class Projects(models.Model):
    name_proj = models.CharField(max_length=64, unique=True)
    repo_proj = models.URLField(null=True, max_length=200, unique=True)
    users_proj = models.ManyToManyField(User)

    def __str__(self):
        return self.name_proj


class ToDo(models.Model):
    active_or_close = models.BooleanField(default=True)
    todo_proj = models.ForeignKey(Projects, on_delete=models.CASCADE)
    todo_user = models.ForeignKey(User, on_delete=models.PROTECT)
    text_proj = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True) 
    update_at = models.DateTimeField(auto_now=True)
