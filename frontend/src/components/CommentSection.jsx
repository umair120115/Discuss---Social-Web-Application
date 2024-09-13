import { useState,useEffect } from "react"
import '../styles/CommentSection.css'
import api from "../api"

function CommentSection({postid}){
    const [comments,setComments]=useState([])
    const [comment,setComment]=useState("")
    useEffect(()=>{
        get_comments();
    },[])
    const get_comments=async()=>{
        try{
            const res = await api.get(`hadith/post/${postid}/comment/`).then((res)=>res.data).then((data)=>{
                setComments(data);
                
            })
        }catch(error){
            alert({'error':'Not working'})
        }
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
        api.post(`/hadith/post/${postid}/comment/`,{comment}).then(()=>get_comments())
        
        }catch(error){
            alert(error)
        }
        
    }
    return <>
    <div className="comment-section">
        <h3>Comments</h3>
        {comments.map((comment)=> {return (
            <>
            <div className="comment-head">
                <span className="author-name">{comment.author}</span><span className="comment-date">{comment.comment_date}</span>
            </div>
            <div className="comment-body">
                <span>{comment.comment}</span>
            </div>
                
            </>



        )})
}
        <form action="" onSubmit={handleSubmit}>
            <textarea name="" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add new comment..."></textarea>
        <button type="submit">Comment</button>

        </form>
    </div>
    
    </>
}
export default CommentSection