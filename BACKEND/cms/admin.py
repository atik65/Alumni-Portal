from django.contrib import admin
from cms.models import (
    Blog,
    User,
    Job,
    Contact,
    Message,
    Donation,
    UserRole,
    UserProfile,
    Mentorship,
    Connection,
    NewsFeed,
    Event,
)

# Register your models here.
admin.site.register(Blog)


admin.site.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ("id", "name", "email", "phone", "graduation_year", "degree")
#     search_fields = ("name", "email", "phone")
#     list_filter = ("graduation_year",)


admin.site.register(Job)
# class JobAdmin(admin.ModelAdmin):
#     list_display = ("id", "job_title", "company", "location", "posted_date")
#     search_fields = ("job_title", "company", "location")
#     list_filter = ("posted_date",)


admin.site.register(Contact)
# class ContactAdmin(admin.ModelAdmin):
#     list_display = ("id", "user", "profile", "phone", "email")


admin.site.register(Message)
# class MessageAdmin(admin.ModelAdmin):
#     list_display = ("id", "sender", "receiver", "timestamp", "status")
#     search_fields = ("sender__name", "receiver__name", "status")
#     list_filter = ("status", "timestamp")


admin.site.register(Donation)
# class DonationAdmin(admin.ModelAdmin):
#     list_display = ("id", "user", "amount", "date", "cause")
#     search_fields = ("user__name", "cause")
#     list_filter = ("date",)


admin.site.register(UserRole)
# class UserRoleAdmin(admin.ModelAdmin):
#     list_display = ("id", "role_name", "description")
#     search_fields = ("role_name",)


admin.site.register(UserProfile)
# class UserProfileAdmin(admin.ModelAdmin):
#     list_display = ("id", "user", "linkedin_url", "twitter_handle")
#     search_fields = ("user__name", "linkedin_url", "twitter_handle")


admin.site.register(Mentorship)
# class MentorshipAdmin(admin.ModelAdmin):
#     list_display = ("id", "mentor", "mentee", "start_date", "status")
#     search_fields = ("mentor__name", "mentee__name", "status")
#     list_filter = ("start_date", "status")


admin.site.register(Connection)
# class ConnectionAdmin(admin.ModelAdmin):
#     list_display = ("id", "user1", "user2", "status")
#     search_fields = ("user1__name", "user2__name", "status")
#     list_filter = ("status",)


admin.site.register(NewsFeed)
# class NewsFeedAdmin(admin.ModelAdmin):
#     list_display = ("id", "title", "date_posted", "type")
#     search_fields = ("title", "type")
#     list_filter = ("type", "date_posted")


admin.site.register(Event)
# class EventAdmin(admin.ModelAdmin):
#     list_display = ("id", "event_name", "date", "event_type", "location")
#     search_fields = ("event_name", "event_type", "location")
#     list_filter = ("event_type", "date")
