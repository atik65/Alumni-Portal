from django.shortcuts import render
from rest_framework import viewsets
from .serializers import serializers
from cms.models import Blog

# Create your views here.
class BlogsViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = serializers.BlogSerializer

