import { saveProfile } from '@/app/admin/actions';
import { AdminForm } from '@/components/admin/admin-form';
import { Field, type FieldDef } from '@/components/admin/fields';
import { PageTitle } from '@/components/admin/page-title';
import { adminGetProfile } from '@/lib/admin-content';

const identity: FieldDef[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'role', label: 'Role', type: 'text', placeholder: 'DevOps Engineer' },
  {
    name: 'headline',
    label: 'Hero headline',
    type: 'text',
    wide: true,
    hint: 'The large serif line on the homepage. Lead with a result, not a job title.',
  },
  {
    name: 'subheadline',
    label: 'Hero subheadline',
    type: 'textarea',
    rows: 2,
  },
  {
    name: 'bio',
    label: 'Bio paragraphs',
    type: 'list',
    rows: 8,
    hint: 'One paragraph per line. The first is quoted on the homepage.',
  },
];

const showcase: FieldDef[] = [
  {
    name: 'highlights',
    label: 'Bento stat tiles',
    type: 'list',
    rows: 5,
    hint: 'One per line as `value | label`, e.g. `60% | client hosting spend cut`. Shown as tiles on the homepage.',
  },
];

const contact: FieldDef[] = [
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  {
    name: 'availability',
    label: 'Availability note',
    type: 'text',
    hint: 'Shown top-right of the hero. Leave blank to hide.',
  },
];

const socials: FieldDef[] = [
  { name: 'github', label: 'GitHub URL', type: 'url' },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'url' },
  { name: 'twitter', label: 'X URL', type: 'url' },
  { name: 'telegram', label: 'Telegram URL', type: 'url' },
];

const seo: FieldDef[] = [
  { name: 'seoDescription', label: 'Meta description', type: 'textarea', rows: 3 },
  {
    name: 'seoKeywords',
    label: 'Keywords',
    type: 'list',
    rows: 6,
    hint: 'One per line.',
  },
];

export default async function AdminProfilePage() {
  const profile = await adminGetProfile();

  const values: Record<string, unknown> = {
    ...profile,
    ...profile.socials,
    highlights: profile.highlights.map(
      (entry) => `${entry.value} | ${entry.label}`
    ),
  };

  return (
    <div>
      <PageTitle
        title="Profile"
        description="Your name, hero copy, bio, contact details, and SEO metadata."
      />

      <AdminForm action={saveProfile}>
        <FieldGroup label="Identity" fields={identity} values={values} />
        <FieldGroup label="Highlights" fields={showcase} values={values} />
        <FieldGroup label="Contact" fields={contact} values={values} />
        <FieldGroup label="Socials" fields={socials} values={values} />
        <FieldGroup label="SEO" fields={seo} values={values} />
      </AdminForm>
    </div>
  );
}

function FieldGroup({
  label,
  fields,
  values,
}: {
  label: string;
  fields: FieldDef[];
  values: Record<string, unknown>;
}) {
  return (
    <fieldset className="mb-12 border-t border-[var(--line)] pt-8">
      <legend className="eyebrow mb-6">{label}</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <Field key={field.name} field={field} value={values[field.name]} />
        ))}
      </div>
    </fieldset>
  );
}
