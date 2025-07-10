import { dbConnection } from "@/dbConfig/dbconnection";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

dbConnection();

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // const newUser = await User.create({
    //     username,
    //     email,
    //     password:hashedPassword

    // })

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const userId = savedUser._id;

    // send Email Verification

    await sendEmail({ email, emailType: "VERIFY", userId:  userId });

    return NextResponse.json({
      message: "User Registered Successfuly",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
