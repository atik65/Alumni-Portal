from rest_framework import serializers


# from api.serializers.serializers import UserRoleSerializer
from .models import UserInfo
# from django.contrib.auth.models import User
from cms.models import Role, Post
from django.contrib.auth.models import User
from cms.models import RegistrationRequest

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"

class UserIsSuperUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["is_superuser" , "id"]

class UserRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()
    confirm_password = serializers.CharField()


class UserInfoSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    avatar = serializers.ImageField(use_url=True, required=False, allow_null=True)
    user = UserIsSuperUserSerializer(read_only=True)
    class Meta:  
        model = UserInfo
        fields = "__all__"


class UserInfoRegisterSerializer(serializers.Serializer):    
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


