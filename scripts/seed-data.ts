/**
 * Canonical seed content, transcribed from `public/resumenilkanth.pdf` plus the
 * projects that were previously hard-coded in `constants/projects.ts`.
 *
 * This runs once. After seeding, the database is the source of truth and this
 * file is only a fallback/reset record.
 */

export const profileSeed = {
  key: 'primary',
  name: 'Nilkanth Miyani',
  role: 'DevOps Engineer',
  headline: 'I cut client hosting spend by 60%.',
  subheadline:
    'Multi-cloud infrastructure, GitOps delivery, and the pipelines underneath.',
  bio: [
    'DevOps engineer with multi-cloud experience across AWS, GCP, Azure, and Hetzner, and hands-on ownership of CI/CD pipelines, Kubernetes and Docker workloads, GitOps delivery, and infrastructure cost optimization.',
    'I run polyglot production data stores and observability tooling alongside application delivery — the kind of work where the win is measured in money saved and minutes shaved off a deploy, not in tools adopted.',
    'AWS Certified Solutions Architect – Associate. Always open to talking through infrastructure problems, cost blowups, or a pipeline that has stopped being fun to maintain.',
  ],
  location: 'Surat, Gujarat, India',
  email: 'miyaninilkanth2@gmail.com',
  phone: '+91 72018 37017',
  availability: 'Open to DevOps and Platform Engineering roles',
  socials: {
    github: 'https://github.com/NilkanthMiyani',
    linkedin: 'https://www.linkedin.com/in/nilkanthmiyani/',
    twitter: 'https://x.com/nilkanthmiyani',
    telegram: 'https://t.me/nilkanthmiyani',
  },
  resumeUrl: '/resumenilkanth.pdf',
  seoDescription:
    'Nilkanth Miyani — DevOps Engineer working across AWS, GCP, Azure and Hetzner on Kubernetes, GitOps delivery, CI/CD and infrastructure cost optimization.',
  seoKeywords: [
    'Nilkanth Miyani',
    'DevOps Engineer',
    'Cloud Engineer',
    'Kubernetes',
    'Terraform',
    'Argo CD',
    'GitOps',
    'AWS',
    'Azure',
    'Google Cloud',
    'CI/CD',
    'Docker',
    'Portfolio',
  ],
};

export const experienceSeed = [
  {
    company: 'Appscrip',
    role: 'DevOps Engineer',
    employmentType: 'Full-time',
    location: 'Surat, Gujarat',
    startDate: 'Jun 2026',
    endDate: '',
    current: true,
    bullets: [
      'Migrated 7 client projects from Kubernetes to consolidated Docker Compose single-server deployments, right-sizing infrastructure to actual workload and cutting client hosting spend by roughly 60%.',
      'Provision and operate client infrastructure across AWS, GCP, Azure, Hetzner, and OVHcloud, matching platform choice to each client’s budget and workload profile.',
      'Built and maintained CI/CD pipelines in Bitbucket Pipelines and GitHub Actions, automating build, test, and deployment across 20+ repositories.',
      'Manage Kubernetes workloads with Argo CD, running GitOps-based deployments where Git is the single source of truth and rollbacks are a one-commit operation.',
      'Administer production data stores across PostgreSQL, MySQL, MongoDB, Cassandra, Neo4j, and ClickHouse — provisioning, backups, and performance tuning across client environments.',
      'Deployed and maintain SigNoz for distributed tracing and application observability, cutting time to diagnose production issues from hours to minutes.',
    ],
    order: 0,
    published: true,
  },
  {
    company: 'AppGambit',
    role: 'DevOps Engineer',
    employmentType: 'Internship',
    location: 'Surat, Gujarat',
    startDate: 'Jan 2026',
    endDate: 'Jun 2026',
    current: false,
    bullets: [
      'Designed and maintained CI/CD pipelines using Jenkins and AWS CodePipeline, automating build-through-deploy for 8 services and reducing release time from roughly 40 minutes to under 10.',
      'Implemented Terraform-based Infrastructure as Code for Kubernetes environments, making provisioning repeatable and eliminating manual configuration drift.',
      'Built event-driven serverless workflows on AWS Lambda, API Gateway, and SQS with automatic retry and dead-letter handling.',
      'Operated containerized workloads across EC2, ECS, and EKS, configuring auto-scaling so services absorbed variable traffic without manual intervention.',
    ],
    order: 1,
    published: true,
  },
  {
    company: 'Microsoft',
    role: 'Azure Cloud Infrastructure Intern',
    employmentType: 'Internship · Remote',
    location: 'Remote',
    startDate: 'Jan 2025',
    endDate: 'Jan 2025',
    current: false,
    bullets: [
      'Completed Microsoft’s Azure Cloud Infrastructure Internship Program, covering cloud architecture, resource deployment, and DevOps practices on Azure.',
    ],
    order: 2,
    published: true,
  },
];

export const educationSeed = [
  {
    institution: 'SSASIT — Gujarat Technological University',
    degree: 'B.E., Information Technology',
    field: 'Information Technology',
    location: 'Surat, Gujarat',
    startDate: '2022',
    endDate: 'Jun 2026',
    grade: 'CGPA 8.64',
    description:
      'Coursework and projects centred on cloud and DevOps practice — Azure, Jenkins, Docker, and Kubernetes — carried into real infrastructure and automation work alongside the degree.',
    order: 0,
    published: true,
  },
];

export const certificationSeed = [
  {
    name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    issuer: 'Amazon Web Services',
    description:
      'Architecture, networking, security, scalability, and cost-optimized design.',
    issuedDate: 'Apr 2026',
    credentialUrl:
      'https://www.credly.com/badges/5301a4c2-3f10-4548-b093-a1f6ad23e5a0',
    order: 0,
    published: true,
  },
  {
    name: 'DevOps Certification Training with Gen AI',
    issuer: 'Edureka',
    description:
      'CI/CD automation, Kubernetes, Terraform, Docker, monitoring, and AI-assisted workflows.',
    issuedDate: 'Dec 2025',
    credentialUrl:
      'https://www.edureka.co/certificates/mycertificate/cc661dfb0edf6b6f311ea732762ab719',
    order: 1,
    published: true,
  },
  {
    name: 'Emerging Technologies — Code Unnati Program',
    issuer: 'SAP, implemented by Edunet Foundation',
    description: 'CSR skilling initiative in emerging technologies.',
    issuedDate: 'Jan 2025',
    credentialUrl:
      'https://codeunnati.edunetfoundation.com/verify-certificate/CU25_17996',
    order: 2,
    published: true,
  },
];

const skillGroups: Record<string, string[]> = {
  'Cloud Platforms': [
    'AWS',
    'Google Cloud',
    'Microsoft Azure',
    'Hetzner Cloud',
    'OVHcloud',
  ],
  'Containers & Orchestration': [
    'Kubernetes',
    'Docker',
    'Docker Compose',
    'Helm',
  ],
  'CI/CD & GitOps': [
    'GitHub Actions',
    'Bitbucket Pipelines',
    'Argo CD',
    'Jenkins',
    'GitLab CI',
    'AWS CodePipeline',
  ],
  'Infrastructure as Code': ['Terraform', 'CloudFormation', 'Ansible'],
  Databases: [
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Cassandra',
    'Neo4j',
    'ClickHouse',
  ],
  Observability: ['Prometheus', 'Grafana', 'Loki', 'SigNoz', 'CloudWatch'],
  'Security & Scanning': [
    'Trivy',
    'SonarQube',
    'Checkov',
    'Gitleaks',
    'KICS',
    'Anchore Grype',
    'OWASP Dependency-Check',
  ],
  'Languages & Systems': ['Python', 'Bash', 'Linux', 'Git', 'Nginx'],
};

export const skillSeed = Object.entries(skillGroups).flatMap(
  ([category, names], groupIndex) =>
    names.map((name, itemIndex) => ({
      name,
      category,
      order: groupIndex * 100 + itemIndex,
      published: true,
    }))
);

export const projectSeed = [
  {
    title: 'Retail Store Microservices on EKS',
    slug: 'retail-store-microservices',
    tagline:
      'Microservices application deployed on AWS EKS using Terraform and Argo CD.',
    overview:
      'A polyglot microservices application deployed on AWS EKS, with Terraform provisioning the cluster and supporting infrastructure, Docker handling containerization, and Argo CD driving GitOps-based delivery so every environment change is a reviewable commit.',
    features: [
      'Terraform-provisioned EKS cluster and networking',
      'Containerized services with per-service build pipelines',
      'GitOps delivery through Argo CD',
      'Environment promotion by pull request',
    ],
    techStack: ['AWS EKS', 'Terraform', 'Argo CD', 'Docker', 'Java'],
    outcomes: [],
    links: {
      github: 'https://github.com/NilkanthMiyani/retail-store-sample-app',
      live: '',
    },
    featured: true,
    order: 0,
    published: true,
  },
  {
    title: 'Two-Tier AWS Architecture',
    slug: 'two-tier-aws',
    tagline:
      'Infrastructure as Code deploying a two-tier architecture on AWS with Terraform.',
    overview:
      'A complete two-tier architecture on AWS defined entirely in Terraform — VPC, public and private subnets, security groups, and auto-scaling — so the environment can be torn down and rebuilt identically on demand.',
    features: [
      'VPC and multi-AZ subnet layout',
      'Least-privilege security group rules',
      'Auto-scaling group for the application tier',
      'Fully reproducible from code',
    ],
    techStack: ['Terraform', 'AWS', 'VPC', 'HCL'],
    outcomes: [],
    links: {
      github: 'https://github.com/NilkanthMiyani/terraform-two-tier-aws',
      live: '',
    },
    featured: true,
    order: 1,
    published: true,
  },
  {
    title: 'Serverless Website Monitor',
    slug: 'serverless-website-monitor',
    tagline: 'A lightweight uptime monitoring stack built on AWS Lambda.',
    overview:
      'A serverless monitoring stack that runs scheduled health checks against a list of endpoints, tracks uptime over time, and raises alerts on failure — with no always-on infrastructure to pay for or patch.',
    features: [
      'Scheduled health checks on AWS Lambda',
      'Alerting on failed checks',
      'Uptime history tracking',
      'Zero idle infrastructure cost',
    ],
    techStack: ['Python', 'AWS Lambda', 'EventBridge', 'Serverless'],
    outcomes: [],
    links: {
      github: 'https://github.com/NilkanthMiyani/serverless-website-monitor',
      live: '',
    },
    featured: true,
    order: 2,
    published: true,
  },
  {
    title: 'DevOps End-to-End Portfolio',
    slug: 'devops-portfolio',
    tagline:
      'A full DevOps workflow: VM setup, load balancing, Docker, Kubernetes, and CI/CD.',
    overview:
      'An end-to-end walkthrough of a production-shaped delivery pipeline — provisioning virtual machines, configuring a load balancer, containerizing the application, orchestrating it on Kubernetes, and wiring the whole path behind CI/CD.',
    features: [
      'Virtual machine provisioning',
      'Load balancer configuration',
      'Docker containerization',
      'Kubernetes orchestration',
      'End-to-end CI/CD pipeline',
    ],
    techStack: ['Docker', 'Kubernetes', 'Jenkins', 'Nginx', 'Linux'],
    outcomes: [],
    links: {
      github: 'https://github.com/NilkanthMiyani/devops-portfolio',
      live: '',
    },
    featured: false,
    order: 3,
    published: true,
  },
  {
    title: 'Node.js Todo App CI/CD',
    slug: 'node-todo-cicd',
    tagline: 'A full GitLab CI/CD pipeline for a Node.js application.',
    overview:
      'A multi-stage GitLab CI/CD pipeline covering build, test, and deployment for a Node.js application, with separate stages per environment and Docker images published on every green pipeline.',
    features: [
      'Automated build and test stages',
      'Docker image publishing',
      'Multi-environment deployment',
      'Pipeline-gated releases',
    ],
    techStack: ['GitLab CI', 'Node.js', 'Docker', 'EJS'],
    outcomes: [],
    links: {
      github: 'https://github.com/NilkanthMiyani/node-todo-cicd',
      live: '',
    },
    featured: false,
    order: 4,
    published: true,
  },
  {
    title: 'VPC Peering with Terraform',
    slug: 'vpc-peering-terraform',
    tagline: 'Private network connectivity between isolated AWS VPCs.',
    overview:
      'Terraform configuration establishing VPC peering between isolated AWS environments, with the route tables and security group rules needed for private cross-VPC communication that never traverses the public internet.',
    features: [
      'Cross-VPC peering connection',
      'Route table propagation',
      'Private-only communication path',
      'Declarative and repeatable',
    ],
    techStack: ['Terraform', 'AWS VPC', 'HCL'],
    outcomes: [],
    links: {
      github: 'https://github.com/NilkanthMiyani/vpc-peering-terraform',
      live: '',
    },
    featured: false,
    order: 5,
    published: true,
  },
];
