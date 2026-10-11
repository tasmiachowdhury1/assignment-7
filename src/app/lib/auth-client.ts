import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_DB_URL
});
export const { signIn, signUp, useSession } = createAuthClient({
    baseURL: "http://localhost:3000",
})