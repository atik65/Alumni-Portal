from django.urls import path, include
from rest_framework import routers
from .views import BlogsViewSet

router = routers.DefaultRouter()

router.register(r'blogs', BlogsViewSet, 'blogs')


urlpatterns = [
    # path('', views.blog_list, name='blog_list'),
    path('', include(router.urls)),
]