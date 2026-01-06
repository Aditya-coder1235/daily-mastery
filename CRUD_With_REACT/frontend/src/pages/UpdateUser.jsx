import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

const UpdateUser = () => {
    const navigate=useNavigate()

    let {id} =useParams()

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    async function updateUser(e){
        e.preventDefault()
        try {
            let res = await axios.put(
                `http://localhost:8080/user/update/${id}`,
                { name, email, password },
                { withCredentials: true }
            );
            navigate('/view')
            
        } catch (error) {
            console.error(error)
        }
    }

  return (
      <div>
          <h2>UpdateUser</h2>
          <form onSubmit={updateUser}>
              <input
                  type="text"
                  placeholder="Enter something"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
              <br />
              <br />
              <input
                  type="text"
                  placeholder="Enter something"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <br />
              <input
                  type="text"
                  placeholder="Enter something"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              <button>Update</button>
          </form>
      </div>
  );
}

export default UpdateUser