// app/login/page.tsx
import LoginSchool from "@/components/auth/LoginSchool";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - SolVex School",
  description: "Connectez-vous à votre espace SolVex School",
};

export default function LoginPage() {
  return <LoginSchool />;
}