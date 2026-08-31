export function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="display text-2xl font-medium">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        {description}
      </p>
    </div>
  );
}
