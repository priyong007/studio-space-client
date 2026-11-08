
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />
        <Loader2 className="absolute h-6 w-6 text-orange-500" />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-gray-800">
        Studio Space
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Please wait, loading...
      </p>
    </div>
  );
}
