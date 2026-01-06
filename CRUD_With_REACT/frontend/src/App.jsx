import React from 'react'
import CreateUser from './pages/CreateUser'
import AllUsers from './pages/AllUsers'
import {Routes,Route} from 'react-router-dom'
import GetUserById from './pages/GetUserById'
import UpdateUser from './pages/UpdateUser'

const App = () => {
  return (
      <div>
          <Routes>
              <Route path="/" element={<CreateUser />}></Route>
              <Route path="/view" element={<AllUsers />}></Route>

              <Route path="/user/:id" element={<GetUserById />}></Route>
              <Route path="/update/:id" element={<UpdateUser />}></Route>
          </Routes>
      </div>
  );
}

export default App