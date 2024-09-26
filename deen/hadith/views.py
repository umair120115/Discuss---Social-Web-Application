from django.shortcuts import render,get_object_or_404
from rest_framework import generics, filters,status
from rest_framework.response import Response
from .models import AppUser, Post, Comment, FriendRequest, Friendship
from .serializers import UserSerializer, PostSerializer, CommentSerializer,FriendRequestSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import action,api_view,permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.http import JsonResponse



# Create your views here.
class Users(generics.ListAPIView):
    queryset=AppUser.objects.all()
    permission_classes=[AllowAny]
    serializer_class=UserSerializer
    def get_queryset(self):
        user=self.request.user.id

        return AppUser.objects.exclude(id=user)

class UserView(generics.ListCreateAPIView):
    queryset = AppUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    parser_classes=[MultiPartParser,FormParser]
    def get_queryset(self):
        user=self.request.user

        return AppUser.objects.filter(id=user.id)

class UpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset=AppUser.objects.all()
    permission_classes=[IsAuthenticated]
    serializer_class=UserSerializer
    parser_classes=[MultiPartParser,FormParser]
    lookup_field='pk'
    

    def perform_update(self, serializer):
        instance=serializer.instance
        
        serializer.save()

        


class PostView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    queryset = Post.objects.select_related('user')

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
    
   
    # @action(methods=['post'],detail=True)
    # def like_post(self, request, pk):
    #     post = self.get_object()
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def like_post(request,pk):
    try:
        # post=Post.objects.get(pk=pk)
        post=get_object_or_404(Post,pk=pk)
        if request.user in post.like.all():
            post.like.remove(request.user)
            return Response({'status':'post desliked'})
        else:
            post.like.add(request.user)
            return Response({'status':'post likes'})
    except Post.DoesNotExist:
        return Response({'error':'Post not found'},status=404)


class CommentView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        post_id=self.kwargs.get('post_id')
        post=Post.objects.get(id=post_id)
        if serializer.is_valid():
            serializer.save(author=self.request.user,post=post)
    def get_queryset(self):
        post_id=self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)
    


#for sending friend request to friend or user
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friend_request_view(request, user_id):
    User=get_user_model()
    if request.method == 'POST':
        from_user = request.user  # Assuming user is authenticated and `request.user` is available
        try:
            to_user = get_object_or_404(AppUser,id=user_id)
            print(to_user)
            print(from_user)
            if from_user != to_user:
                friend_request, created = FriendRequest.objects.get_or_create(from_user=from_user, to_user=to_user)
                if created:
                    return JsonResponse({'status': 'success', 'message': 'Friend request sent successfully!'})
                else:
                    return JsonResponse({'status': 'error', 'message': 'Friend request already exists!'})
            else:
                return JsonResponse({'status': 'error', 'message': 'You cannot send a friend request to yourself!'})
        except AppUser.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User not found!'})
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method!'}, status=400)

#for getting friend requests sent to the user
class RequestView(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class=FriendRequestSerializer
    queryset=FriendRequest.objects.all()

    def get_queryset(self):
        user=self.request.user
        print(user)
        requests=FriendRequest.objects.filter(to_user=user)
        return requests


#for accepting friend request
def accept_friend_request(request):
    request.accepted = True
    request.save()
    
    # Create friendship relationship
    Friendship.objects.create(user=request.from_user, friend=request.to_user)
    Friendship.objects.create(user=request.to_user, friend=request.from_user)

# for declining friend request
def decline_friend_request(request):
    request.delete()

# for getting friend's list
def get_friends(user):
    friends = Friendship.objects.filter(user=user)
    return [friendship.friend for friendship in friends]



    


