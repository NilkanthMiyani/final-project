import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { ExternalLinkIcon } from 'lucide-react';
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

      <div className="mt-10 mb-8">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Certifications</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          <Link href="https://www.credly.com/badges/5301a4c2-3f10-4548-b093-a1f6ad23e5a0" target="_blank" className="group p-5 border rounded-lg border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors">
            <h3 className="font-medium flex items-center gap-2">
              AWS Certified Solutions Architect
              <ExternalLinkIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2">Amazon Web Services (AWS)</p>
          </Link>

          <Link href="https://codeunnati.edunetfoundation.com/verify-certificate/CU25_17996" target="_blank" className="group p-5 border rounded-lg border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors">
            <h3 className="font-medium flex items-center gap-2">
              Emerging Technologies
              <ExternalLinkIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2">Code Unnati Program by SAP</p>
          </Link>

          <Link href="https://www.edureka.co/certificates/mycertificate/cc661dfb0edf6b6f311ea732762ab719" target="_blank" className="group p-5 border rounded-lg border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors">
            <h3 className="font-medium flex items-center gap-2">
              DevOps Certification
              <ExternalLinkIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2">Edureka</p>
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
