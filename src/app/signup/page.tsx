// app/signup/page.tsx
import SignupForm from "@/components/auth/Signup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - SolVex School",
  description: "Créez votre compte pour rejoindre SolVex School",
};

export default function SignupPage() {
  return <SignupForm />;
}