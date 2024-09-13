import api from "../api"
import axios from "axios"
import React from "react"
import '../styles/BasicForm.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function Postyour(){
    const [caption,setCaption]=useState("")
    const [posted,setPosted]=useState(null)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    async function handlePost(e){
        setLoading(true)
        e.preventDefault();
        try{
            api.post('/hadith/posts/',{posted,caption},{headers:
                {'Content-Type':'multipart/form-data',},
            })
            
            navigate('/');
        }catch(error){
            alert(error)
        }finally{
            setLoading(false)
        }
        

    }
    return <>
    <div className="post-container">
        <form action="" className="form-container" onSubmit={handlePost}>
            <h1>Post</h1>
            <input type="file" 
             name="posted"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) =>setPosted(e.target.files[0]) }/>




            <input type="text"
             className="form-input" 
             placeholder="Content"
             value={caption}
             onChange={(e)=>setCaption(e.target.value)}/>
             <button type="submit" className="form-button">Post</button>
             
        </form>
    </div>
    
    </>
}
export default Postyour