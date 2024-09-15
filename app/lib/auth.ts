
import { Lucia } from "lucia";
import { decl } from "postcss";
import adapter from "./db/adapter";
import { cache } from "react";
import { cookies } from "next/headers";


export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    }
})

export const validateRequest = cache(async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return {
        user: null,
        session: null
    }
    const { user, session } = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch {

    } return {
        user,
        session
    }
})

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
    }
}