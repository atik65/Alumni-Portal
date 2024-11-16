
from rest_framework import viewsets
from .serializers import serializers
from cms.models import Blog
from rest_framework import permissions

# Create your views here.
class BlogsViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = serializers.BlogSerializer
    permission_classes = [permissions.AllowAny]

