from rest_framework import serializers
from .models import UserInfo
# from django.contrib.auth.models import User
from cms.models import Role


class UserInfoSerializer(serializers.Serializer):  
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()
    confirm_password = serializers.CharField()


class UserInfoRegisterSerializer(serializers.Serializer):    
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()