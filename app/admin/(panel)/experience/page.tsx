import {
  deleteExperience,
  moveExperience,
  saveExperience,
  toggleExperience,
} from '@/app/admin/actions';
import { EntityEditor } from '@/components/admin/entity-editor';
import type { FieldDef } from '@/components/admin/fields';
import { PageTitle } from '@/components/admin/page-title';
import { adminGetExperience } from '@/lib/admin-content';

const fields: FieldDef[] = [
  { name: 'company', label: 'Company', type: 'text' },
  { name: 'role', label: 'Role', type: 'text' },
  {
    name: 'employmentType',
    label: 'Type',
    type: 'text',
    placeholder: 'Full-time / Internship',
  },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'startDate', label: 'Start', type: 'text', placeholder: 'Jun 2026' },
  {
    name: 'endDate',
    label: 'End',
    type: 'text',
    placeholder: 'Jun 2026',
    hint: 'Ignored when “Current role” is ticked.',
  },
  {
    name: 'bullets',
    label: 'Achievements',
    type: 'list',
    rows: 8,
    hint: 'One per line. Lead with the outcome and keep the numbers in.',
  },
  { name: 'current', label: 'Current role', type: 'checkbox' },
  { name: 'published', label: 'Published', type: 'checkbox' },
];

export default async function AdminExperiencePage() {
  const experience = await adminGetExperience();

  return (
    <div>
      <PageTitle
        title="Experience"
        description="Roles shown on the homepage timeline, newest first."
      />
      <EntityEditor
        items={experience}
        fields={fields}
        titleKey="company"
        subtitleKey="role"
        noun="role"
        actions={{
          save: saveExperience,
          remove: deleteExperience,
          move: moveExperience,
          toggle: toggleExperience,
        }}
      />
    </div>
  );
}
