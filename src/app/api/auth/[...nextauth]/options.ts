import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    //   CredentialsProvider({
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any):Promise<any>{
        await dbConnect()

        try {

            const user = await UserModel.findOne({
                $or:[
                    {email:credentials.identifier},
                    {username:credentials.identifier}
                ]
            })

            if(!user){
                throw new Error('No user found with this email')
            }

            if(!user.isVerified){
               throw new Error("Please verify you're account before login")
            }

            const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)

            if(isPasswordCorrect){
                return user
            }else{
                throw new Error('Incorrect password')
            }
            
        } catch (error:any) {
            throw new Error(error)
        }
      }
    }),
  ],
  pages:{
    signIn:'/signin'
  },
  session:{
    strategy:"jwt"
  },
  secret:process.env.AUTH_SECRET
};
