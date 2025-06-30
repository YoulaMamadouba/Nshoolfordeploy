// app/login/page.tsx
import LoginForm from "@/components/auth/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - SolVex School",
  description: "Connectez-vous à votre espace personnel SolVex School",
};

export default function LoginPage() {
  return <LoginForm />;
}