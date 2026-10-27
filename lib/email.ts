import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailOptions): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL;

  if (!process.env.RESEND_API_KEY || !from) {
    throw new Error(
      "Email configuration is missing. Check RESEND_API_KEY and RESEND_FROM_EMAIL.",
    );
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("Email delivery request failed:", error.message);
    throw new Error("Unable to send email.");
  }
}
