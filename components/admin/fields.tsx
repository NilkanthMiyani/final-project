import { cn } from '@/lib/utils';

export type FieldDef = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'list' | 'checkbox' | 'url';
  placeholder?: string;
  hint?: string;
  rows?: number;
  wide?: boolean;
};

export const inputClass =
  'w-full border-0 border-b border-rule bg-transparent px-0 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent';

/**
 * Renders one field from a FieldDef against a plain value object.
 * `list` fields serialise a string[] as one item per line.
 */
export function Field({
  field,
  value,
}: {
  field: FieldDef;
  value: unknown;
}) {
  const id = `${field.name}-${Math.random().toString(36).slice(2, 8)}`;

  if (field.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-3 py-2">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={Boolean(value)}
          className="size-4 accent-[var(--accent)]"
        />
        <span className="text-sm">{field.label}</span>
      </label>
    );
  }

  const isMultiline = field.type === 'textarea' || field.type === 'list';
  const defaultValue =
    field.type === 'list' && Array.isArray(value)
      ? value.join('\n')
      : typeof value === 'string'
        ? value
        : '';

  return (
    <div className={cn(field.wide || isMultiline ? 'sm:col-span-2' : undefined)}>
      <label htmlFor={id} className="label">
        {field.label}
      </label>

      {isMultiline ? (
        <textarea
          id={id}
          name={field.name}
          rows={field.rows ?? (field.type === 'list' ? 5 : 3)}
          defaultValue={defaultValue}
          placeholder={field.placeholder ?? ''}
          className={cn(inputClass, 'resize-y')}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type === 'url' ? 'url' : 'text'}
          defaultValue={defaultValue}
          placeholder={field.placeholder ?? ''}
          className={inputClass}
        />
      )}

      {field.hint ? (
        <p className="mt-1.5 font-mono text-[0.6875rem] text-muted-foreground">
          {field.hint}
        </p>
      ) : null}
    </div>
  );
}
