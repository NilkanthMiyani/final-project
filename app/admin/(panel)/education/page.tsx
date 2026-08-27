import {
  deleteEducation,
  moveEducation,
  saveEducation,
  toggleEducation,
} from '@/app/admin/actions';
import { EntityEditor } from '@/components/admin/entity-editor';
import type { FieldDef } from '@/components/admin/fields';
import { PageTitle } from '@/components/admin/page-title';
import { adminGetEducation } from '@/lib/admin-content';

const fields: FieldDef[] = [
  { name: 'institution', label: 'Institution', type: 'text' },
  { name: 'degree', label: 'Degree', type: 'text' },
  { name: 'field', label: 'Field', type: 'text' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'startDate', label: 'Start', type: 'text' },
  { name: 'endDate', label: 'End', type: 'text' },
  { name: 'grade', label: 'Grade', type: 'text', placeholder: 'CGPA 8.64' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
  { name: 'published', label: 'Published', type: 'checkbox' },
];

export default async function AdminEducationPage() {
  const education = await adminGetEducation();

  return (
    <div>
      <PageTitle title="Education" description="Shown on the about page." />
      <EntityEditor
        items={education}
        fields={fields}
        titleKey="institution"
        subtitleKey="degree"
        noun="entry"
        actions={{
          save: saveEducation,
          remove: deleteEducation,
          move: moveEducation,
          toggle: toggleEducation,
        }}
      />
    </div>
  );
}
