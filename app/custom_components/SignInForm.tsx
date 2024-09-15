"use client"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { SignInSchema, SignUpSchema } from '../types';
import { resendVerificationEmail, signIn, signUp } from '../actions/auth.actions';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { redirect, useRouter } from 'next/navigation';
import { validateRequest } from '../lib/auth';
import { use, useEffect, useState } from 'react';
import { useCountdown } from 'usehooks-ts';



export function SignInForm() {

    const [showPasswordFields, setShowPasswordFields] = useState(false);


    const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
        countStart: 10,
        intervalMs: 1000,
    })

    useEffect(() => {
        if (count === 0) {
            stopCountdown()
            resetCountdown()
        }
    }, [count])

    const [showResendVerificationEmail, setShowResendVerificationEmail] = useState(false);

    const router = useRouter()

    const { toast } = useToast()

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        console.log(values)
        const res = await signIn(values)
        if (res.error) {
            toast({
                title: "Error",
                description: res.error,
            })

            if (res?.key === "email_not_verified") {
                setShowResendVerificationEmail(true)
            } else if (res.success) {
                toast({
                    title: "Success",
                    description: "Signed in.",
                })

                router.push("/dashboard")
            }

        }
    }

    const onResendVerificationEmail = async () => {
        const res = await resendVerificationEmail(form.getValues("email"))

        if (res.error) {
            toast({
                title: "Error",
                description: res.error,
            })
        } else if (res.success) {
            toast({
                title: "Success",
                description: res.success,
            })
            startCountdown()
        }

    }

    return (
        <div className="flex flex-col items-center text-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="bg-black text-zinc-400 w-96" type="email" placeholder="your@email.com..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!showPasswordFields && (
                        <Button 
                            type="button" 
                            className="bg-sky-800 text-black mt-4 w-96"
                            onClick={() => setShowPasswordFields(true)}
                        >
                            Continue
                        </Button>
                    )}
                    {showPasswordFields && (
                        <>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="bg-black text-zinc-400 w-96" placeholder="Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-sky-800 text-black mt-4 w-96">Continue</Button>
                        </>
                    )}
                </form>
            </Form>
        </div>
    );

    // return (
    //     <Form {...form}>
    //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //             <FormField
    //                 control={form.control}
    //                 name="email"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>Email Address</FormLabel>
    //                         <FormControl>
    //                             <Input type="email" placeholder="your@email.com..." {...field} />
    //                         </FormControl>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <FormField
    //                 control={form.control}
    //                 name="password"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>Password</FormLabel>
    //                         <FormControl>
    //                             <Input placeholder="********" type="password" {...field} />
    //                         </FormControl>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <Button type="submit">Submit</Button>
    //         </form>
    //         {
    //             showResendVerificationEmail && 
    //             <Button disabled={count > 0 && count < 10} onClick={onResendVerificationEmail} variant={'link'}>Send verification Email</Button>
    //         }
    //         {JSON.stringify(count)}
    //     </Form>
    // )
}


