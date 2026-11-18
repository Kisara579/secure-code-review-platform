import { Resend } from "resend";

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
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    throw new Error(
      "Email configuration is missing. Check RESEND_API_KEY and RESEND_FROM_EMAIL.",
    );
  }

  const resend = new Resend(apiKey);
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
