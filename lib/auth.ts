import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";

import { prisma } from "./prisma";
import { sendEmail } from "./email";

const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),

  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {}),

  ...(process.env.GITLAB_CLIENT_ID && process.env.GITLAB_CLIENT_SECRET
    ? {
        gitlab: {
          clientId: process.env.GITLAB_CLIENT_ID,
          clientSecret: process.env.GITLAB_CLIENT_SECRET,
        },
      }
    : {}),
};

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  advanced: {
    database: {
      generateId: "uuid",
    },
  },

  socialProviders,

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    expiresIn: 60 * 60,

    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your SecureReview AI email address",
        text: [
          `Hello ${user.name},`,
          "",
          "Please verify your email address using the link below:",
          url,
          "",
          "This link expires in one hour.",
          "If you did not create this account, you can ignore this email.",
        ].join("\n"),
        html: `
          <h2>Verify your email address</h2>
          <p>Hello,</p>
          <p>Please verify your email address to activate your SecureReview AI account.</p>
          <p><a href="${url}">Verify my email</a></p>
          <p>This link expires in one hour.</p>
          <p>If you did not create this account, you can ignore this email.</p>
        `,
      }).catch((error: unknown) => {
        console.error("Failed to send verification email:", error);
      });
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 60,
    revokeSessionsOnPasswordReset: true,

    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your SecureReview AI password",
        text: [
          `Hello ${user.name},`,
          "",
          "A password reset was requested for your SecureReview AI account.",
          "Use the link below to choose a new password:",
          url,
          "",
          "This link expires in one hour.",
          "If you did not request a password reset, you can ignore this email.",
        ].join("\n"),
        html: `
          <h2>Reset your password</h2>
          <p>A password reset was requested for your SecureReview AI account.</p>
          <p><a href="${url}">Reset my password</a></p>
          <p>This link expires in one hour.</p>
          <p>If you did not request a password reset, you can ignore this email.</p>
        `,
      }).catch((error: unknown) => {
        console.error("Failed to send password reset email:", error);
      });
    },
  },
});
