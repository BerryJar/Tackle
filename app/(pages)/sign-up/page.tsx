import { ModeToggle } from "@/app/custom_components/ModeToggle";
import { SignUpForm } from "@/app/custom_components/SignUpForm"
import { validateRequest } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignUp() {


    const { user } = await validateRequest();

    return(
        <div id="MainDiv" className="flex h-screen w-full bg-zinc-800">
            <ModeToggle></ModeToggle>
            <div id="LeftBox" className="w-1/2 bg-zinc-800">
            </div>
            <div id="RightBox" className="flex flex-col w-1/2 bg-black rounded-xl border-l border-t border-b border-zinc-700 shadow-lg justify-center items-center text-center">
                <div >
                    <h5 className="text-3xl font-bold">Create an account</h5>
                    <p className="text-zinc-400 p-5">Enter your email address to create an account.</p>
                </div>
                <SignUpForm></SignUpForm>
                <Link href="/sign-in" className="text-zinc-400 p-5 w-96">... or click here to sign in.</Link>
                <p className="text-zinc-400 p-5 w-96">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
                
            
            </div>
            
        </div>
        // <div className="flex flex-col items-center justify-center text-center h-screen w-screen bg-slate-300">
        //     <div className="bg-white rounded-xl p-12 flex flex-col w-96 text-black shadow-lg">
        //         <SignUpForm></SignUpForm>
        //     </div>
        // </div>
    )
}