import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signupSchema";
import { z } from "zod";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {

    const {searchParams} = new URL(request.url)
    const queryParam = {
        username:searchParams.get('username')
    }

    const result = usernameQuerySchema.safeParse(queryParam)

    console.log("RESULT............",result);

    if(!result.success){
        const usernameError = result.error.format().username?._errors || []

        return Response.json({
            success:false,
            message:usernameError?.length > 0 ? usernameError.join(', ') : 'Invalid Query Parameter'
        },{status:400})
    }

    const {username} = result.data

    const exisitngVerifiedUser = await UserModel.findOne({username,isVerified:true})
    if(exisitngVerifiedUser){
          return Response.json({
            success:false,
            message:'Username is already taken'
        },{status:400})
    }

      return Response.json({
            success:true,
            message: "Username is unique"
        },{status:200})

  } catch (err) {
    console.error("Error checking username", err);

    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
