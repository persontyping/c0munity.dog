This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Supabase Setup

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from your Supabase project.
3. Keep `SUPABASE_SECRET_API_KEY` server-only. Never expose it in client components or `NEXT_PUBLIC_*` variables.

Reusable clients are available in:

- `src/lib/supabase/client.ts` for Client Components
- `src/lib/supabase/server.ts` for Server Components and Route Handlers
- `src/lib/supabase/admin.ts` for server-only admin tasks with the secret API key

### Client Component usage

```tsx
"use client";

import { createClient } from "@/lib/supabase/client";

export default function ExampleClientComponent() {
	const supabase = createClient();

	async function loadProfile() {
		const { data, error } = await supabase.from("profiles").select("*");
		if (error) console.error(error);
		console.log(data);
	}

	return <button onClick={loadProfile}>Load profile</button>;
}
```

### Server Component usage

```tsx
import { createClient } from "@/lib/supabase/server";

export default async function ExampleServerComponent() {
	const supabase = await createClient();
	const { data, error } = await supabase.from("profiles").select("*");

	if (error) {
		return <p>Failed to load profiles.</p>;
	}

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### Security notes

- Keep Row Level Security (RLS) enabled on Supabase tables.
- Use the publishable key in browser code only; it is safe when RLS is configured.
- Use the secret API key only on the server (Route Handlers / Server Actions) and never return it to the client.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
