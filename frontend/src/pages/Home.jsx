import Header from "../components/Header"
import Footer from "../components/Footer"
import '../styles/PostSection.css'
import api from "../api"
import { useState,useEffect } from "react"
import PostCard from "../components/PostCard"

function Home(){
    // useEffect(()=>{
    //     getposts();
    // },[])
    // const [posts,setPosts]=useState([])
    // const getposts=()=> api.get('/hadith/posts/')
    // .then((res)=>res.data).then((data)=>{
    //     setPosts(data);
        
    //     console.log(data);
    // })
    return <>
    <Header/>
    {/* <div className="post-cards">
        {posts.map((post)=><PostCard post={post}/>)}
    </div> */}
    <div className="post-cards">
        <PostCard/>
    </div>




    <Footer/>
    </>
}
export default Home