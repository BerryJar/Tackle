import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PleaseSignIn() {
    return (
        <div id="pleaseSignInDiv" className="flex items-center justify-center h-screen bg-gray-200 text-center">
            <div>
                <h1 className="text-4xl font-bold text-sky-800">Please Sign In</h1>
                <p className="text-xl text-sky-800">You must be signed in to access this page</p>
                <div className="p-5">
                <Button className="bg-sky-800" asChild>
                    <Link href="/sign-in">Sign In</Link>
                </Button>
                </div>
                <Link href="/sign-up" className="text-gray-500">Click here if you don't have an account.</Link>
            </div>
        </div>
    );
}
