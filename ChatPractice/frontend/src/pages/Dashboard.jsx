import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [error,setError]=useState("")
    const navigate=useNavigate()

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/user/all", {
                withCredentials: true,
            })
            .then((res) => {
                setUsers(res.data.users);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const startConversation = async (id) => {
        try {
            let res = await axios.post(
                `http://localhost:8080/api/conversation/start/${id}`,
                {},
                { withCredentials: true },
            );
            navigate(`/msg/${res.data._id}`);

            console.log();
        } catch (error) {
            // console.log();
            setError(error.response.data.message);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>User Dashboard</h1>

            <p className="text-red-700 ">{error && error}</p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {users.map((user) => (
                    <div
                        key={user._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            width: "200px",
                            borderRadius: "10px",
                        }}
                    >
                        <img
                            src={user.avatar}
                            alt={user.name}
                            width="80"
                            style={{ borderRadius: "50%" }}
                        />

                        <h3>{user.name}</h3>
                        <p>{user.email}</p>

                        <button
                            onClick={() => startConversation(user._id)}
                            className="bg-blue-600 p-1 mt-2 cursor-pointer text-black rounded"
                        >
                            Start Conversation
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
