from django.db import models
from django.contrib.auth.models import User
from cms.models import Role

# Create your models here.

class UserInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    # name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    # phone = models.CharField(max_length=20)
    # address = models.TextField()
    # graduation_year = models.IntegerField()
    # degree = models.CharField(max_length=255)
    # interests = models.TextField()
    # achievements = models.TextField()

    def __str__(self):
        return self.first_name 