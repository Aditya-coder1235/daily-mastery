import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const AllUsers = () => {
    const navigate=useNavigate()
    const [users, setUsers] = useState([]);

    async function getAllUsers() {
        try {
            let res = await axios.get("http://localhost:8080/user/AllUser");

            // console.log()
            setUsers(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getAllUsers();
    },[]);

                        // console.log(users);
  

    return (
        <div>
            <h1>AllUsers</h1>
            {users.map((user) => {
                return (
                    <div className="a" >
                        {user.name} <br />
                        {user.email}
                        <br />
                        {user.password}
                        <br />
                        <Link to={`/user/${user._id}`}>View in Detail</Link>
                    </div>
                );
            })}
        </div>
    );
};

export default AllUsers;
