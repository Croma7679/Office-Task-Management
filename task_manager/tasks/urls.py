from django.urls import path
from .views import RegisterView,LoginView,UserView,LogoutView
from .views import PromoteToLeaderView,DemoteToMemberView,GetTeamLeadersView,GetTeamMembersView
from .views import ReceivedataView,CompletedTaskView,TeamleaderTasklistView,CompletedTaskleaderView
urlpatterns=[
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view()),
    
    path('task', ReceivedataView.as_view()),
    path('team-members', GetTeamMembersView.as_view()),
    path('team-leaders',GetTeamLeadersView.as_view()),
    path('team-members/<int:id>/promote_to_leader', PromoteToLeaderView.as_view()),
    path('team-leaders/<int:id>/demote_to_member', DemoteToMemberView.as_view()),
    path('complete_task/<int:id>',CompletedTaskView.as_view()),
    path('complete_task',CompletedTaskView.as_view()),
    path('teamleadertasklist',TeamleaderTasklistView.as_view()),
    path('completed_taskleader/<int:id>',CompletedTaskleaderView.as_view()),
    path('completed_taskleader',CompletedTaskleaderView.as_view()),
    path('teamleadertasklist/<int:id>', TeamleaderTasklistView.as_view()),
    path('task/<int:id>', ReceivedataView.as_view()),

]