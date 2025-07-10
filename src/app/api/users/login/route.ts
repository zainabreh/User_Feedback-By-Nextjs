import User from '@/Models/userModel';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()

    const {email,password} = reqBody

    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json({error:"User does not exist"})
    }

    const validPassword = await bcrypt.compare(password,user.password)

    if(!validPassword){
        return NextResponse.json({error:"Invalid Password. Try again..."},{status:400})
    }

    const tokenData = {
        id: user._id,
        email:user.email,
        username:user.username
    }

    const token = await jwt.sign(tokenData,process.env.SECRET_TOKEN!,{expiresIn:'1d'})

    const response = NextResponse.json({message:"Login successful",success:true})

    response.cookies.set("token",token,{
        httpOnly:true
    })

    return response

  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
  
}