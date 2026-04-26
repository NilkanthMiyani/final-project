import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Badge } from '@/components/ui/badge';
import { mySkills } from '@/constants';

const SkillsToolsPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Skills & Tools</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          Mastered through countless deployments and infrastructure configs!
        </PageHeaderHeading>
        <PageHeaderDescription>
          As a DevOps and Cloud Engineer, I specialize in building scalable
          infrastructure using modern tools such as Docker, Kubernetes, and
          Terraform. I'm dedicated to expanding my expertise in cloud automation
          practices to create efficient, maintainable, and robust systems.
        </PageHeaderDescription>
      </PageHeader>

      {/* skills and tools badges */}
      <div
        id="badges"
        className="flex flex-wrap items-center justify-start gap-3 my-8"
      >
        {mySkills.map((item) => (
          <Badge
            key={item.title}
            variant="outline"
            className="px-6 py-3 text-lg font-medium border-border/50 bg-card/50 hover:bg-accent hover:text-accent-foreground shadow-sm transition-all rounded-2xl cursor-default"
          >
            {item.title}
          </Badge>
        ))}
      </div>

      <Pager
        prevHref="/projects"
        nextHref="/experience"
        prevTitle="Projects"
        nextTitle="Experience"
      />
    </>
  );
};
export default SkillsToolsPage;
