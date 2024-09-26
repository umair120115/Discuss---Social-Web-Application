import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function People(){
    const [users, setUsers] = useState([]);
    const navigate= useNavigate();
    // Example of fetching users data (you can replace with your actual API call)
useEffect(() => {
    // Simulating a fetch call with hardcoded user data
    const fetchUsers = async () => {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Replace with your actual API endpoint
    //   const data = await response.json();
    //   setUsers(data);
    const res = await api.get('/hadith/users/').then((res)=>res.data).then((data)=>{
        setUsers(data);
        console.log(data);
    })
    };
    
    fetchUsers();
  }, []);

//   async function addFriend(user_id){
//     // api.post(`/hadith/request/${to_user}/friend/`);
//     // hadith/request/friend/
//     const response = await api.post(`hadith/request/${user_id}/friend/`, null, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//     navigate('/people');

    

//   }

const sendFriendRequest = async (toUserId) => {
    try {
        const response = await api.post(`/hadith/request/${toUserId}/friend/`, {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.data.status === 'success') {
            alert('Friend request sent successfully!');
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Error sending friend request:', error);
        alert('An error occurred while sending the friend request.');
    }
};

const handleSendFriendRequest = (toUserId) => {
    sendFriendRequest(toUserId);
};
  
  // Conditional rendering in case of no data
  if (users.length === 0) {
    return <p>Loading users...</p>;
  }
    return <>
    




  <div>
    <h2>List of Users</h2>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <h3>{user.Name}</h3>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p><button onClick={() => handleSendFriendRequest(user.id)}>Add friend</button></p>
        </li>
      ))}
    </ul>
  </div>

    
    
    
    
    
    </>

}
export default People