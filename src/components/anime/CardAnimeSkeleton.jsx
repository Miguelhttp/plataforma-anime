export default function CardAnimeSkeleton({ variant = "default" }) {
  if (variant === "list") {
    return (
      <div className="bg-[#202024] rounded-lg overflow-hidden shadow-md animate-pulse w-full max-w-xl mx-auto flex gap-4 p-4 items-center">
        <div className="w-24 h-32 bg-gray-600 rounded-lg flex-shrink-0" />
        <div className="flex flex-col flex-grow space-y-4">
          <div className="h-6 bg-gray-600 rounded w-3/4" />
          <div className="h-4 bg-gray-500 rounded w-1/2" />
          <div className="h-10 bg-gray-600 rounded w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#202024] rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-64 bg-gray-600" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-600 rounded w-3/4" />
        <div className="h-3 bg-gray-500 rounded w-1/2" />
        <div className="h-8 bg-gray-600 rounded mt-4 w-full" />
      </div>
    </div>
  );
}
