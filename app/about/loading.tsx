export default function Loading() {
  return (
    <div role="status" aria-label="Loading about page" className="px-md tablet:px-2xl py-2xl max-w-[1280px] mx-auto animate-pulse">
      <div className="h-10 w-48 bg-neutral-200 rounded mb-2xl" />
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2xl mb-3xl">
        <div className="aspect-[4/5] bg-neutral-200 rounded-2xl" />
        <div className="flex flex-col gap-md justify-center">
          <div className="h-4 bg-neutral-200 rounded w-full" />
          <div className="h-4 bg-neutral-200 rounded w-5/6" />
          <div className="h-4 bg-neutral-200 rounded w-4/6" />
        </div>
      </div>
      <div className="h-8 w-56 bg-neutral-200 rounded mb-xl" />
      <div className="flex flex-col gap-lg max-w-xl">
        {[1,2].map(i => <div key={i} className="h-16 bg-neutral-100 rounded" />)}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
