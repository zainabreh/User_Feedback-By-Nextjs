import mongoose, { Document, Schema } from "mongoose"

export interface Message extends Document {
    content:string
    createdAt: Date
}

const MessageSchema:Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export interface User extends Document {
   username: string
   password: string
    email: string
    messages: Message[]
    isVerified: boolean
    verifyCode: string
    verifyCodeExpires: Date
    isAcceptingMessages: boolean
}

const userSchema:Schema<User> =  new Schema({
     username: {
        type:String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match:[/^[\w.-]+@[\w.-]+\.\w{2,}$/, "Please enter a valid email address"],
    },
    verifyCode:{
         type: String,
         required: [true, "verify code is required"],  
    },
    verifyCodeExpires: {
        type: Date,
        required: [true, "verify code expires is required"],
    },
    isVerified: {
        type: Boolean,  
        default: false,
    },  
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]
})


const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema);

export default UserModel;