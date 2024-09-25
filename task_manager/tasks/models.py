from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username=models.CharField(max_length=100,unique=True)
    password=models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=(('Admin', 'Admin'), ('Team Leader', 'Team Leader'), ('Team Member', 'Team Member')), default='Team Member')

    USERNAME_FIELD='username'

class Task(models.Model):
    task = models.CharField(max_length=255,default='Default Task Name',null=True)
    description = models.TextField(max_length=1000)
    start_date = models.DateField()
    end_date = models.DateField()


class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    rank = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    date_of_joining = models.DateField()
    is_leader = models.BooleanField(default=False)

class TeamLeader(models.Model):
    team_member = models.OneToOneField(TeamMember, on_delete=models.CASCADE, related_name='leader')

class CompletedTask(models.Model):
    task = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    

class TeamleaderTasklist(models.Model):
    task = models.CharField(max_length=255,default='Default Task Name',null=True)
    description = models.TextField(max_length=1000)
    start_date = models.DateField()
    end_date = models.DateField()

class CompletedTaskleader(models.Model):
    task = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()

   

