'use server'

import PleaseSignIn from "../custom_components/PleaseSignIn";
import { Button } from "@/components/ui/button";
import ShellComponent from "../custom_components/ShellComponent";
import { validateRequest } from '../lib/auth';
import { redirect } from 'next/navigation';
import { Client } from "pg";
import ClientDashboard from "../clientdashboard/page";
import { signOut } from "../actions/auth.actions";
import db from "../lib/db";
import { eq } from "drizzle-orm";

export default async function Dashboard() {
   
    const user = await validateRequest();
    console.log("dashboard page.tsx userId" + user)

    console.log("typeof user " + user.user)
    const userUser = user.user?.id
    console.log("userUser " + userUser)
    // const displayName = await db.query.userTable.findFirst

    async function getUserDataAsArray(userId: string): Promise<any> {
        const userQuery = await db.query.userTable.findFirst({
            where: (table) => eq(table.id, userId),
        })
        
        if (!userQuery) {
            return [];
        }

        const userArray = Object.values(userQuery)

        return userArray
    }

    const userData = await getUserDataAsArray(userUser || "");

    console.log("userData " + userData)



    if (!user) {
        return redirect('/sign-in');
    }


    if (!userUser || !userUser) {
        return redirect('/sign-in');
    }

    // const existingUser = await db.query.userTable.findFirst({
    //     where: (table) => eq(table.email, userUser),
    // })

    // console.log("Existing user " + existingUser)

    return (
        <div>
            <ClientDashboard user={userUser}></ClientDashboard>
        </div>
    )
}
