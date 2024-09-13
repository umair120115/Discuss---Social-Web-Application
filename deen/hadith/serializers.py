from rest_framework import serializers
from .models import AppUser, Post, Comment




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', "username", "email", "password",'Name']

    def create(self, validated_data):
        user = AppUser.objects.create_user(**validated_data)
        return user


class PostSerializer(serializers.ModelSerializer):
    like = UserSerializer(many=True, read_only=True)
    user = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    

    class Meta:
        model = Post
        fields = ['id',"user", "posted", "caption", "added", "like", "like_count"]
        extra_kwargs = {"user": {"read_only": True}}

    def get_user(self, obj):
        return obj.user.username

    def get_like_count(self, obj):
        return len(obj.like.all())


class CommentSerializer(serializers.ModelSerializer):
    author=serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ["post", "comment", "comment_date", "author"]
        extra_kwargs = {"author": {"read_only": True}, "post": {"read_only": True}}
    def get_author(self,obj):
        return obj.author.username
   
