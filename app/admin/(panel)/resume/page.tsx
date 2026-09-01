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
        <div className="mb-10 rounded-xl border border-border/40 p-5">
          <p className="text-sm font-semibold tracking-tight">Currently live</p>
          <Link
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block break-all text-sm text-primary underline-offset-4 hover:underline"
          >
            {profile.resumeUrl}
          </Link>
        </div>
      ) : null}

      <section className="border-t border-border pt-6">
        <p className="mb-5 text-sm font-semibold tracking-tight">Upload a new PDF</p>

        {blobConfigured ? (
          <AdminForm action={uploadResume} submitLabel="Upload" resetOnSuccess>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              required
              className="block w-full text-sm text-muted-foreground file:mr-4 file:border file:border-border file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-foreground hover:file:bg-accent"
            />
            <p className="mt-3 text-xs text-muted-foreground">
              PDF only, up to 5 MB. The file goes to Vercel Blob and the
              &ldquo;Get Resume&rdquo; button on the site switches to it
              immediately. The previous upload is deleted, so only the current
              résumé is ever stored.
            </p>
          </AdminForm>
        ) : (
          <p className="text-muted-foreground leading-relaxed text-sm">
            Uploading needs <code >BLOB_READ_WRITE_TOKEN</code>{' '}
            in the environment. Create a Blob store in the Vercel dashboard, then
            pull the variable in. Until then, set the link manually below.
          </p>
        )}
      </section>

      <section className="mt-12 border-t border-border pt-6">
        <p className="mb-5 text-sm font-semibold tracking-tight">Or point at a URL</p>
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
