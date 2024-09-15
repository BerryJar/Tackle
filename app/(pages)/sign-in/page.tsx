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
        <div id="MainDiv" className="flex h-screen w-full bg-zinc-800">
            <ModeToggle></ModeToggle>
            <div id="LeftBox" className="w-1/2 bg-zinc-800">
            </div>
            <div id="RightBox" className="flex flex-col w-1/2 bg-black rounded-xl border-l border-t border-b border-zinc-700 shadow-lg justify-center items-center text-center">
                <div >
                    <h5 className="text-3xl font-bold">Sign in to your account</h5>
                    <p className="text-zinc-400 p-5">Enter your email address to sign in.</p>
                </div>
                <SignInForm></SignInForm>
                <Link href="/sign-up" className="text-zinc-400 p-5 w-96">... or click here to sign up.</Link>
            
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