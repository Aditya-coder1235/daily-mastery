import mongoose from "mongoose"
import { IUser } from "../types/allTypes";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User=mongoose.model<IUser>("User",userSchema);

export default User