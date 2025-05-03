from rest_framework import serializers  # type: ignore
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
import base64
import io

from authorization.models import UserInfo
from authorization.serializer import UserInfoSerializer

from cms.models import (
    Blog,
    # User,
    Job,
    Comment,
    # Contact,
    # Message,
    # Donation,
    # UserRole,
    # UserProfile,
    # Mentorship,
    # Connection,
    Role,
    NewsFeed,
    Event,
    Post,
    RegistrationRequest
)


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            # Decode base64 image
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]
            img_data = base64.b64decode(imgstr)
            file = ContentFile(img_data, name=f'temp.{ext}')
            return super().to_internal_value(file)
        return super().to_internal_value(data)


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # role = UserRoleSerializer(read_only=True)
        fields = ['id', 'first_name', 'last_name', 'email', 'username']

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"



class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class NewsFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsFeed
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Event
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    # user = UserShortSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def get_user(self, obj):
        try:
            user_info = UserInfo.objects.get(user=obj.user)
            return UserInfoSerializer(user_info).data
        except UserInfo.DoesNotExist:
            return None


class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    def get_created_by(self, obj):
        try:
            user_info = UserInfo.objects.get(user=obj.created_by)
            return UserInfoSerializer(user_info).data
        except UserInfo.DoesNotExist:
            return None

    class Meta:
        model = Post
        fields = ('id', 'post', 'created_at', 'updated_at', 'created_by', 'comments')

    def get_comments(self, obj):
        comments_qs = Comment.objects.filter(post_id=obj.id).order_by('-created_at')
        return CommentSerializer(comments_qs, many=True).data

    def validate_post(self, value):
        if len(value) < 10:
            raise serializers.ValidationError(
                "Post must be at least 10 characters long"
            )
        return value


class RegistrationRequestSerializer(serializers.ModelSerializer):
    avatar = Base64ImageField(required=False, allow_null=True)
    cv = Base64ImageField(required=False, allow_null=True)
    proofDocument = Base64ImageField(required=False, allow_null=True)


    skills = serializers.ListField(child=serializers.CharField(), required=False)
    interests = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = RegistrationRequest
        fields = "__all__"
