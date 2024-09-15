
"use client"

import ProfilePageComponent from "@/app/custom_components/ProfilePageComponent"
import { validateRequest } from "@/app/lib/auth";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProfilePage({
    params
}: {
    params: string
}) {

    const router = useRouter();
    const searchParams = useParams();
    // const params = useParams();
    console.log(searchParams?.toString())
  

    // const visitorUser = await validateRequest();

    // if (!visitorUser) {
    //     return redirect('/sign-in');
    // }

    // const visitorUserId = visitorUser.user?.id;
    // const visitorId = visitorUserId?.toString();

    return(
        <div>
            {/* <ProfilePageComponent id={searchParams}></ProfilePageComponent> */}
            <p>{searchParams?.toString()}</p>
        </div>
        )

}