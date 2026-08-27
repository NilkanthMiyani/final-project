import {
  deleteCertification,
  moveCertification,
  saveCertification,
  toggleCertification,
} from '@/app/admin/actions';
import { EntityEditor } from '@/components/admin/entity-editor';
import type { FieldDef } from '@/components/admin/fields';
import { PageTitle } from '@/components/admin/page-title';
import { adminGetCertifications } from '@/lib/admin-content';

const fields: FieldDef[] = [
  { name: 'name', label: 'Certification', type: 'text' },
  { name: 'issuer', label: 'Issuer', type: 'text' },
  { name: 'issuedDate', label: 'Issued', type: 'text', placeholder: 'Apr 2026' },
  { name: 'credentialUrl', label: 'Verify URL', type: 'url' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { name: 'published', label: 'Published', type: 'checkbox' },
];

export default async function AdminCertificationsPage() {
  const certifications = await adminGetCertifications();

  return (
    <div>
      <PageTitle
        title="Certifications"
        description="Listed on the about page, each linking to its verification page."
      />
      <EntityEditor
        items={certifications}
        fields={fields}
        titleKey="name"
        subtitleKey="issuer"
        noun="certification"
        actions={{
          save: saveCertification,
          remove: deleteCertification,
          move: moveCertification,
          toggle: toggleCertification,
        }}
      />
    </div>
  );
}
