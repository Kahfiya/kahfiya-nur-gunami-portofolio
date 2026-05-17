export default function Loading() {
  return (
    <div role="status" aria-label="Loading contact page" className="px-md tablet:px-2xl py-2xl max-w-[1280px] mx-auto animate-pulse">
      <div className="h-10 w-64 bg-neutral-200 rounded mb-2xl" />
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2xl">
        <div className="flex flex-col gap-lg">
          <div className="h-4 bg-neutral-100 rounded w-full" />
          <div className="h-4 bg-neutral-100 rounded w-4/5" />
          {[1,2,3].map(i => <div key={i} className="h-11 bg-neutral-200 rounded" />)}
        </div>
        <div className="flex flex-col gap-lg">
          {[1,2,3].map(i => <div key={i} className="h-14 bg-neutral-100 rounded" />)}
          <div className="h-32 bg-neutral-100 rounded" />
          <div className="h-11 w-40 bg-neutral-200 rounded" />
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
