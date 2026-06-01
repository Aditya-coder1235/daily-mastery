import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserState = {
    _id: string;
    name: string;
    email: string;
};

const Dashboard = () => {
    const navigate=useNavigate()
    const [users, setUsers] = useState<UserState[]>([]);

    const fetchAllUsers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/auth/getAll",
            );
            setUsers(res.data);
            // console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    const startConversation=async(id:string)=>{
        try {
            const res = await axios.post(
                `http://localhost:8080/api/conversation/start/${id}`,
                {},
                {withCredentials:true}
            );
            console.log(res.data)
            if(res.data){
                navigate(`/msg/${res.data._id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user: UserState) => {
                    const avatarUrl = `https://i.pravatar.cc/150?u=${encodeURIComponent(user._id)}`;
                    return (
                        <div
                            key={user._id}
                            className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={avatarUrl}
                                    alt={user.name}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        {user.name}
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        {user.email}
                                    </p>
                                </div>
                                <button onClick={()=>startConversation(user._id)} className="bg-gray-400 rounded-2xl text-white text-sm p-1 hover:bg-gray-700">start conversation</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
