'use client';

import {
  useActionState,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
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

/** Swaps a row with its neighbour, for the optimistic reorder. */
function swap(items: Item[], id: string, direction: 'up' | 'down'): Item[] {
  const from = items.findIndex((item) => item.id === id);
  const to = direction === 'up' ? from - 1 : from + 1;
  if (from < 0 || to < 0 || to >= items.length) return items;

  const next = items.slice();
  [next[from], next[to]] = [next[to]!, next[from]!];
  return next;
}

/**
 * List-plus-inline-form editor shared by every collection. Rows collapse to a
 * summary; opening one reveals the form built from `fields`.
 *
 * Reordering is applied optimistically and only the row being acted on is
 * disabled. Previously every arrow click round-tripped to the server before the
 * list moved, with a single `pending` flag that greyed out every control on the
 * page while it did — so a three-step reorder felt like three freezes.
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
  const [busyId, setBusyId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [ordered, applyMove] = useOptimistic(
    items,
    (state: Item[], move: { id: string; direction: 'up' | 'down' }) =>
      swap(state, move.id, move.direction)
  );

  function run(id: string, fn: () => Promise<ActionResult>): void {
    startTransition(async () => {
      setBusyId(id);
      try {
        const result = await fn();
        if (result.ok) toast.success(result.message);
        else toast.error(result.message);
      } finally {
        setBusyId(null);
      }
    });
  }

  function move(id: string, direction: 'up' | 'down'): void {
    startTransition(async () => {
      // Inside the transition, so React holds the optimistic order until the
      // server render carrying the real order arrives.
      applyMove({ id, direction });
      const result = await actions.move(id, direction);
      if (!result.ok) toast.error(result.message);
    });
  }

  return (
    <div>
      <div className="mb-6 flex">
        <button
          type="button"
          onClick={() => {
            setCreating((value) => !value);
            setOpenId(null);
          }}
          className="btn w-full justify-center sm:ml-auto sm:w-auto"
        >
          {creating ? 'Cancel' : `New ${noun}`}
        </button>
      </div>

      {creating ? (
        <div className="mb-8 rounded-sm border border-border p-5 sm:p-6">
          <p className="eyebrow">New {noun}</p>
          <div className="mt-5">
            <EntityForm
              action={actions.save}
              fields={fields}
              item={null}
              onDone={() => setCreating(false)}
              onCancel={() => setCreating(false)}
            />
          </div>
        </div>
      ) : null}

      <div className="border-t border-border">
        {ordered.length === 0 ? (
          <p className="py-10 text-sm text-muted-foreground">
            Nothing here yet. Add your first {noun}.
          </p>
        ) : null}

        {ordered.map((item, index) => {
          const id = item.id;
          const open = openId === id;
          const isDraft = item.published === false;
          const busy = busyId === id;

          return (
            <div
              key={id}
              className={cn(
                'border-b border-border transition-opacity',
                busy && 'opacity-50'
              )}
            >
              {/*
                Phones get the title on its own row with the controls beneath,
                so the tap target for opening a record spans the full width and
                the icons are not squeezed against a truncated title.
              */}
              <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-3 sm:py-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenId(open ? null : id);
                    setCreating(false);
                  }}
                  className="min-w-0 flex-1 py-1 text-left"
                >
                  <p className="flex items-baseline gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {open ? '–' : '+'}
                    </span>
                    <span
                      className={cn(
                        'min-w-0 font-medium sm:truncate',
                        isDraft && 'text-muted-foreground line-through'
                      )}
                    >
                      {String(item[titleKey] ?? 'Untitled')}
                    </span>
                    {isDraft ? (
                      <span className="shrink-0 text-xs text-muted-foreground">Draft</span>
                    ) : null}
                  </p>
                  {subtitleKey && item[subtitleKey] ? (
                    <p className="mt-1 pl-5 text-xs text-muted-foreground sm:truncate">
                      {String(item[subtitleKey])}
                    </p>
                  ) : null}
                </button>

                <div className="-ml-2 flex shrink-0 items-center gap-0.5 pl-3 sm:ml-0 sm:pl-0">
                  <IconButton
                    label="Move up"
                    disabled={busy || index === 0}
                    onClick={() => move(id, 'up')}
                  >
                    ↑
                  </IconButton>
                  <IconButton
                    label="Move down"
                    disabled={busy || index === ordered.length - 1}
                    onClick={() => move(id, 'down')}
                  >
                    ↓
                  </IconButton>

                  {actions.toggle ? (
                    <IconButton
                      label={isDraft ? 'Publish' : 'Move to draft'}
                      disabled={busy}
                      onClick={() => {
                        const toggle = actions.toggle;
                        if (toggle) run(id, () => toggle(id));
                      }}
                    >
                      {isDraft ? 'Off' : 'On'}
                    </IconButton>
                  ) : null}

                  <IconButton
                    label={`Delete ${noun}`}
                    disabled={busy}
                    destructive
                    onClick={() => {
                      if (
                        window.confirm(`Delete this ${noun}? This cannot be undone.`)
                      ) {
                        run(id, () => actions.remove(id));
                      }
                    }}
                  >
                    ✕
                  </IconButton>
                </div>
              </div>

              {open ? (
                <div className="pb-8 pl-5">
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

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="submit"
          disabled={pending}
          className="btn w-full justify-center sm:w-auto"
        >
          {pending ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:w-auto sm:py-0"
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
        // 40px on touch screens keeps these above the minimum tap target;
        // desktop can afford the tighter 32px.
        'flex size-10 items-center justify-center text-xs text-muted-foreground transition-colors sm:size-8',
        'disabled:opacity-25',
        destructive
          ? 'hover:text-destructive'
          : 'hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}
