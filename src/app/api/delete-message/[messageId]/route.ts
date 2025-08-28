import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/User.model";

export async function DELETE(request: Request,
  { params }: { params: { messageId: string } }) {

  const messageId = params.messageId;

  dbConnect();
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

    try {
      const updateResult = await UserModel.updateOne(
        { _id: user._id},
        { $pull: { messages: { _id: messageId } } }
      );

      if (updateResult.modifiedCount == 0) {
        return Response.json(
          {
            success: false,
            message: "Message not found or could not be deleted",
          },
          {
            status: 404,
          }
        );
      }

      return Response.json(
        {
          success: true,
          message: "Message deleted successfully",
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log("Error deleting message:", error);
      return Response.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }

}
