from django.db import models
from django.contrib.auth.models import User
from cms.models import Role
from django.db.models import JSONField

# Create your models here.

class UserInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    description = models.TextField(null=True, blank=True, default="")
    phone = models.CharField(max_length=14, null=True, blank=True, default="")
    address = models.TextField(null=True, blank=True, default="")
    graduation_year = models.IntegerField(null=True, blank=True, default=None)
    batch = models.IntegerField(null=True, blank=True, default=None)
    current_company = models.CharField(max_length=255, null=True, blank=True, default="")
    current_position = models.CharField(max_length=255, null=True, blank=True, default="")
    experience = models.TextField(null=True, blank=True, default="")
    skills = models.JSONField(null=True, blank=True, default=list)
    interests = models.JSONField(null=True, blank=True, default=list)
    achievements = models.TextField(null=True, blank=True, default="")
    facebook = models.URLField(null=True, blank=True, default="")
    twitter = models.URLField(null=True, blank=True, default="")
    linkedin = models.URLField(null=True, blank=True, default="")
    instagram = models.URLField(null=True, blank=True, default="")
    

    def __str__(self):
        return self.first_name 