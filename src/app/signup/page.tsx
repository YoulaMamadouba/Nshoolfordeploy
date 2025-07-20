// app/signup/page.tsx
import SignupMultiStep from "@/components/auth/SignupMultiStep";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - SolVex School",
  description: "Créez votre compte pour rejoindre SolVex School",
};

export default function SignupPage() {
  return <SignupMultiStep />;
}