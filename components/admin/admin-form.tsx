'use client';

import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

import type { ActionResult, FormAction } from '@/app/admin/actions';

/**
 * Binds a server action to a form natively, so the fields post in React's own
 * encoding and the form still submits before hydration. Fields are rendered by
 * the parent server component and passed as children.
 */
export function AdminForm({
  action,
  submitLabel = 'Save',
  children,
  resetOnSuccess = false,
}: {
  action: FormAction;
  submitLabel?: string;
  children: React.ReactNode;
  resetOnSuccess?: boolean;
}) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    action,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const reported = useRef<ActionResult | null>(null);

  useEffect(() => {
    // Guard against re-reporting the same result on unrelated re-renders.
    if (!state || reported.current === state) return;
    reported.current = state;

    if (state.ok) {
      toast.success(state.message);
      if (resetOnSuccess) formRef.current?.reset();
    } else {
      toast.error(state.message);
    }
  }, [state, resetOnSuccess]);

  return (
    <form ref={formRef} action={formAction}>
      {children}
      <button
        type="submit"
        disabled={pending}
        className="mt-10 bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-85 disabled:opacity-40"
      >
        {pending ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
