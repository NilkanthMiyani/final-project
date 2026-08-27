'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const fieldClass =
  'w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent';

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
    <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
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
          className={fieldClass}
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
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="What are you working on?"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {pending ? 'Sending…' : 'Send message'}
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
