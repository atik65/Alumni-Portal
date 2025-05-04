from django.urls import path, include
from rest_framework import routers  # type: ignore
from .views import BlogsViewSet, JobViewSet, EventViewSet, NewsFeedViewSet,PostViewSet, CommentListGetCreateView, RegistrationRequestView

router = routers.DefaultRouter()

router.register(r"blogs", BlogsViewSet, "blogs")
router.register(r"jobs", JobViewSet, "jobs")
router.register(r"events", EventViewSet, basename="events")
router.register(r"newsfeeds", NewsFeedViewSet, basename="newsfeeds")
router.register(r"posts", PostViewSet, basename="posts")
router.register(r"registration-requests", RegistrationRequestView, "RegistrationRequests")
# router.register(r"approve", RegistrationRequestView.approve(), "approve")
# router.register(r"user", UserViewSet, "user")


urlpatterns = [
    # path('', views.blog_list, name='blog_list'),
    path("", include(router.urls)),
    path('posts/<int:post_id>/comments/', CommentListGetCreateView.as_view(), name='comment-list-create'),

]
