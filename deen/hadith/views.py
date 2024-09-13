from django.shortcuts import render
from rest_framework import generics, filters,status
from rest_framework.response import Response
from .models import AppUser, Post, Comment
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import action,api_view,permission_classes
from rest_framework.parsers import MultiPartParser, FormParser


# Create your views here.
class UserView(generics.ListCreateAPIView):
    queryset = AppUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    parser_classes=[MultiPartParser,FormParser]


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
        post=Post.objects.get(pk=pk)
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
    


    



    


