import Link from "next/link";

import LoginForm from "./_components/login-form";
import MagicLinkForm from "./_components/magic-link-form";

export default function LoginPage() {
  return (
    <main>
      <h1>Log in</h1>
      <LoginForm />

      <div
        style={{
          margin: "1.25rem 0",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontSize: "0.875rem",
          opacity: 0.8,
        }}
      >
        <span style={{ flex: 1, borderTop: "1px solid currentColor", opacity: 0.2 }} />
        <span>or</span>
        <span style={{ flex: 1, borderTop: "1px solid currentColor", opacity: 0.2 }} />
      </div>

      <MagicLinkForm />

      <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup">Create one</Link>
      </p>
    </main>
  );
}
