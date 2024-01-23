import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// setting up an endpoint to send emails bit in reality, this should be part
// of business operations

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "...", // will have to create own domain to supply DNS record to resend
    to: "ortizk@live.com",
    subject: "...",
    react: <WelcomeTemplate name="Karla" />,
  });

  return NextResponse.json({});
}
