export function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="font-semibold tracking-tight text-3xl">{title}</h1>
      <p className="text-muted-foreground leading-relaxed mt-2 text-sm">{description}</p>
    </div>
  );
}
