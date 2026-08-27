import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { setResumeUrl, uploadResume } from '@/app/admin/actions';
import { AdminForm } from '@/components/admin/admin-form';
import { Field } from '@/components/admin/fields';
import { PageTitle } from '@/components/admin/page-title';
import { adminGetProfile } from '@/lib/admin-content';

export default async function AdminResumePage() {
  const profile = await adminGetProfile();
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <div>
      <PageTitle
        title="Résumé"
        description="The file behind the Résumé button on the homepage."
      />

      {profile.resumeUrl ? (
        <div className="mb-10 border border-[var(--glass-border)] p-5">
          <p className="label">Currently live</p>
          <Link
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-2 inline-flex items-center gap-1.5 break-all font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {profile.resumeUrl}
            <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      ) : null}

      <section className="border-t border-[var(--glass-border)] pt-6">
        <p className="label mb-5">Upload a new PDF</p>

        {blobConfigured ? (
          <AdminForm action={uploadResume} submitLabel="Upload" resetOnSuccess>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              required
              className="block w-full text-sm text-muted-foreground file:mr-4 file:border file:border-[var(--glass-border)] file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-foreground hover:file:bg-secondary"
            />
            <p className="mt-3 font-mono text-[0.6875rem] text-muted-foreground">
              PDF only, up to 5 MB. Uploading replaces the link on the site
              immediately.
            </p>
          </AdminForm>
        ) : (
          <p className="text-muted-foreground leading-relaxed text-sm">
            Uploading needs <code className="font-mono">BLOB_READ_WRITE_TOKEN</code>{' '}
            in the environment. Create a Blob store in the Vercel dashboard, then
            pull the variable in. Until then, set the link manually below.
          </p>
        )}
      </section>

      <section className="mt-12 border-t border-[var(--glass-border)] pt-6">
        <p className="label mb-5">Or point at a URL</p>
        <AdminForm action={setResumeUrl} submitLabel="Save link">
          <div className="max-w-xl">
            <Field
              field={{
                name: 'resumeUrl',
                label: 'Résumé URL',
                type: 'text',
                hint: 'An absolute URL, or a path like /resumenilkanth.pdf for a file in public/.',
              }}
              value={profile.resumeUrl}
            />
          </div>
        </AdminForm>
      </section>
    </div>
  );
}
