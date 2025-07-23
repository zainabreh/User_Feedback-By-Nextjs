import { resend } from "@/lib/resend";
import VerificationEmail from "../../Emails/VerificationEmail";
import { ApiResponse } from "@/Types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry message | Verification code",
      react: VerificationEmail({username,otp:verifyCode}),
    });

    return { success: true, message: "Verification Email Send Successfully" };

  } catch (emailError) {
    
    console.error("Error sending verification email", emailError);

    return { success: false, message: "Failed to send verification email" };
  }
}
