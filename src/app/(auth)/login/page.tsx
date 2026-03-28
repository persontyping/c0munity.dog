import Link from "next/link";
import LoginForm from "./_components/login-form";
import MagicLinkForm from "./_components/magic-link-form";

export default function LoginPage() {
  return (
    <div className="min-h-lvh flex flex-row flex-wrap justify-center items-center border-amber-100 border-2 rounded gap-4 ">

      <LoginForm />

 

      <MagicLinkForm />

      <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup">Create one</Link>
      </p>
    </div>
  );
}
