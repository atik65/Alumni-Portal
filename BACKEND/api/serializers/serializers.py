from rest_framework import serializers  # type: ignore
from django.contrib.auth.models import User
from cms.models import (
    Blog,
    # User,
    Job,
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
)


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


# class ContactSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Contact
#         fields = "__all__"


# class MessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Message
#         fields = "__all__"


# class DonationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Donation
#         fields = "__all__"


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = "__all__"


# class MentorshipSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Mentorship
#         fields = "__all__"


# class ConnectionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Connection
#         fields = "__all__"


class NewsFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsFeed
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
