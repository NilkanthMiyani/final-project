import { deleteSkill, moveSkill, saveSkill } from '@/app/admin/actions';
import { EntityEditor } from '@/components/admin/entity-editor';
import type { FieldDef } from '@/components/admin/fields';
import { PageTitle } from '@/components/admin/page-title';
import { adminGetSkills } from '@/lib/admin-content';

const fields: FieldDef[] = [
  { name: 'name', label: 'Skill', type: 'text' },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    hint: 'Skills are grouped by this exact string — reuse existing spellings.',
  },
  { name: 'published', label: 'Published', type: 'checkbox' },
];

export default async function AdminSkillsPage() {
  const skills = await adminGetSkills();
  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <div>
      <PageTitle
        title="Skills"
        description="Grouped by category on the homepage and the about page."
      />

      {categories.length > 0 ? (
        <p className="mb-6 text-xs text-muted-foreground">
          Categories in use: {categories.join(' · ')}
        </p>
      ) : null}

      <EntityEditor
        items={skills}
        fields={fields}
        titleKey="name"
        subtitleKey="category"
        noun="skill"
        actions={{ save: saveSkill, remove: deleteSkill, move: moveSkill }}
      />
    </div>
  );
}
