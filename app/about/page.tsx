import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';

const AboutMePage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>About Nilkanth</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          Building scalable infrastructure and automating deployment workflows.
        </PageHeaderHeading>
        <PageHeaderDescription>
          I'm a DevOps and Cloud Engineer passionate about building scalable infrastructure and automating deployment workflows. Currently pursuing my B.E. in Information Technology at Gujarat Technological University.
        </PageHeaderDescription>

        <PageHeaderDescription>
          I specialize in designing and implementing CI/CD pipelines, container orchestration with Kubernetes, infrastructure as code with Terraform, and cloud architecture on AWS and Azure. I believe in the philosophy of automating everything that can be automated.
        </PageHeaderDescription>

        <PageHeaderDescription>
          I'm always open to discussing new opportunities, DevOps challenges, or interesting projects. Let's build something amazing!
        </PageHeaderDescription>
      </PageHeader>

      <Pager
        prevHref="/"
        nextHref="/projects"
        prevTitle="Introduction"
        nextTitle="Projects"
      />
    </>
  );
};
export default AboutMePage;
