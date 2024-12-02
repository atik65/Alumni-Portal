from django.urls import path, include
from rest_framework import routers  # type: ignore
from .views import BlogsViewSet, JobViewSet, EventViewSet, NewsFeedViewSet,PostViewSet

router = routers.DefaultRouter()

router.register(r"blogs", BlogsViewSet, "blogs")
router.register(r"jobs", JobViewSet, "jobs")
router.register(r"events", EventViewSet, basename="events")
router.register(r"newsfeeds", NewsFeedViewSet, basename="newsfeeds")
router.register(r"posts", PostViewSet, basename="posts")
# router.register(r"user", UserViewSet, "user")


urlpatterns = [
    # path('', views.blog_list, name='blog_list'),
    path("", include(router.urls)),
]
