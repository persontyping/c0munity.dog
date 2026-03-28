export default function Home() {
  return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-40 w-40 border-2 border-gray-400 flex items-center justify-center rounded"
          >
            <span className="text-sm font-medium text-gray-600">Item {i + 1}</span>
          </div>
        ))}
      </div>
  );
}
