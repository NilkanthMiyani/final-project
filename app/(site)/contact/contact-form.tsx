'use client';

import { useState } from 'react';
import { toast } from 'sonner';


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
          <label htmlFor="fullname" className="key block">
            Name
          </label>
          <input
            id="fullname"
            name="fullname"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
            className="field mt-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="key block">
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
            className="field mt-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="key block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="What are you working on?"
          className="field mt-2 resize-y"
        />
      </div>

      <button type="submit" disabled={pending} className="btn-accent">
        {pending ? 'sending…' : 'send message'}
      </button>
    </form>
  );
}
