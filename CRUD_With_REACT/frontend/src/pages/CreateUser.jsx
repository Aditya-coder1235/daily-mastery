import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router'

const CreateUser = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    async function createUser(e){
        e.preventDefault()
        try {
             let res=axios.post("http://localhost:8080/user/create", {
                 name,
                 email,
                 password,
             });

             alert("User create")
             setName('')
             setEmail('')
             setPassword('')
            
        } catch (error) {
            console.error(error)
        }
       
    }


  return (
      <div>
          <h1>CreateUser</h1>
          <form onSubmit={createUser}>
              <input type="text" value={name} placeholder='Enter username' onChange={(e)=>setName(e.target.value)}/>
              <br />
              <br />
              <input type="text" value={email} placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
              <br />
              <br />
              <input type="text" value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
              <br />
              <br />
              <button>Create</button>
          </form>
          <Link to={'/view'}>All users</Link>
      </div>
  );
}

export default CreateUser