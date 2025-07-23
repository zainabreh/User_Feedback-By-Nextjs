import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { success } from "zod";

export async function POST(request:Request){
    dbConnect()

    try {

        const {username,code} = await request.json()

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username:decodedUsername})

        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:500})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpires) > new Date()
        
        if(isCodeNotExpired && isCodeValid){
            user.isVerified = true
            await user.save()

             return Response.json(
            {
                success:true,
                message:"Account verified Successfully"
            },
            {status:200}
        )
        }else if(!isCodeNotExpired){
            return Response.json(
            {
                success:false,
                message:"Verification code has expired, please signup again to get a new code."
            },
            {status:400})
        }else{
            return Response.json(
            {
                success:false,
                message:"Incorrect verification code."
            },
            {status:400})
        }
        
    } catch (err) {
        console.error("Error Verifying user",err)
        return Response.json(
            {
                success:false,
                message:"Error verifying user"
            },
            {status:500}
        )
    }
}