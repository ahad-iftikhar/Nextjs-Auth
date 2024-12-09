import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    const emailHTML = `<p>Click <a href="${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }?token=${hashedToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    } or copy and pate the link below in your browser. <br> ${
      process.env.DOMAIN
    }/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }?token=${hashedToken} </p>`;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verfiyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    } as SMTPTransport.Options);

    const mailOptions = {
      from: "abdulahad@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailHTML,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
