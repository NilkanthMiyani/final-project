import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import Link from 'next/link';

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

      <div className="mt-12 mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Certifications</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          <Link href="https://www.credly.com/badges/5301a4c2-3f10-4548-b093-a1f6ad23e5a0" target="_blank" className="group flex flex-col p-6 border border-border/40 bg-card/40 hover:bg-accent hover:border-accent transition-all duration-300 rounded-[2rem] shadow-sm">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-accent-foreground">
              AWS Certified Solutions Architect
            </h3>
            <p className="text-sm text-muted-foreground mt-3 group-hover:text-accent-foreground/80">Amazon Web Services (AWS)</p>
          </Link>

          <Link href="https://codeunnati.edunetfoundation.com/verify-certificate/CU25_17996" target="_blank" className="group flex flex-col p-6 border border-border/40 bg-card/40 hover:bg-accent hover:border-accent transition-all duration-300 rounded-[2rem] shadow-sm">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-accent-foreground">
              Emerging Technologies
            </h3>
            <p className="text-sm text-muted-foreground mt-3 group-hover:text-accent-foreground/80">Code Unnati Program by SAP</p>
          </Link>

          <Link href="https://www.edureka.co/certificates/mycertificate/cc661dfb0edf6b6f311ea732762ab719" target="_blank" className="group flex flex-col p-6 border border-border/40 bg-card/40 hover:bg-accent hover:border-accent transition-all duration-300 rounded-[2rem] shadow-sm">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-accent-foreground">
              DevOps Certification
            </h3>
            <p className="text-sm text-muted-foreground mt-3 group-hover:text-accent-foreground/80">Edureka</p>
          </Link>

        </div>
      </div>

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
