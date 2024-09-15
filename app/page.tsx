"use server"

import Image from "next/image";
import PleaseSignIn from "./custom_components/PleaseSignIn";
import HomePageComponentSignedIn from "./custom_components/HomePageComponentSignedIn";
import { validateRequest } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await validateRequest();

  if (!user) {
    return(
      <PleaseSignIn></PleaseSignIn>
    )
  }

  redirect('/dashboard')
}
