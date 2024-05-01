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
    // Function to fetch user preferences from Supabase
    const fetchPreferences = async () => {
      try {
        // Make request to Supabase to fetch preferences based on user ID
        const { data, error } = await supabaseClient
          .from("users")
          .select("preferences")
          .eq("user_id", user.id)
          .single();

        if (error) {
          throw error;
        }

        // If preferences are found, set them in state
        if (data) {
          setPreferences(data.preferences);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    // Fetch user preferences when user is loaded and user ID is available
    if (isLoaded && user) {
      fetchPreferences();
    }
  }, [isLoaded, user]);

  return (
    <div
      className="bg-white overflow-hidden sm:rounded-lg"
      style={{
        boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)`,
      }}
    >
      <div className="flex flex-col p-8">
        <h1 className="text-xl leading-6 font-semibold text-gray-900 mb-4 text-align: left">
          House Name
        </h1>
        
        
        <div className="w-full">
          <Image
            src="/house.jpg"
            alt="Luxury House"
            width={500}
            height={300}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
        {/* Render preferences if available */}
        {preferences && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Preferences:</h2>
            {/* Render preferences data here */}
            <JSONOutput json={preferences} />
          </div>
        )}
      </div>
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
