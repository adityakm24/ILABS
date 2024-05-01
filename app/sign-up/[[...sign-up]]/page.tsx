"use client";
import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SignUpPage() {

  return (
    <div className="flex justify-center py-24">
      <SignUp />
    </div>
  );
}
