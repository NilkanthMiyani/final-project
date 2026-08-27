export function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="display text-3xl">{title}</h1>
      <p className="prose-editorial mt-2 text-sm">{description}</p>
    </div>
  );
}
