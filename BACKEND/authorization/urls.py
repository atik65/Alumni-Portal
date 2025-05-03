from django.urls import path, include
from rest_framework import routers  # type: ignore
# from .views import BlogsViewSet, JobViewSet
from .views import RegisterView, LoginView, UserInfoView,UserRolesView

router = routers.DefaultRouter()

router.register(r"signup", RegisterView, "register")
router.register(r"login", LoginView, "login")
router.register(r"users", UserInfoView, "userInfos")
router.register(r"roles", UserRolesView, "UserRoles")
# router.register(r"registration-requests", RegistrationRequestView, "RegistrationRequests")

# router.register(r"blogs", BlogsViewSet, "blogs")

urlpatterns = [
    # path('', views.blog_list, name='blog_list'),
    path("", include(router.urls)),
]
