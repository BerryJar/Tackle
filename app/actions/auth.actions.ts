"use server"

import { z } from 'zod';
import { SignInSchema, SignUpSchema } from '../types';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';
import db from '../lib/db';
import { emailVerificationTable, userTable } from '../lib/db/schema';
import { lucia, validateRequest } from '../lib/auth';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { table } from 'console';
import argon2 from 'argon2';

export const resendVerificationEmail = async (email: string) => {
    try {

        const existingUser = await db.query.userTable.findFirst({
            where: (table) => eq(table.email, email),
        })

        if (!existingUser) {
            return {
                error: "User not found.",
            }
        }

        if (existingUser.isEmailVerified === "true") {
            return {
                error: "Email already verified.",
            }
        }

        const code = Math.random().toString(36).substring(2, 8);

        await db.update(emailVerificationTable).set({
            code, sentAt: new Date(),
        }).where(eq(emailVerificationTable.userId, existingUser.id))

        console.log("Code updated in DB" + code)

        const token = jwt.sign({
            email,
            userId: existingUser.id,
            code,
        }, process.env.JWT_SECRET!, {
            expiresIn: '5m'
        })

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`

        console.log(url)

        return {
            success: "Email sent.",
        }

    } catch (error: any) {
        return {
            error: error?.message,
        }
    }
}

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    console.log(values)

    const hashedPassword = await argon2.hash(values.password);
    const userId = generateId(15);

    try {
        await db.insert(userTable).values({
            id: userId,
            hashedPassword,
            googleId: null,
            email: values.email,
            isEmailVerified: "false",
            profilePicture: null,
            displayName: null,
            darkMode: false,
            createdAt: new Date(),
        })

        // const existingCode = await db.query.emailVerificationTable.findFirst({
        //     where: eq(emailVerificationTable.userId, userId)
        // })

        // console.log("TestTestWooHoo 1")

        // if (!existingCode) {
        //     return {
        //         error: "Error sending email.",
        //     }
        // }


        // const sentAt = new Date(existingCode.sentAt);
        // const hasOneMinutePassed = new Date().getTime() - sentAt.getTime() > 60000;

        // if (!hasOneMinutePassed) {
        //     return {
        //         error: "Please wait 1 minute before requesting another email."
        //     }
        // }

        const code = Math.random().toString(36).substring(2, 8);


        await db.insert(emailVerificationTable).values({
            code,
            userId,
            id: generateId(15),
            sentAt: new Date(),
        })
        
        const token = jwt.sign({ email: values.email, userId, code }, process.env.JWT_SECRET!, {
            expiresIn: '5m'
        })

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`

        console.log(url)

        // const session = await lucia.createSession(userId, {
        //     expiresIn: 60 * 60 * 24 * 30,
        // });

        // const sessionCookie = lucia.createSessionCookie(session.id);

        // cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return {
            success: true,
            data: {
                userId,
            }
        }

    } catch (error: any) {
        return {
            error: error?.message,
        }
    }


}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {

    try {
        SignInSchema.parse(values)
    } catch (error: any) {
        return {
            error: error.message,
        }
    }

    const existingUser = await db.query.userTable.findFirst({
        where: (table) => eq(table.email, values.email),
    })

    if (!existingUser) {
        return {
            error: "User not found.",
        }
    }

    if (!existingUser.hashedPassword) {
        return {
            error: "User not found.",
        }
    }

    const isValidPassword = await argon2.verify(existingUser.hashedPassword, values.password);

    if (!isValidPassword) {
        return {
            error: "Incorrect username or password",
        }
    }

    if (existingUser.isEmailVerified === "false") {
        return {
            error: "Email not verified.",
            key: "email_not_verified",
        }   

    }

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return {
        success: "Logged in successfully.",
    }

}

export const signOut = async () => {

    try {
        const { session } = await validateRequest();

        if (!session) {
            return {
                error: "Unauthorized",
            }
        }

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    } catch (error: any) {

        return {
            error: error?.message,
        }


    }
}