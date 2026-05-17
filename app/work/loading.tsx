export default function Loading() {
  return (
    <div role="status" aria-label="Loading work page" className="px-md tablet:px-xl desktop:px-2xl py-xl max-w-screen-desktop mx-auto animate-pulse">
      <div className="h-10 w-48 bg-neutral-200 rounded mb-xl" />
      <div className="flex gap-md mb-xl">
        {[1,2,3,4].map(i => <div key={i} className="h-9 w-20 bg-neutral-100 rounded" />)}
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-lg">
        <div className="col-span-1 tablet:col-span-2 aspect-[16/9] bg-neutral-200 rounded-lg" />
        {[1,2,3,4].map(i => <div key={i} className="aspect-[4/3] bg-neutral-100 rounded-lg" />)}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
