export function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-medium tracking-tight sm:text-2xl">
        <span className="mr-2 text-[var(--accent)]">$</span>
        {title.toLowerCase()}
      </h1>
      <p className="prose-body mt-2 text-sm text-[var(--muted-foreground)]">
        {description}
      </p>
    </div>
  );
}
