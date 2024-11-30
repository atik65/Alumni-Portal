from django.urls import path, include
from rest_framework import routers  # type: ignore
from .views import BlogsViewSet, JobViewSet, UserViewSet

router = routers.DefaultRouter()

router.register(r"blogs", BlogsViewSet, "blogs")
router.register(r"jobs", JobViewSet, "jobs")
router.register(r"user", UserViewSet, "user")


urlpatterns = [
    # path('', views.blog_list, name='blog_list'),
    path("", include(router.urls)),
]
