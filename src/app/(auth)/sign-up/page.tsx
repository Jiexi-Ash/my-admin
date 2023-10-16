import SignUp from "@/components/forms/SignUp";
import { Sign } from "crypto";
import React from "react";

function SignUpPage() {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <SignUp />
    </div>
  );
}

export default SignUpPage;
