import bcryptjs from "bcryptjs";
import User from "@/Models/user.model";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERFIY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 300000,
      });
    } else if (emailType === "VERFIY") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 300000,
      });
    }

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "884676da5c2d72",
    pass: "7ec384dc5c6806"
  }
});

    const mailOptions = {
      from: "zainwebtaker@gmail.com",
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify you're email" : "Forgot Password",
      html: 
    };

    const mailInfo = await transporter.sendMail(mailOptions);

    return mailInfo;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
