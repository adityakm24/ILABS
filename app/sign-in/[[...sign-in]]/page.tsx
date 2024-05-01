"use client";
import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SignInPage() {

  return (
    <div className="flex justify-center py-24">
      <SignIn />
    </div>
  );
}
