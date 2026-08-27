'use client';

import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from 'lucide-react';
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

import type { ActionResult, FormAction } from '@/app/admin/actions';
import { Field, type FieldDef } from '@/components/admin/fields';
import { cn } from '@/lib/utils';

type Item = Record<string, unknown> & { id: string };

type EntityEditorProps = {
  items: Item[];
  fields: FieldDef[];
  /** Field rendered as the row heading. */
  titleKey: string;
  /** Optional field rendered under the heading. */
  subtitleKey?: string;
  /** Singular noun used in buttons and confirmations, e.g. "role". */
  noun: string;
  actions: {
    save: FormAction;
    remove: (id: string) => Promise<ActionResult>;
    move: (id: string, direction: 'up' | 'down') => Promise<ActionResult>;
    toggle?: (id: string) => Promise<ActionResult>;
  };
};

/**
 * List-plus-inline-form editor shared by every collection. Rows collapse to a
 * summary; opening one reveals the form built from `fields`.
 */
export function EntityEditor({
  items,
  fields,
  titleKey,
  subtitleKey,
  noun,
  actions,
}: EntityEditorProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();

  function run(fn: () => Promise<ActionResult>): void {
    startTransition(async () => {
      const result = await fn();
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setCreating((value) => !value);
            setOpenId(null);
          }}
          className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <Plus className="size-3.5" />
          {creating ? 'Cancel' : `New ${noun}`}
        </button>
      </div>

      {creating ? (
        <div className="mb-8 border border-[var(--glass-border)] bg-card p-6">
          <p className="label mb-5">New {noun}</p>
          <EntityForm
            action={actions.save}
            fields={fields}
            item={null}
            onDone={() => setCreating(false)}
            onCancel={() => setCreating(false)}
          />
        </div>
      ) : null}

      <div className="border-t border-[var(--glass-border)]">
        {items.length === 0 ? (
          <p className="py-10 text-sm text-muted-foreground">
            Nothing here yet. Add your first {noun}.
          </p>
        ) : null}

        {items.map((item, index) => {
          const id = item.id;
          const open = openId === id;
          const isDraft = item.published === false;

          return (
            <div key={id} className="border-b border-[var(--glass-border)]">
              <div className="flex items-center gap-3 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenId(open ? null : id);
                    setCreating(false);
                  }}
                  className="min-w-0 flex-1 text-left"
                >
                  <p
                    className={cn(
                      'truncate text-sm font-medium',
                      isDraft && 'text-muted-foreground line-through'
                    )}
                  >
                    {String(item[titleKey] ?? 'Untitled')}
                  </p>
                  {subtitleKey && item[subtitleKey] ? (
                    <p className="label mt-1 truncate normal-case tracking-normal">
                      {String(item[subtitleKey])}
                    </p>
                  ) : null}
                </button>

                <div className="flex shrink-0 items-center gap-0.5">
                  <IconButton
                    label="Move up"
                    disabled={pending || index === 0}
                    onClick={() => run(() => actions.move(id, 'up'))}
                  >
                    <ChevronUp className="size-4" />
                  </IconButton>
                  <IconButton
                    label="Move down"
                    disabled={pending || index === items.length - 1}
                    onClick={() => run(() => actions.move(id, 'down'))}
                  >
                    <ChevronDown className="size-4" />
                  </IconButton>

                  {actions.toggle ? (
                    <IconButton
                      label={isDraft ? 'Publish' : 'Move to draft'}
                      disabled={pending}
                      onClick={() => {
                        const toggle = actions.toggle;
                        if (toggle) run(() => toggle(id));
                      }}
                    >
                      {isDraft ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </IconButton>
                  ) : null}

                  <IconButton
                    label={`Delete ${noun}`}
                    disabled={pending}
                    destructive
                    onClick={() => {
                      if (
                        window.confirm(`Delete this ${noun}? This cannot be undone.`)
                      ) {
                        run(() => actions.remove(id));
                      }
                    }}
                  >
                    <Trash2 className="size-4" />
                  </IconButton>
                </div>
              </div>

              {open ? (
                <div className="pb-8">
                  <EntityForm
                    action={actions.save}
                    fields={fields}
                    item={item}
                    onDone={() => setOpenId(null)}
                    onCancel={() => setOpenId(null)}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** One bound form. Separate component so each gets its own action state. */
function EntityForm({
  action,
  fields,
  item,
  onDone,
  onCancel,
}: {
  action: FormAction;
  fields: FieldDef[];
  item: Item | null;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    action,
    null
  );
  const reported = useRef<ActionResult | null>(null);

  useEffect(() => {
    if (!state || reported.current === state) return;
    reported.current = state;

    if (state.ok) {
      toast.success(state.message);
      onDone();
    } else {
      toast.error(state.message);
    }
  }, [state, onDone]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={item ? item.id : ''} />
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={
              item
                ? item[field.name]
                : // New records default to published.
                  field.name === 'published'
                  ? true
                  : ''
            }
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className="bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-85 disabled:opacity-40"
        >
          {pending ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  destructive,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex size-8 items-center justify-center text-muted-foreground transition-colors disabled:opacity-25',
        destructive ? 'hover:text-destructive' : 'hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}
