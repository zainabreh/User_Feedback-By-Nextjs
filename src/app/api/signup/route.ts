import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";




export async function POST(request:Request){
    await dbConnect()

    try {

        const res = await request.json()

        const {username,email,password} = res

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message: "Username is already taken"
            },{status:400})
        }

        const existingUSerByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if(existingUSerByEmail){
            if(existingUSerByEmail.isVerified){
                 return Response.json(
            {
                success:false,
                message:"User already exist with this email"
            },
            {
                status:400
            }
        )
            }else{
                const hashedPassword = await bcrypt.hash(password,10)

                existingUSerByEmail.password = hashedPassword
                existingUSerByEmail.verifyCode = verifyCode
                existingUSerByEmail.verifyCodeExpires = new Date(Date.now() + 3600000)

                await existingUSerByEmail.save()

            }


        }else{
            const hashedPassword = await bcrypt.hash(password,10)

            const expiryDate = new Date()

            expiryDate.setHours(expiryDate.getHours() + 1 )

            const newUser = await new UserModel({
                username,
                   password: hashedPassword,
                    email,
                    verifyCode,
                    isVerified:false,
                    messages: [],
                    verifyCodeExpires: expiryDate,
                    isAcceptingMessages: true
            })

            newUser.save()
        }

        const emailResponse = await sendVerificationEmail(email,username,verifyCode)

        if(!emailResponse.success){
            return Response.json({success:false,message:emailResponse.message},{status:500})
        }

        return Response.json({success:true,message:"User Registeredd Successfully,Please verify you're email"},{status:200})
        
    } catch (error) {

        console.error('Error Registering User',error)
        return Response.json(
            {
                success:false,
                message:"Error registering user"
            },
            {
                status:500
            }
        )
    }
}