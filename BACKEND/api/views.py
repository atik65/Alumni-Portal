from rest_framework import viewsets, permissions, filters  # type: ignore

from .serializers import serializers
from cms.models import Blog

from django_filters.rest_framework import DjangoFilterBackend, FilterSet  # type: ignore
from django_filters import CharFilter  # type: ignore


class BlogFilter(FilterSet):

    # To enable substring filtering (icontains) across multiple fields, you can define a custom FilterSet with CharFilter for each field, specifying the lookup_expr='icontains'. This allows you to filter multiple fields based on partial matches.

    title = CharFilter(field_name="title", lookup_expr="icontains")
    content = CharFilter(field_name="content", lookup_expr="icontains")

    class Meta:
        model = Blog
        fields = ["title", "content"]


# Create your views here.
class BlogsViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = serializers.BlogSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = ["title", "content"]  # Allow full-text search on these fields
    # filterset_fields = ['title']
    filterset_class = BlogFilter  # Use the custom filter set
    ordering_fields = ["created_at", "updated_at", "title"]
    ordering = ["-created_at"]  # Default ordering
