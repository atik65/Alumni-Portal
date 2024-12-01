from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializer import UserInfoSerializer, LoginSerializer,  UserRegisterSerializer, RoleSerializer
from .models import UserInfo
from cms.models import Role




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