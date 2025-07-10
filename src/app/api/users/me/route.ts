import User  from '@/Models/userModel';
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";
import { dbConnection } from '@/dbConfig/dbconnection';

dbConnection()

export async function GET(request: NextRequest) {
    try {

        const userId = await getDataFromToken(request)

        const user = await User.findOne({_id:userId}).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message:"User Found",data:user }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}