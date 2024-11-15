from django.db import models


# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)