'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const labelWithRequiredStar = ({ label }: { label: string }) => {
  return (
    <Label htmlFor={label.toLowerCase()}>
      <span className="flex">
        <span>{label}</span>
        <span className="text-red-500">*</span>
      </span>
    </Label>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'Message sent successfully!');
        setFormData({ fullname: '', email: '', message: '' });
      } else {
        toast.error(data.error || 'Failed to send message.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {labelWithRequiredStar({ label: 'Name' })}
        <div className="space-y-1">
          <Input
            type="text"
            required
            id="name"
            placeholder="Your name, your fame"
            className="px-2 py-6"
            name="fullname"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
          />
        </div>
      </div>
      <div className="space-y-4">
        {labelWithRequiredStar({ label: 'Email' })}
        <div className="flex flex-col space-y-1">
          <Input
            type="email"
            required
            id="email"
            placeholder="Where can I reach you back?"
            className="px-2 py-6"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
      </div>
      <div className="space-y-4">
        {labelWithRequiredStar({ label: 'Message' })}
        <div className="space-y-1">
          <Textarea
            required
            id="message"
            placeholder="Your words, my inbox."
            className="px-2 py-4"
            name="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full px-8 py-6 cursor-pointer"
          size="lg"
          variant="default"
          disabled={isPending}
        >
          {isPending ? 'Sending...' : 'Send Message 📨'}
        </Button>

        <Button
          type="reset"
          className="w-full px-8 py-6 cursor-pointer"
          size="lg"
          variant="outline"
          onClick={() =>
            setFormData({
              fullname: '',
              email: '',
              message: '',
            })
          }
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
export default ContactForm;
