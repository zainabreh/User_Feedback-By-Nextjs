import User from '@/Models/userModel';
import { dbConnection } from "@/dbConfig/dbconnection";
import { NextRequest, NextResponse } from "next/server";

dbConnection()

export async function POST(request:NextRequest){
    try {

        const reqBody = await request.json()

        const {token} = reqBody        

        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

        if(!user){
            return NextResponse.json({Error:"Invalid Token",status:400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message:"Email Verified Successfully",
            success:true
        },{status:200})
        


        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}