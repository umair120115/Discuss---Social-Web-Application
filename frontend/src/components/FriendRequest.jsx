import api from "../api"
import { useEffect,useState } from "react"
function FriendRequest(){
    const [requests,setRequests]=useState([])
    useEffect(() => {
        // Simulating a fetch call with hardcoded user data
        const fetchRequests = async () => {
        
        const res = await api.get('/hadith/requests/').then((res)=>res.data).then((data)=>{
            setRequests(data);
            console.log(data);
        })
        };
        
        fetchRequests();
      }, []);
    // const res = api.get('/hadith/requests/').then((res)=>res.data).then((data)=>{
    //     setRequests(data);
    //     console.log(data)
    // })


    return <>
   <h1>your friend requests are here!</h1>
   {requests.map(request=>(
    <li key={requests.id}>
        <p>{request.sender} has sent you a friend request</p>
        <button className="form-button">Accept</button>
    </li>
   ))}
   
   
   
   
   
   
   </>
}
export default FriendRequest