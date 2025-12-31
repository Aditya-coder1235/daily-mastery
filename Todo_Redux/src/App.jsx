import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "./features/todoSlice";

const App = () => {
    let dispatch = useDispatch();
    let todos = useSelector((state) => state.todo);
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addTodo(text));
        setText('')
    };
    return (
        <div className="flex justify-center mt-10 p-10">
            <div className="border h-96 w-95 ">
                <h3 className="text-center text-purple-500 font-semibold">Todo_App</h3>
                <form onSubmit={handleSubmit} className="p-10">
                    <input
                        type="text"
                        placeholder="Enter Todos"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border"
                    />
                    <button className="rounded bg-purple-500 px-5 py-1 ms-10">Add</button>
                </form>
                <hr />
                {todos.map((todo) => {
                    return (
                        <div key={todo.id} className="p-10">
                            <ul>
                                <li>
                                    {todo.todo}
                                    <button
                                        onClick={() =>
                                            dispatch(deleteTodo(todo.id))
                                        }
                                        className="rounded bg-red-400 px-5 py-1 ms-10"
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
