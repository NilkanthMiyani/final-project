import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

/**
 * Renders one field from a FieldDef against a plain value object.
 * `list` fields serialise a string[] as one item per line.
 *
 * The control is nested inside its `<label>` rather than linked by `htmlFor`.
 * An earlier version generated the id with `Math.random()`, which produced a
 * different value on the server and on the client — a hydration mismatch on
 * every form, and a fresh id on every re-render.
 */
export function Field({ field, value }: { field: FieldDef; value: unknown }) {
  if (field.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-3 py-2">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={Boolean(value)}
          className="size-4 accent-primary"
        />
        <span className="text-sm font-medium">{field.label}</span>
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
      <Label className="flex flex-col items-start gap-2">
        <span>{field.label}</span>

        {isMultiline ? (
          <Textarea
            name={field.name}
            rows={field.rows ?? (field.type === 'list' ? 5 : 3)}
            defaultValue={defaultValue}
            placeholder={field.placeholder ?? ''}
            className="resize-y"
          />
        ) : (
          <Input
            name={field.name}
            type={field.type === 'url' ? 'url' : 'text'}
            defaultValue={defaultValue}
            placeholder={field.placeholder ?? ''}
          />
        )}
      </Label>

      {field.hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{field.hint}</p>
      ) : null}
    </div>
  );
}
