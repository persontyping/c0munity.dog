import Link from "next/link";

import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <main>
      <h1>Log in</h1>
      <LoginForm />
      <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup">Create one</Link>
      </p>
    </main>
  );
}
