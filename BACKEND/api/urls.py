from django.urls import path, include
from rest_framework import routers  # type: ignore
from .views import BlogsViewSet, JobViewSet

router = routers.DefaultRouter()

router.register(r"blogs", BlogsViewSet, "blogs")
router.register(r"jobs", JobViewSet, "jobs")


urlpatterns = [
    # path('', views.blog_list, name='blog_list'),
    path("", include(router.urls)),
]
