import { ModeToggle } from "@/app/custom_components/ModeToggle";
import { SignInForm } from "@/app/custom_components/SignInForm"
import { validateRequest } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUp() {

    const { user } = await validateRequest();

    if (user) {
        return redirect('/dashboard');
    }

    return(
        <div id="MainDiv" className="flex h-screen w-full dark:bg-zinc-800 bg-slate-200">
            
            <div id="LeftBox" className="w-1/2 dark:bg-zinc-800 bg-slate-200">
            </div>
            <div id="RightBox" className="flex flex-col w-1/2  dark:bg-black bg-white rounded-xl border-l border-t border-b dark:border-zinc-700 border-zinc-100 shadow-lg justify-center items-center text-center">
                <div >
                
                    <h5 className="text-3xl font-bold dark:text-white text-slate-500">Sign in to your account</h5>
                    <p className="text-slate-400 dark:text-neutral-400 p-5">Enter your email address to sign in.</p>
                </div>
                <SignInForm></SignInForm>
                
                <Link href="/sign-up" className="text-slate-400 dark:text-neutral-400 p-5 w-96">... or click here to sign up.</Link>
                <div className="text-slate-500">
                <ModeToggle></ModeToggle>
                </div>
                
            </div>
            
        </div>
        // <div className="flex flex-col items-center justify-center text-center h-screen w-screen bg-slate-300">
        //     <div className="bg-white rounded-xl p-12 flex flex-col w-96 text-black shadow-lg">
        //         <SignUpForm></SignUpForm>
        //     </div>
        // </div>
    )

    // return(

    //     <div className="flex flex-col items-center justify-center text-center h-screen w-screen bg-slate-300">
    //         <div className="bg-white rounded-xl p-12 flex flex-col w-96 text-black shadow-lg">
    //             <SignInForm></SignInForm>
    //         </div>
    //     </div>
    // )
}