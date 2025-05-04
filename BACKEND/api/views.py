from rest_framework import viewsets, permissions, filters  # type: ignore
from .serializers import serializers
from cms.models import Blog, Job, Event, NewsFeed, Post, Comment, RegistrationRequest
from authorization.models import UserInfo
from authorization.serializer import UserInfoSerializer

from django_filters.rest_framework import DjangoFilterBackend, FilterSet  # type: ignore
from django_filters import CharFilter  # type: ignore
from django_filters import NumberFilter  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework.pagination import LimitOffsetPagination  # type: ignore
from rest_framework import status  # type: ignore
from rest_framework import generics
from rest_framework.decorators import action
from django.contrib.auth.models import User
from cms.models import Role


   
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
        return Response({"status": status.HTTP_200_OK, "result": serializer.data}, status=status.HTTP_200_OK)

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
                        "message": "You are not authorized to Create this job",
                    },
                    status=status.HTTP_401_UNAUTHORIZED
                )

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            # headers = self.get_success_headers(serializer.data)
            return Response(
                {
                    "message": "Job created successfully",
                    "status": status.HTTP_201_CREATED,
                    "result": serializer.data,
                }
            )

        else:
            
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "message": "You are not authorized to Create this job",
                },
                status=status.HTTP_401_UNAUTHORIZED,
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
                    "message": "You are not authorized to Update this job",
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
                    "message": "You are not authorized to delete this job",
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
        queryset = self.filter_queryset(self.get_queryset()).order_by("-id")
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


class PostViewSet(viewsets.GenericViewSet):
    """
    ViewSet for managing posts.
    """

    queryset = Post.objects.all().order_by(
        "-created_at"
    )  # Default ordering by date_posted
    pagination_class = LimitOffsetPagination
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "id"
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = ["post"]

    # filterset_fields = {
    #     "post": ["iexact"],  
    # }

    ordering_fields = ["created_at", "id"]
    ordering = ["-created_at"]  # Default ordering by descending date_posted

    def list(self, request, *args, **kwargs):
        """
        List all posts.
        """
        queryset = self.filter_queryset(self.get_queryset())

        
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"status": status.HTTP_200_OK, "results": serializer.data})

    def create(self, request, *args, **kwargs):
        """
        Create a new post.
        """
        if request.user.is_authenticated:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(created_by=request.user)
            return Response(
                {"status": status.HTTP_201_CREATED, "result": serializer.data},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "message": "You are not authorized to Create this Post",
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

   
class CommentListGetCreateView(generics.ListCreateAPIView):
    serializer_class = serializers.CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id).order_by('-created_at')

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        serializer.save(user=self.request.user, post_id=post_id)




# Registration Request View

class RegistrationRequestView(viewsets.GenericViewSet):
    queryset = RegistrationRequest.objects.all()
    serializer_class = serializers.RegistrationRequestSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["firstName", "lastName", "email"]
    filterset_fields = {
        # "role": ["id"],  
    }
    # ordering_fields = ["first_name", "last_name", "email", "id", 'created_at', 'updated_at']
    # ordering = ["-first_name"]

    def list(self, request):
        
        queryset = self.get_queryset()
        filtered_queryset = self.filter_queryset(queryset)
        paginated_queryset = self.paginate_queryset(filtered_queryset)
        permission_classes = [permissions.IsAuthenticated]

        if paginated_queryset is not None:
            serializer = self.get_serializer(paginated_queryset, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(filtered_queryset, many=True)
        # return Response({"status": status.HTTP_200_OK, "results": serializer.data})
        return Response(serializer.data)    
    def retrieve(self, request, *args, **kwargs):
        permission_classes = [permissions.IsAuthenticated]
        instance = self.queryset.filter(id=kwargs['id']).first()
        if not instance:
            return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Registration request not found."})
        serializer = self.get_serializer(instance, context={'request': request})
        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        permission_classes = [permissions.IsAuthenticated]
        instance = self.queryset.filter(id=kwargs['id']).first()
        if not instance:
            return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Registration request not found."})
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "message": "Registration request updated successfully.", "data": serializer.data})
        return Response({"status": status.HTTP_400_BAD_REQUEST, "message": "Invalid data provided.", "errors": serializer.errors})
    
    def destroy(self, request, *args, **kwargs):
        permission_classes = [permissions.IsAuthenticated]
        instance = self.queryset.filter(id=kwargs['id']).first()
        if not instance:
            return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Registration request not found."})
        instance.delete()
        return Response({"status": status.HTTP_200_OK, "message": "Registration request deleted successfully."})
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(f"serializer = {serializer}")
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "status": status.HTTP_201_CREATED,
                    "message": "Registration request created successfully.",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid data provided.",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    @action(detail=True, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def approve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Registration request not found."})

        # # Mark as approved
        # instance.isApproved = True
        # instance.save()

        # Create user if not already exists
        user = User.objects.filter(email=instance.email).first()
      
        if not user:
            user = User.objects.create_user(
                username=instance.email,
                email=instance.email,
                first_name=instance.firstName,
                last_name=instance.lastName,
                password='12345678'
            )
            # Assign default role (id=2) for alumni
            role = Role.objects.filter(id=2).first()
            if not role:
                user.delete()
                return Response({"message": "Role does not exist"}, status=400)

            user_info = UserInfo.objects.create(
                user=user,
                role=role,
                first_name=instance.firstName,
                last_name=instance.lastName,
                email=instance.email,
                avatar=instance.avatar,
                description='As an esteemed graduate of our university, this alumnus embodies the values of excellence, integrity, and lifelong learning. Through dedication to academic pursuits and active engagement in extracurricular activities, they have developed a strong foundation for personal and professional growth. Their commitment to innovation, leadership, and service is evident in their ongoing contributions to their chosen field and broader community. As part of our vibrant alumni network, they continue to foster meaningful connections, support fellow graduates, and inspire future generations. We are proud to recognize their achievements and celebrate their ongoing journey as a valued member of our alumni family.',
                phone=instance.phone,
                address=instance.address,
                graduation_year=instance.graduationYear,
                batch=instance.batch,
                current_company=instance.currentCompany,
                current_position=instance.currentPosition,
                experience=instance.experience,
                skills=instance.skills,
                interests=instance.interests,
                achievements='',
                facebook=instance.facebook,
                twitter=instance.twitter,
                linkedin=instance.linkedin,
                instagram=instance.instagram
            )
            user_info.save()

            instance.isApproved = True
            instance.save()
        else:   
            return Response({
                "status": status.HTTP_200_OK,
                "message": "User already exists.",
            }, status=status.HTTP_400_BAD_REQUEST)

        # Optionally, serialize and return user_info if you want
        return Response({
            "status": status.HTTP_200_OK,
            "message": "Registration request approved and user registered.",
            "user_info": UserInfoSerializer(user_info).data if user_info else None,
        })

    @action(detail=True, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def reject(self, request, *args, **kwargs):
        instance = self.get_object()
        body = request.data
        if not instance:
            return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Registration request not found."})

        instance.isApproved = False
        instance.rejectionReason = body.get('rejectionReason', '')
        instance.save()

        return Response({
            "status": status.HTTP_200_OK,
            "message": "Registration request rejected.",
        })