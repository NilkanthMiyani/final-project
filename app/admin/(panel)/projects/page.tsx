import {
  deleteProject,
  moveProject,
  saveProject,
  toggleProject,
} from '@/app/admin/actions';
import { EntityEditor } from '@/components/admin/entity-editor';
import type { FieldDef } from '@/components/admin/fields';
import { PageTitle } from '@/components/admin/page-title';
import { adminGetProjects } from '@/lib/admin-content';

const fields: FieldDef[] = [
  { name: 'title', label: 'Title', type: 'text' },
  {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    hint: 'URL path. Leave blank to derive it from the title.',
  },
  { name: 'tagline', label: 'Tagline', type: 'textarea', rows: 2 },
  {
    name: 'overview',
    label: 'Overview',
    type: 'textarea',
    rows: 5,
    hint: 'The opening paragraph on the project page.',
  },
  { name: 'features', label: 'What it does', type: 'list', rows: 6 },
  {
    name: 'outcomes',
    label: 'Outcomes',
    type: 'list',
    rows: 4,
    hint: 'Measurable results, one per line. Optional but the strongest section.',
  },
  { name: 'techStack', label: 'Tech stack', type: 'list', rows: 5 },
  { name: 'github', label: 'Source URL', type: 'url' },
  { name: 'live', label: 'Live URL', type: 'url' },
  {
    name: 'featured',
    label: 'Featured on homepage',
    type: 'checkbox',
  },
  { name: 'published', label: 'Published', type: 'checkbox' },
];

export default async function AdminProjectsPage() {
  const projects = await adminGetProjects();

  // The form is flat, but `links` is nested on the document.
  const items = projects.map((project) => ({
    ...project,
    github: project.links.github,
    live: project.links.live,
  }));

  return (
    <div>
      <PageTitle
        title="Projects"
        description="Featured projects appear on the homepage; all published ones appear at /projects."
      />
      <EntityEditor
        items={items}
        fields={fields}
        titleKey="title"
        subtitleKey="tagline"
        noun="project"
        actions={{
          save: saveProject,
          remove: deleteProject,
          move: moveProject,
          toggle: toggleProject,
        }}
      />
    </div>
  );
}
