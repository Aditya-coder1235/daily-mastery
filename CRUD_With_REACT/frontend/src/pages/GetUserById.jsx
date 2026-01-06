import React from 'react'
import { Link, useParams } from 'react-router'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const GetUserById = () => {
    const navigate=useNavigate()
    const {id} = useParams();
    let[user,setUser]=useState([])

    async function fetchById(){
        try {
            let res = await axios.get(
                `http://localhost:8080/user/getUserById/${id}`,{withCredentials:true}
            );
            // console.log()
            setUser(res.data.data);
            
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchById();
    },[]);

      async function deleteUser() {
          try {
              let res = axios.delete(
                  `http://localhost:8080/user/delete/${id}`,
                  { withCredentials: true }
              );
              navigate('/view')
          } catch (error) {
              console.error(error);
          }
      }

  return (
      <div>
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
          <h2>{user.password}</h2>
          <Link to={`/update/${user._id}`}>Update</Link>
          <button onClick={deleteUser}>Delete</button>
      </div>
  );
}

export default GetUserById