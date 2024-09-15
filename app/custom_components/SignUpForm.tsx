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
import { SignUpSchema } from '../types';
import { signUp } from '../actions/auth.actions';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { redirect, useRouter } from 'next/navigation';
import { validateRequest } from '../lib/auth';
import { useState } from 'react';



export function SignUpForm() {

    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const router = useRouter()


    const { toast } = useToast()

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        console.log(values)
        const res = await signUp(values)
        if (res.error) {
            toast({
                title: "Error",
                description: res.error,
            })
        } else if (res.success) {
            toast({
                title: "Success",
                description: "We have sent you an email to verify your account. Please check your inbox.",
            })
            router.push("/dashboard")
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
                            className="bg-white text-black mt-4 w-96"
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="bg-black text-zinc-400 w-96" placeholder="Confirm Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-white text-black mt-4 w-96">Continue</Button>
                        </>
                    )}
                </form>
            </Form>
        </div>
    );
}
