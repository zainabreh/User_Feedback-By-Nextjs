import bcryptjs from "bcryptjs";
import User from "@/Models/userModel";
import nodemailer from "nodemailer";

const generateEmailHTML = (token: string, emailType: "VERIFY" | "RESET") => {
  const actionText = emailType === "VERIFY" ? "verify your email" : "reset your password";
  const path = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
  const fullURL = `${process.env.DOMAIN}/${path}?token=${token}`;

  return `
    <p>
      Click <a href="${fullURL}">here</a> to ${actionText}, 
      or copy and paste the link below in your browser. 
      <br><br> 
      ${fullURL}
    </p>
  `;
};


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {$set:{
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 3600000),
      }});
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {$set:{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 300000),
      }});
    }

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "884676da5c2d72",
    pass: "7ec384dc5c6806"
  }
});


const html = generateEmailHTML(hashedToken,emailType)
    const mailOptions = {
      from: "zainwebtaker@gmail.com",
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify you're email" : "Forgot Password",
      html
    };

    const mailInfo = await transporter.sendMail(mailOptions);

    return mailInfo;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
