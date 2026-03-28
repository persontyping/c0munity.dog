export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md items-start justify-center px-4 py-6 sm:px-6 sm:py-10">
      <div className="w-full">{children}</div>
    </div>
  );
}
