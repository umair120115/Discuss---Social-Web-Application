import api from "../api"
import { useState,useEffect } from "react"
import Image from 'react-bootstrap/Image';
// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CommentSection from "./CommentSection";
function PostCard(){
  const [posts,setPosts]=useState([])
  useEffect(()=>{getposts();},[])
  
  const getposts=()=> api.get('/hadith/posts/')
    .then((res)=>res.data).then((data)=>{
        setPosts(data);
        
        console.log(data);
    })
  
  const handleLike=async (post)=>{
    try{
    api.post(`/hadith/posts/${post.id}/like_post/`,);}
    catch(error){
      alert(error)
    }

  }
    return <>
  {posts.map((post)=>{return <>
    <Card sx={{ maxWidth: 600 ,}}>
      <CardMedia
        sx={{ height: 200, width:300 }}
        image={post.posted} 
        title="green iguana"
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.user}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLike(post)}>Like</Button>{post.like_count}
        
        
      </CardActions>
      <hr style={{color:"black"}} />
      <CommentSection postid={post.id}/>
    </Card>
  
  
  
  
  
  </>})}





    {/* <Card sx={{ maxWidth: 600 ,}}>
      <CardMedia
        sx={{ height: 200, width:300 }}
        image={post.posted} 
        title="green iguana"
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.user}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLike}>Like</Button>{post.like_count}
        
        
      </CardActions>
      <hr style={{color:"black"}} />
      <CommentSection postid={post.id}/>
    </Card> */}
    
    
    </>
}
export default PostCard