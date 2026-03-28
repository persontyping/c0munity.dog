export default function Home() {
  return (
    <div className="min-h-lvh flex flex-row flex-wrap justify-center items-center border-amber-100 border-2 rounded gap-4 ">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-60 w-60 border-2 border-amber-400 flex items-center justify-center rounded"
        >
          <span className="text-sm font-medium">          <span className="logo-box text-5xl ">
            🌭
          </span> {i + 1}</span>
        </div>
      ))}
    </div>
  );
}
