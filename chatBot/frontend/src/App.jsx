import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const[prompt,setPrompt]=useState('')
  const[data,setData]=useState('')

  async function fetchReposnse(){
    try {
      let res = await axios.post("http://localhost:8080/ai/generate",{prompt});
      setData(res.data.message.choices[0].message.content)
      
    } catch (error) {
      console.log(error)
    }
  }

  
 
   const handleSubmit=(e)=>{
    e.preventDefault()
    fetchReposnse()
    setPrompt('')
   }


  return (
      <div className="h-full w-full bg-gray-100 pt-20 flex justify-center">
          <div className=" flex flex-col  items-center w-[50%] p-10">
              <div>
                  <img
                      src="/ai.jpg"
                      alt=""
                      className="h-40 w-40 rounded-full shadow-lg ms-5"
                  />
                  <h2 className='text-center text-3xl font-bold'>AI Asistant</h2>
                  <h3 className='text-center font-semibold'>Search Anything you want...</h3>
              </div>
              <form onSubmit={handleSubmit}>
                  <input
                      type="text"
                      placeholder="Search anything you want ....."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className='mt-10 border rounded h-15 w-80 text-center'
                  />
                  <button className='border py-2 px-4 ms-3 rounded bg-gray-500 text-white cursor-pointer'>Search</button>
              </form>
              {data && (
                  <div className='mt-10 border p-5 bg-white rounded-2xl'>
                    <h2 className='text-2xl font-bold '>Response:-</h2>
                      <p className='mt-3'>{data}</p>
                  </div>
              )}
          </div>
      </div>
  );
}

export default App