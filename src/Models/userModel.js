import mongoose from "mongoose"
 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true,"Please Provide you're Username"],
        unique: true
    },
    email:{
        type:String,
        required:[true,"Please provide an Email"]
    },
    password:{
        type:String,
        required:[true,"Please provide an Password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
     isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

export default mongoose.models.users || mongoose.model("users",userSchema)