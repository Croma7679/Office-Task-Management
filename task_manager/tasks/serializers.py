from rest_framework import serializers
from .models import User,TeamMember,TeamLeader
from .models import Task,CompletedTask,TeamleaderTasklist,CompletedTaskleader


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password','role']
        extra_kwargs={
            'password':{'write_only':True}
        }
    

    def create(self, validated_data):
        password=validated_data.pop('password',None)
        instance=self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task', 'description', 'start_date', 'end_date']




class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'rank', 'gender', 'date_of_joining', 'is_leader']

class TeamLeaderSerializer(serializers.ModelSerializer):
    team_member = TeamMemberSerializer()

    class Meta:
        model = TeamLeader
        fields = ['team_member']


class CompletedTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedTask
        fields = '__all__'


class TeamleaderTasklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamleaderTasklist
        fields = ['id', 'task', 'description', 'start_date', 'end_date']

class CompletedTaskleaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedTaskleader
        fields = '__all__'
