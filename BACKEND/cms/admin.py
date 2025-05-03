from django.contrib import admin
from cms.models import (
    Blog,
    Job,
    Role,
    NewsFeed,
    Event,
    Post,
    Comment,
    RegistrationRequest

)

# Register your models here.
admin.site.register(Blog)


# admin.site.register(User)



admin.site.register(Job)


# admin.site.register(Contact)


# admin.site.register(Message)



# admin.site.register(Donation)



admin.site.register(Role)



# admin.site.register(UserProfile)



# admin.site.register(Mentorship)



# admin.site.register(Connection)



admin.site.register(NewsFeed)



admin.site.register(Event)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(RegistrationRequest)