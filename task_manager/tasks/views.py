from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer,TeamLeaderSerializer,TeamMemberSerializer
from .models import User
from rest_framework import status
import jwt,datetime
from jwt import decode
from django.views.decorators.csrf import csrf_exempt
from .models import TeamLeader,TeamMember
from .models import Task,CompletedTask,TeamleaderTasklist,CompletedTaskleader
from .serializers import TaskSerializer,CompletedTaskSerializer,TeamleaderTasklistSerializer,CompletedTaskleaderSerializer



class RegisterView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class LoginView(APIView):
    def post(self,request):
     username =request.data.get('username')
     password=request.data.get('password')
     

     user=User.objects.filter(username=username).first()

     if user is None:
        raise AuthenticationFailed('User not found!')
     
     if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password')
     
     payload={
        'id':user.id,
        'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=720),
        'iat':datetime.datetime.utcnow()
     }

     token=jwt.encode(payload,'secret',algorithm='HS256')
     
     response=Response()

     response.set_cookie(key='jwt',value=token,httponly=True)
     response.data={
        'jwt':token,
        'role':user.role
     }
     return response
     
class UserView(APIView):
    def get(self,request):
        token=request.COOKIES.get('jwt')

        if not token:
           raise AuthenticationFailed('Unauthenticated!')
        
        try:
           payload=jwt.decode(token,'secret',algorithm=['HS256'])

        except jwt.ExpiredSignatureError:
           raise AuthenticationFailed('Unauthenticated!')
    
        user=User.objects.filter(id=payload['id']).first()
        serializer=UserSerializer(user)
           
        return Response(serializer.data)
    
class LogoutView(APIView):
      def post(self,request):
          response=Response()
          response.delete_cookie('jwt')
          response.data={
              'message':'success' 
          }
          return response



    

class GetTeamMembersView(APIView):
    def get(self, request):
        team_members = TeamMember.objects.all()
        serializer = TeamMemberSerializer(team_members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetTeamLeadersView(APIView):
    def get(self, request):
        team_leaders = TeamLeader.objects.all()
        serializer = TeamLeaderSerializer(team_leaders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class PromoteToLeaderView(APIView):
    def post(self, request,id):
      #   member_id = request.data.get(id=id)

        try:
            member = TeamMember.objects.get(id = id)
        except TeamMember.DoesNotExist:
            return Response({"error": "Team member not found"}, status=status.HTTP_404_NOT_FOUND)

        if member.is_leader:
            return Response({"error": "This member is already a leader"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new TeamLeader entry
        leader = TeamLeader(team_member=member)
        leader.save()

        return Response({"message": "Member promoted to leader successfully"}, status=status.HTTP_201_CREATED)

class DemoteToMemberView(APIView):
    def post(self, request,id):
      #   tmember_id = request.data.get('member_id')

        try:
            leader = TeamLeader.objects.get(team_member_id = id)
        except TeamLeader.DoesNotExist:
            return Response({"error": "Team leader not found"}, status=status.HTTP_404_NOT_FOUND)

        # Delete the TeamLeader entry
        leader.delete()

        return Response({"message": "Leader demoted to member successfully"}, status=status.HTTP_200_OK)
    

class ReceivedataView(APIView):
        def post(self,request):
           serializer = TaskSerializer(data=request.data)
           if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

           return Response(serializer.data)
        
        def get(self, request):
            tasks = Task.objects.all()
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        def put(self, request, id):
            try:
                task = Task.objects.get(id=id)
            except Task.DoesNotExist:
                return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

            serializer = TaskSerializer(task, data=request.data)
            if serializer.is_valid(raise_exception=True):
               serializer.save()
               return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CompletedTaskView(APIView):
    def post(self, request, id):
        try:
            task = Task.objects.get(id=id)
        except Task.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Create a completed task
        completed_task_data = {
            'task': task.task,
            'description': task.description,
            'start_date': task.start_date,
            'end_date': task.end_date,
            
        }
        completed_serializer = CompletedTaskSerializer(data=completed_task_data)
        if completed_serializer.is_valid():
            completed_serializer.save()
            task.delete()  
            return Response(completed_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(completed_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        gg = CompletedTask.objects.all()
        serializer = CompletedTaskSerializer(gg, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        


class TeamleaderTasklistView(APIView):
        def post(self,request):
           serializer = TeamleaderTasklistSerializer(data=request.data)
           if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

           return Response(serializer.data)
        
        def get(self, request):
            tasks = TeamleaderTasklist.objects.all()
            serializer = TeamleaderTasklistSerializer(tasks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        def put(self, request, id):
            try:
                task = TeamleaderTasklist.objects.get(id=id)
            except TeamleaderTasklist.DoesNotExist:
                return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

            serializer = TeamleaderTasklistSerializer(task, data=request.data)
            if serializer.is_valid(raise_exception=True):
               serializer.save()
               return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompletedTaskleaderView(APIView):
    def post(self, request, id):
        try:
            task = TeamleaderTasklist.objects.get(id=id)
        except TeamleaderTasklist.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Create a completed task
        completed_task_data = {
            'task': task.task,
            'description': task.description,
            'start_date': task.start_date,
            'end_date': task.end_date,
            
        }
        completed_serializer = CompletedTaskleaderSerializer(data=completed_task_data)
        if completed_serializer.is_valid():
            completed_serializer.save()
            task.delete()  
            return Response(completed_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(completed_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        gg = CompletedTaskleader.objects.all()
        serializer = CompletedTaskleaderSerializer(gg, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)