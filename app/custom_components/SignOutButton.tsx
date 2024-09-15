"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

export function SignOutButton() {
    
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            const response = await fetch('/api/auth/signout/', { method: "POST" });
            if (response.ok) {
                router.push("/sign-in")
            } else {
                console.error("Failed to sign out")
            }
        } catch (error) {
            console.error("Failed to sign out")
        }
    };

    return (

        <Button className="w-full justify-start bg-white dark:border-t dark:border-l dark:border-r dark:border-b dark:border-zinc-400 dark:bg-neutral-950 dark:text-white text-black dark:hover:bg-sky-900 hover:bg-sky-900" onClick={handleSignOut}>Sign Out</Button>

    )


}
