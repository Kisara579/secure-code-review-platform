import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";

import { prisma } from "./prisma";

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

  emailAndPassword: {
    enabled: true,
  },
});
