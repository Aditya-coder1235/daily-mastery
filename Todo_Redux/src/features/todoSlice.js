import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

let initialState = [
    { id: uuidv4(), todo: 'sample task' }
]

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push({ id: uuidv4(), todo: action.payload })
        },
        deleteTodo: (state, action) => {
            return state.filter((state) => state.id !== action.payload)
        }
    }
})

export const { addTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer