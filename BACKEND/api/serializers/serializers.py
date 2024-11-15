from rest_framework import serializers
from  cms.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Blog
        fields = '__all__'