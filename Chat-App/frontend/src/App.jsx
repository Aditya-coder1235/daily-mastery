import React, { useState } from "react";
import { useEffect } from "react";
import { connectWs } from "./WS";
import { useRef } from "react";

const App = () => {
    const socket = useRef(null);

    const [userName, setUserName] = useState("");
    const [popup, setPopup] = useState(true);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        socket.current = connectWs();

        socket.current.on("connect", () => {

            socket.current.on('roomNotice',(username)=>{
                // console.log(username);
            })

            socket.current.on("chatMessage",(msg)=>{
                setMessages((prev) => [...prev, msg]);
            });
        });
    }, []);

    const handleOnSubmitForPop = (e) => {
        e.preventDefault();
        setPopup(false);

        socket.current.emit("joinRoom", userName);
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const newMessage = {
            text,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            sender: userName,
        };

        // add message to TOP
        setMessages((prev) => [...prev, newMessage]);

        socket.current.emit("chatMessage", newMessage);

        setText("");
    };

    // console.log(messages);

    return (
        <>
            <div className="">
                {popup && (
                    <div className="flex justify-center items-center bg-gray-300 h-screen">
                        <div className="hover:shadow-2xl w-90 h-50 flex justify-center items-center bg-white rounded shadow-2xs transition">
                            <form
                                onSubmit={handleOnSubmitForPop}
                                className="flex flex-col gap-5 p-5"
                            >
                                <div>
                                    <h2 className="text-2xl font-normal">
                                        Enter your name
                                    </h2>
                                    <p className="opacity-35 text-sm">
                                        Enter your name to start the chating
                                        this will be use to identity
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    className="border rounded p-1"
                                />
                                <button className="bg-green-600 w-20 ml-59 text-white rounded px-2 py-1">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <div className="min-h-screen flex justify-center bg-gray-200">
                {!popup && (
                    <div className="bg-gray-200 shadow-2xl w-[30%] h-150 rounded-2xl flex flex-col justify-between">
                        <div className="flex justify-between p-3 items-center bg-white rounded-t-2xl">
                            <span className="flex flex-col">
                                <span className="flex items-center gap-3">
                                    <p className="bg-green-600 h-9 w-9 rounded-full flex justify-center items-center">
                                        <p className="text-white font-semibold">
                                            {userName.slice(0, 1)}
                                        </p>
                                    </p>
                                    <p className="flex flex-col">
                                        <span className="font-medium">
                                            Realtime chat app
                                        </span>
                                        <span className="text-sm">
                                            someone typing...
                                        </span>
                                    </p>
                                </span>
                            </span>
                            <p className="text-sm">
                                sign in as{" "}
                                <span className="font-semibold">
                                    {userName}
                                </span>
                            </p>
                        </div>

                        <div className="flex-1 space-y-3 bg-zinc-100 flex flex-col p-4 overflow-y-auto">
                            {messages.map((msg, index) => {
                                let mine = msg.sender === userName;
                                return (
                                    <div
                                        key={index}
                                        className={`flex ${mine ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[70%] px-3 py-2 rounded-lg shadow text-sm ${mine ? "bg-[#DCF8C6] text-[#303030] rounded-br-2xl" : "bg-white text-[#303030] rounded-bl-2xl"}`}
                                        >
                                            <p className="wrap-break-word">
                                                {msg.text}
                                            </p>
                                            <div className="flex gap-2">
                                                <span className="text-[10px] text-gray-500 flex justify-end mt-1">
                                                    {msg.time}
                                                </span>
                                                <span className="text-[10px] text-gray-700 flex justify-end mt-1">
                                                    {msg.sender}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className=" bg-white rounded-b-2xl p-3">
                            <form onSubmit={handleTextSubmit}>
                                <div className="border flex justify-between h-10 rounded-2xl p-1">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        className=" w-full ps-3 border-none outline-none"
                                    />
                                    <button className="bg-green-600 w-23 rounded-2xl text-white hover:bg-green-700">
                                        send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
