from rest_framework import viewsets, permissions, filters  # type: ignore

from .serializers import serializers
from cms.models import Blog, Job, Event, NewsFeed
from authorization.models import UserInfo

from django_filters.rest_framework import DjangoFilterBackend, FilterSet  # type: ignore
from django_filters import CharFilter  # type: ignore
from django_filters import NumberFilter  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework.pagination import LimitOffsetPagination  # type: ignore
from rest_framework import status  # type: ignore


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


# class UserFilter(FilterSet):
#     name = CharFilter(field_name="name", lookup_expr="icontains")
#     email = CharFilter(field_name="email", lookup_expr="icontains")
#     interests = CharFilter(field_name="interests", lookup_expr="icontains")

#     class Meta:
#         model = User
#         fields = {
#             "degree",
#             "graduation_year",
#         }


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = serializers.UserSerializer
#     permission_classes = [permissions.AllowAny]
#     filter_backends = [
#         DjangoFilterBackend,
#         filters.SearchFilter,
#         filters.OrderingFilter,
#     ]
#     search_fields = ["name", "email", "interests", "achievements"]
#     filterset_class = UserFilter
#     ordering_fields = ["graduation_year", "name"]
#     ordering = ["-name"]


class JobFilter(FilterSet):
    min_salary = NumberFilter(field_name="salary", lookup_expr="gte")
    max_salary = NumberFilter(field_name="salary", lookup_expr="lte")
    min_experience = NumberFilter(field_name="experience", lookup_expr="gte")
    max_experience = NumberFilter(field_name="experience", lookup_expr="lte")

    class Meta:
        model = Job
        fields = {
            "jobType",
            "location",
            "company",
        }


class JobViewSet(viewsets.GenericViewSet):
    """
    ViewSet for managing job postings.
    """

    queryset = Job.objects.all().order_by("-posted_date")
    pagination_class = LimitOffsetPagination
    serializer_class = serializers.JobSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = ["job_title", "company", "description", "location"]
    # filterset_class = JobFilter
    filterset_fields = {
        "jobType": ["iexact"],
        "location": ["iexact"],
        "company": ["iexact"],
    }
    ordering_fields = ["posted_date", "salary", "experience", "job_title"]
    ordering = ["-posted_date"]  # Default ordering by posted date, descending

    def list(self, request):
        """
        List all job postings.
        """
        queryset = self.get_queryset()
        filtered_queryset = self.filter_queryset(queryset)
        paginated_queryset = self.paginate_queryset(filtered_queryset)

        if paginated_queryset is not None:
            serializer = self.get_serializer(paginated_queryset, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(filtered_queryset, many=True)
        return Response({"status": status.HTTP_200_OK, "results": serializer.data})

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific job posting.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"status": status.HTTP_200_OK, "result": serializer.data})

    def create(self, request, *args, **kwargs):
        """
        Create a new job posting.
        """
        if request.user.is_authenticated:

            user = request.user
            user_info = UserInfo.objects.get(user=user)

            if user_info.role.id == 1:
                return Response(
                    {
                        "status": status.HTTP_401_UNAUTHORIZED,
                        "error": "You are not authorized to Create this job",
                    }
                )

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            # headers = self.get_success_headers(serializer.data)
            return Response(
                {
                    
                    "message": "Job created successfully",
                    "status": status.HTTP_201_CREATED, "result": serializer.data}
            )

        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to Create this job",
                }
            )

    def update(self, request, *args, **kwargs):
        """
        Update an existing job posting.
        """
        if request.user.is_authenticated:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "result": serializer.data})
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to Update this job",
                }
            )

    def destroy(self, request, *args, **kwargs):
        """
        Delete a job posting.
        """
        if request.user.is_authenticated:
            instance = self.get_object()
            instance.delete()
            return Response(
                {"status": status.HTTP_200_OK, "result": "Job deleted successfully"}
            )
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to delete this job",
                }
            )


class EventViewSet(viewsets.GenericViewSet):
    """
    ViewSet for managing events.
    """

    queryset = Event.objects.all().order_by("-date")  # Default ordering by event date
    pagination_class = LimitOffsetPagination
    serializer_class = serializers.EventSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # Searchable fields
    search_fields = ["event_name", "description", "location", "event_type"]

    # Filterable fields
    filterset_fields = {
        "event_type": ["iexact"],  # Case-insensitive exact match for event type
        "location": ["iexact"],  # Case-insensitive exact match for location
    }

    # Fields allowed for ordering
    ordering_fields = ["date", "event_name", "event_type", "location"]
    ordering = ["-date"]  # Default ordering by descending event date

    def list(self, request, *args, **kwargs):
        """
        List all events.
        """
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"status": status.HTTP_200_OK, "results": serializer.data})

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific event.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"status": status.HTTP_200_OK, "result": serializer.data})

    def create(self, request, *args, **kwargs):
        """
        Create a new event.
        """
        if request.user.is_authenticated:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {"status": status.HTTP_201_CREATED, "result": serializer.data}
            )
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to Create this Event",
                }
            )

    def update(self, request, *args, **kwargs):
        """
        Update an existing event.
        """
        if request.user.is_authenticated:
            partial = kwargs.pop("partial", False)
            instance = self.get_object()
            serializer = self.get_serializer(
                instance, data=request.data, partial=partial
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "result": serializer.data})
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to Update this Event",
                }
            )

    def destroy(self, request, *args, **kwargs):
        """
        Delete an event.
        """
        if request.user.is_authenticated:
            instance = self.get_object()
            instance.delete()
            return Response(
                {"status": status.HTTP_200_OK, "result": "Event deleted successfully"}
            )
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to delete this Event",
                }
            )


class NewsFeedViewSet(viewsets.GenericViewSet):
    """
    ViewSet for managing NewsFeed.
    """

    queryset = NewsFeed.objects.all().order_by(
        "-date_posted"
    )  # Default ordering by date_posted
    pagination_class = LimitOffsetPagination
    serializer_class = serializers.NewsFeedSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # Searchable fields
    search_fields = ["title", "content", "type"]

    # Filterable fields
    filterset_fields = {
        "type": ["iexact"],  # Case-insensitive exact match for type
    }

    # Fields allowed for ordering
    ordering_fields = ["date_posted", "title", "type"]
    ordering = ["-date_posted"]  # Default ordering by descending date_posted

    def list(self, request, *args, **kwargs):
        """
        List all NewsFeeds.
        """
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"status": status.HTTP_200_OK, "results": serializer.data})

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific NewsFeed.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"status": status.HTTP_200_OK, "result": serializer.data})

    def create(self, request, *args, **kwargs):
        """
        Create a new NewsFeed.
        """
        if request.user.is_authenticated:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {"status": status.HTTP_201_CREATED, "result": serializer.data}
            )
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to Create this NewsFeed",
                }
            )

    def update(self, request, *args, **kwargs):
        """
        Update an existing NewsFeed.
        """
        if request.user.is_authenticated:
            partial = kwargs.pop("partial", False)
            instance = self.get_object()
            serializer = self.get_serializer(
                instance, data=request.data, partial=partial
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "result": serializer.data})
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to Update this NewsFeed",
                }
            )

    def destroy(self, request, *args, **kwargs):
        """
        Delete a NewsFeed.
        """
        if request.user.is_authenticated:
            instance = self.get_object()
            instance.delete()
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "result": "NewsFeed deleted successfully",
                }
            )
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "error": "You are not authorized to delete this NewsFeed",
                }
            )
