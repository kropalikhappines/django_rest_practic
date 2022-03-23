from django.db import models

from users.models import User

# Create your models here.

class Projects(models.Model):
    repo_proj = models.CharField(null=True, max_length=128, unique=True)
    users_proj = models.OneToOneField(User, on_delete=models.CASCADE)
