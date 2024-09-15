import { lucia } from '@/app/lib/auth';
import db from '@/app/lib/db';
import { emailVerificationTable, userTable } from '@/app/lib/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function VerifyEmail(props: {
    searchParams: { token: string }
}) {

    if (!props.searchParams.token) {
        return <div>Token not found.</div>
    }

    try {
        const decoded = jwt.verify(props.searchParams.token, process.env.JWT_SECRET!)

        return <>{JSON.stringify(decoded)}</>
    } catch (error: any) {
        return <div>Token is invalid.</div>
    }

}