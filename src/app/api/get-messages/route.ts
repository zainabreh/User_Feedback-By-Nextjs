import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User.model";
import mongoose from "mongoose";

export async function GET(request: Request) {
  dbConnect();

  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    const userMessages = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!userMessages || userMessages.length === 0) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        success: true,
        messages: userMessages[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Unexpected error occure",error);
    
    return Response.json(
        {
          success: false,
          message: "Unexpected error occure",
        },
        {
          status: 500,
        }
      );
  }
}
