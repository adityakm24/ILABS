"use client";
import { useSession, useUser } from "@clerk/nextjs";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { CopyIcon, Dot } from "../icons";
import Image from "next/image";
import { supabaseClient } from "../../utils/supabaseClient"; // Import Supabase client
import "./prism.css";

export function UserDetails() {
  const { isLoaded, user } = useUser();
  const [jsonOutput, setJsonOutput] = useState(false);
  const [preferences, setPreferences] = useState(null); // State to store user preferences
useEffect(() => {
  // Use type assertion to inform TypeScript that Prism exists on window
  if ((window as any).Prism) {
    console.log(`highlighting`);
    (window as any).Prism.highlightAll();
  }
}, []);


  return (
    <div
      className="bg-white overflow-hidden sm:rounded-lg"
      style={{
        boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)`,
      }}
    >

    </div>
  );
}

function JSONOutput(props: { json: any }) {
  useEffect(() => {
    if (window.Prism) {
      console.log(`highlighting`);
      window.Prism.highlightAll();
    }
  }, []);

  return (
    <pre className="px-8 sm:px-6 text-black text-sm">
      <code className="language-json">
        {JSON.stringify(props.json, null, 2)}
      </code>
    </pre>
  );
}
