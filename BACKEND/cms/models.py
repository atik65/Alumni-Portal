from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models import JSONField
# from authorization.models import UserInfo
# from authorization.models import UserInfo


# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(null=True, blank=True)
    # date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    updated_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return self.title


# class User(models.Model):
#     name = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     phone = models.CharField(max_length=20)
#     address = models.TextField()
#     graduation_year = models.IntegerField()
#     degree = models.CharField(max_length=255)
#     interests = models.TextField()
#     achievements = models.TextField()

#     def __str__(self):
#         return self.name


class Job(models.Model):
    FULL_TIME = "Full-Time"
    PART_TIME = "Part-Time"
    REMOTE = "Remote"
    INTERN = "Intern"

    JOB_TYPE_CHOICES = [
        (FULL_TIME, "Full-Time"),
        (PART_TIME, "Part-Time"),
        (REMOTE, "Remote"),
        (INTERN, "Intern"),
    ]
    job_title = models.CharField(max_length=255, default="")
    company = models.CharField(max_length=255, null=True, blank=True, default="")
    location = models.CharField(max_length=255, null=True, blank=True, default="")
    description = models.TextField(default="")
    posted_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    jobType = models.CharField(
        choices=JOB_TYPE_CHOICES, max_length=50, default="Full-Time"
    )
    deadline = models.DateTimeField(default=timezone.now, null=True, blank=True)
    experience = models.IntegerField(default=0, null=True, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    email = models.EmailField(null=True, blank=True, default="")

    def __str__(self):
        return self.job_title  # Return the first attribute 'job_title'


# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
#     profile_picture = models.ImageField(upload_to="profiles/", blank=True, null=True)
#     bio = models.TextField()
#     linkedin_url = models.URLField(blank=True)
#     twitter_handle = models.CharField(max_length=100, blank=True)

#     def __str__(self):
#         return self.user.name


# class Contact(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="contacts")
#     profile = models.ForeignKey(
#         UserProfile,
#         related_name="contacts",
#         on_delete=models.CASCADE,
#         null=True,
#         blank=True,
#     )

#     phone = models.CharField(max_length=20)
#     email = models.EmailField()

#     def __str__(self):
#         return self.contact_name


# class Message(models.Model):
#     sender = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="sent_messages"
#     )
#     receiver = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="received_messages"
#     )
#     content = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)
#     status = models.CharField(max_length=50)

#     def __str__(self):
#         return self.content[:50]

# class Donation(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="donations")
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
#     date = models.DateTimeField()
#     cause = models.TextField()

#     def __str__(self):
#         return f"{self.user.name} - {self.amount}"


class Role(models.Model):
    role_name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.role_name


# class Mentorship(models.Model):
#     mentor = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="mentorships_as_mentor"
#     )
#     mentee = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="mentorships_as_mentee"
#     )
#     start_date = models.DateField()
#     status = models.CharField(max_length=50)

#     def __str__(self):
#         return f"Mentor: {self.mentor.name} -> Mentee: {self.mentee.name}"


# class Connection(models.Model):
#     user1 = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="connections_as_user1"
#     )
#     user2 = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="connections_as_user2"
#     )
#     status = models.CharField(max_length=50)

#     def __str__(self):
#         return f"{self.user1.name} - {self.user2.name}"


class NewsFeed(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Event(models.Model):
    event_name = models.CharField(max_length=255)
    date = models.DateTimeField()
    event_type = models.CharField(max_length=50)
    location = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='event_images/', null=True, blank=True)

    def __str__(self):
        return self.event_name


class Post (models.Model):
    post = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="owner")


    def __str__(self):
        return self.post


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.id}"

    
class RegistrationRequest(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    email = models.EmailField(unique=False)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    avatar = models.ImageField(upload_to='profiles/', blank=True, null=True)
    graduationYear = models.IntegerField()
    batch = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    studentId = models.CharField(max_length=255)
    currentCompany = models.CharField(max_length=255, blank=True, null=True)
    currentPosition = models.CharField(max_length=255, blank=True, null=True)
    experience = models.IntegerField()
    # skills = models.TextField(null=True, blank=True, default="")
    # interests = models.TextField(null=True, blank=True, default="")

    skills = JSONField(null=True, blank=True, default=list)
    interests = JSONField(null=True, blank=True, default=list)

    achievements = models.TextField(null=True, blank=True, default="")
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    cv = models.ImageField(upload_to='documents/', blank=True, null=True)
    proofDocument = models.ImageField(upload_to='documents/', blank=True, null=True)
    isApproved = models.BooleanField(default=False)
    rejectionReason = models.TextField(blank=True, null=True, default="")
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    

    

    def __str__(self):
        return f"{self.firstName} {self.lastName} - {self.email}"