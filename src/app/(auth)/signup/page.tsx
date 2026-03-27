import Link from "next/link";

import SignupForm from "./_components/signup-form";

export default function SignupPage() {
  return (
    <main>
      <h1>Create an account</h1>
      <SignupForm />
      <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
        Already have an account?{" "}
        <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
