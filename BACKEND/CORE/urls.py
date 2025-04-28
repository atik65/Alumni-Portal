"""
URL configuration for CORE project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

from drf_yasg.views import get_schema_view  # type: ignore
from drf_yasg import openapi  # type: ignore
from rest_framework import permissions  # type: ignore
from django.conf import settings
from django.conf.urls.static import static




schema_view = get_schema_view(
    openapi.Info(
        title="Alumni Portal API Documentation",
        default_version="v1",
        description="API documentation for Alumni Portal of University of Asia Pacific",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="atik.hasan.dev@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/v1/",
        include(
            [
                path("", include("api.urls")),
                path("auth/", include("authorization.urls")),
                #   swagger url for api documentation -- without ui
                path(
                    "swagger.json",
                    schema_view.without_ui(cache_timeout=0),
                    name="schema-json",
                ),
                #   swagger url for api documentation -- with ui
                path(
                    "swagger/",
                    schema_view.with_ui("swagger", cache_timeout=0),
                    name="schema-swagger-ui",
                ),
            ]
        ),
    ),
]


# Media files

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)