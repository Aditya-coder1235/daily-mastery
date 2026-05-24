"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    _id: string;
    name: string;
    email: string;
}

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/auth/users",
            );

            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid gap-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="p-4 border rounded-lg shadow"
                    >
                        <h2 className="font-semibold">{user.name}</h2>

                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
