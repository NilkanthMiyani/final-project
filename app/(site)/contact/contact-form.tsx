'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border/40 p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullname">Name</Label>
          <Input
            id="fullname"
            name="fullname"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="What are you working on?"
        />
      </div>

      <Button type="submit" disabled={pending} className="w-fit rounded-md">
        {pending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
