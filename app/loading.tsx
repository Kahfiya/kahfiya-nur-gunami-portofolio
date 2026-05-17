export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="px-md tablet:px-2xl py-2xl max-w-[1280px] mx-auto animate-pulse">
      {/* Hero skeleton */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-lg">
        <div className="h-16 w-2/3 bg-neutral-200 rounded" />
        <div className="h-6 w-1/3 bg-neutral-100 rounded" />
        <div className="flex gap-md">
          <div className="h-11 w-32 bg-neutral-200 rounded" />
          <div className="h-11 w-32 bg-neutral-100 rounded" />
        </div>
      </div>
      {/* Projects skeleton */}
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-lg mt-2xl">
        <div className="col-span-2 aspect-[16/9] bg-neutral-200 rounded-lg" />
        <div className="aspect-[4/3] bg-neutral-100 rounded-lg" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
