'use client';

import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { deleteMessage, setMessageRead } from '@/app/admin/actions';
import { cn } from '@/lib/utils';
import type { Message } from '@/types/content';

export function MessageList({ messages }: { messages: Message[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function run(fn: () => Promise<{ ok: boolean; message: string }>): void {
    startTransition(async () => {
      const result = await fn();
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  if (messages.length === 0) {
    return (
      <p className="border-t border-[var(--line)] py-10 text-sm text-[var(--muted)]">
        No messages yet.
      </p>
    );
  }

  return (
    <div className="border-t border-[var(--line)]">
      {messages.map((message) => {
        const open = openId === message.id;

        return (
          <div key={message.id} className="border-b border-[var(--line)]">
            <div className="flex items-center gap-3 py-4">
              <button
                type="button"
                onClick={() => {
                  setOpenId(open ? null : message.id);
                  if (!open && !message.read) {
                    run(() => setMessageRead(message.id, true));
                  }
                }}
                className="min-w-0 flex-1 text-left"
              >
                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                  {!message.read ? (
                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                  ) : null}
                  <span className={cn('truncate', !message.read && 'font-medium')}>
                    {message.fullname}
                  </span>
                  {/* Full width on phones so the address wraps instead of
                      colliding with the name. */}
                  <span className="w-full truncate text-xs text-[var(--muted)] sm:w-auto">
                    {message.email}
                  </span>
                </p>
                <p className="mt-1 truncate text-xs text-[var(--muted)]">
                  {message.message}
                </p>
              </button>

              <p className="tnum hidden shrink-0 text-[0.6875rem] text-[var(--muted)] sm:block">
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : ''}
              </p>

              <div className="flex shrink-0 items-center gap-0.5">
                <button
                  type="button"
                  title={message.read ? 'Mark unread' : 'Mark read'}
                  disabled={pending}
                  onClick={() => run(() => setMessageRead(message.id, !message.read))}
                  className="flex size-10 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:text-foreground disabled:opacity-25 sm:size-8"
                >
                  {message.read ? (
                    <MailOpen className="size-4" />
                  ) : (
                    <Mail className="size-4" />
                  )}
                </button>
                <button
                  type="button"
                  title="Delete message"
                  disabled={pending}
                  onClick={() => {
                    if (window.confirm('Delete this message permanently?')) {
                      run(() => deleteMessage(message.id));
                    }
                  }}
                  className="flex size-10 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--destructive)] disabled:opacity-25 sm:size-8"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            {open ? (
              <div className="pb-8">
                <p className="text-[var(--muted)] leading-relaxed whitespace-pre-wrap text-sm">
                  {message.message}
                </p>
                <a
                  href={`mailto:${message.email}?subject=Re: your message`}
                  className="mt-6 inline-block border-b border-foreground pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  Reply by email
                </a>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
