from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializer import UserInfoSerializer, LoginSerializer,  UserRegisterSerializer, RoleSerializer
from .models import UserInfo
from cms.models import Role
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination
from cms.models import RegistrationRequest




# Create your views here.

class RegisterView(viewsets.GenericViewSet):
    
    qureyset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def create(self, request):
         
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():

            try:

                # check if user already exists
                user = User.objects.filter(email=serializer.validated_data['email']).first()

                # print(f"user = {user}")

                if user:
                    # user already exists
                    return Response({"message": "User already exists"}, status=400)
                
                # check if email is valid -- must end with @uap-bd.edu
                if not serializer.validated_data['email'].endswith("@uap-bd.edu"):
                    return Response({"message": "Email must be a valid UAP address"}, status=400)

                # create user
                user = User.objects.create_user(
                username=serializer.validated_data['email'],
                email=serializer.validated_data['email'],
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'],
                )



                # set hashed password and save user
                user.set_password(serializer.validated_data['password'])
                user.save()

               
                
                # setting student role by default
                role = Role.objects.filter(id=1).first()

                if not role:
                    user.delete()
                    return Response({"message": "Role does not exist"}, status=400)

               
                if role is None:
                    return Response({"message": "Role does not exist"}, status=400)
                
                # create user info
                user_info = UserInfo.objects.create(
                    user=user,
                    role=role,
                    first_name=serializer.validated_data['first_name'],
                    last_name=serializer.validated_data['last_name'],
                    email=serializer.validated_data['email'], 

                )
            
                user_info.save()

                token = RefreshToken.for_user(user)
                access = str(token.access_token)
                refresh = str(token)

                role_serializer = RoleSerializer(role)
                user_info_serializer = UserInfoSerializer(user_info)

                return Response({
                    "message": "User created successfully",
                    "data": {
                       "user_info": user_info_serializer.data,
                       "role": role_serializer.data,                        
                       "status": status.HTTP_201_CREATED,

                    
                        "access": access,
                         "refresh": refresh
                       
                   }
                    
                }, status=status.HTTP_201_CREATED)

            except Exception as e:
                # return Response({"error": str(e)}, status=400)
                return Response({
                    "message": str(e),
                    "status": status.HTTP_400_BAD_REQUEST
                })
                

    
        return Response(serializer.errors)
    


class LoginView(viewsets.GenericViewSet):
    qureyset = User.objects.all()
    serializer_class = LoginSerializer
   
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():

            # find the user
            user = User.objects.filter(email=serializer.validated_data['email']).first()

            if user is None:
                return Response({"error": "User does not exist"}, status=400)

            # check password
            if not user.check_password(serializer.validated_data['password']):
                return Response({"error": "Email or Password wrong"}, status=400)

            # create token
            token = RefreshToken.for_user(user)
            access = str(token.access_token)
            refresh = str(token)

            user_info = UserInfo.objects.filter(user=user).first()

            if user_info is None:
                user_info = UserInfo.objects.create(
                    user=user,
                    first_name='',
                    last_name='',
                    email=user.email,
                    role= Role.objects.get(id=1)
                )

            user_info_serializer = UserInfoSerializer(user_info)
            role_serializer = RoleSerializer(user_info.role)

            return Response({
                "message": "User logged in successfully",
                "status": status.HTTP_200_OK,
                "data": {
                   "user_info": user_info_serializer.data,
                   "role": role_serializer.data,

                   
                   "access": access,
                    "refresh": refresh
                   
               }
                
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors)
    

class UserInfoView(viewsets.GenericViewSet):
    queryset = UserInfo.objects.all().order_by('first_name')
    serializer_class = UserInfoSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = LimitOffsetPagination
    lookup_field = 'user'
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["first_name", "last_name", "email"]
    filterset_fields = {
        # "role": ["id"],  
        # "role": ["id"],
    }
    # ordering_fields = ["first_name", "last_name", "email", "id", 'created_at', 'updated_at']
    # ordering = ["-first_name"]

    def get_queryset(self):
        queryset = super().get_queryset()
        role_id = self.request.query_params.get('role')
        if role_id is not None:
            queryset = queryset.filter(role_id=role_id)
        return queryset

    def list(self, request):
        
        queryset = self.get_queryset()
        filtered_queryset = self.filter_queryset(queryset)
        paginated_queryset = self.paginate_queryset(filtered_queryset)

        if paginated_queryset is not None:
            serializer = self.get_serializer(paginated_queryset, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(filtered_queryset, many=True, context={'request': request})
        return Response({"status": status.HTTP_200_OK, "results": serializer.data})
    
    def retrieve(self, request, *args, **kwargs):
        # extract user id from params
        user_id = kwargs.get('user')
        instance = self.queryset.filter(user=user_id).first()
        if not instance:
            return Response({"status": status.HTTP_404_NOT_FOUND, "message": "User info not found."})
        serializer = self.get_serializer(instance, context={'request': request})
        return Response(serializer.data)
            

class UserRolesView(viewsets.GenericViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["name"]
    filterset_fields = {
        # "role": ["id"],  
    }
    # ordering_fields = ["first_name", "last_name", "email", "id", 'created_at', 'updated_at']
    # ordering = ["-first_name"]

    def list(self, request):
        
        queryset = self.get_queryset()
        filtered_queryset = self.filter_queryset(queryset)
        paginated_queryset = self.paginate_queryset(filtered_queryset)

        if paginated_queryset is not None:
            serializer = self.get_serializer(paginated_queryset, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(filtered_queryset, many=True)
        return Response({"status": status.HTTP_200_OK, "results": serializer.data})
    

