import { Wordmark } from "@/components/ui";

/**
 * Route-level loading state. Same surface as the page so a slow navigation
 * shows a quiet branded beat instead of a blank flash; the view-transition
 * cross-fade animates it in and out.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-base">
      <div className="animate-pulse">
        <Wordmark className="text-[28px]" />
      </div>
    </div>
  );
}
