import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest){
    try {

        const response = NextResponse.json({message:"LoggedOut Successfully",success:true})

        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

        return response
        
    } catch (error:any) {
        return NextResponse.json({error:error},{status:500})
    }
}