'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const fieldClass =
  'w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet)]/20';

export function ContactForm() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setPending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: data.get('fullname'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        toast.error(result.error ?? 'Something went wrong.');
        return;
      }

      form.reset();
      toast.success('Message sent. I’ll get back to you.');
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullname" className="label">
            Name
          </label>
          <input
            id="fullname"
            name="fullname"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
            className={`${fieldClass} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="What are you working on?"
          className={`${fieldClass} mt-2 resize-none`}
        />
      </div>

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
        {pending ? 'Sending…' : 'Send message'}
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
