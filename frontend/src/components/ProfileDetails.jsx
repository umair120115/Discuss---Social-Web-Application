import api from "../api"
import { useState,useEffect, useDeferredValue} from "react"
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Header from './Header'
function ProfileDetails(){
    const [user,setUser]=useState([])
    useEffect(()=>{getuser();},[])
    const [show, setShow] = useState(false);
    const navigate=useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Name,setUpdatename]=useState('')
  const[username,setUpdatedusername]=useState('')
  const [email,setUpdatedemail]=useState('')
  const [password,setPassword]=useState('')


    const getuser=()=>{
        api.get('/hadith/user/register/').then((res)=>res.data).then((data)=>{
            setUser(data);
            console.log(data);
        })
    }
    function handleName(user_id){
        api.patch(`/hadith/user/${user_id}/update/`,{Name},{headers:
            {'Content-Type':'multipart/form-data',},});
            navigate('/profile');
    }
    function handleUsername(user_id){
        console.log(user_id)
        api.patch(`/hadith/user/${user_id}/update/`,{username},{headers:
            {'Content-Type':'multipart/form-data',},});
            navigate('/profile');
    }
    function handleEmail(user_id){
        api.patch(`/hadith/user/${user_id}/update/`,{email},{headers:
            {'Content-Type':'multipart/form-data',},});
            navigate('/profile');
    }
    
    const handlePassword =(user_id)=>{
        api.patch(`/hadith/user/${user_id}/update/`,{password},{headers:
            {'Content-Type':'multipart/form-data',},
        });
        getuser();

    }
    
    return <>
    <Header/>

    {user.map((user)=>{ 
        
        // setUpdatedemail(String(user.email));
        // setUpdatedusername(String(user.username));
        // setUpdatename(String(user.Name))
        
        return <>
        <div className="container">
            <div className="name">
            <p className="name"><strong>Name :</strong>{user.Name}</p>
            <input type="text" onChange={(e)=>setUpdatename(e.target.value)} />
            <Button variant="primary" onClick={()=>{
                handleName(user.id);

            }}>update</Button>

            </div>

            
            <div className="username">
            <p className="username"><strong>Username :</strong>{user.username}</p>
            <input type="text" onChange={(e)=>setUpdatedusername(e.target.value)} />
            <Button variant="primary"  onClick={()=>{
                handleUsername(user.id);
            }}>updateUsername</Button>

            </div>

            <div className="email">
            <p className="email"><strong>Email :</strong>{user.email}</p>
            <input type="email" onChange={(e)=>setUpdatedemail(e.target.value)} />
            <Button variant="primary" onClick={()=>   {
                handleEmail(user.id)
            }   }>updateEmail</Button>
            </div>

            <div className="password">
                <h1>Change Your Password Here...!</h1>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} />
                <Button onClick={()=>{
                    handlePassword(user.id)
                }}>Change Password</Button>
            </div>


        </div>

        <div>
       

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form action="" className="form-container" onSubmit={()=>updateprofile()}>
            <p><strong>Name</strong></p>
            <input type="text" placeholder="Enter Name..." onChange={(e)=>setUpdatename(e.target.value)} className="form-input" id="name" />
            <p><strong>Username</strong></p>
            <input type="text" placeholder="Enter username..." onChange={(e)=>setUpdatedusername(e.target.value)} className="form-input" />
            <p><strong>Email</strong></p>
            <input type="email" placeholder="Enter email.." onChange={(e)=>setUpdatedemail(e.target.value)} className="form-input" />

            <button className="form-buttom" type="submit">Update</button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    
    </>})}
    </>

}
export default ProfileDetails