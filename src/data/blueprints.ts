export interface Blueprint {
  name: string;
  description: string;
  href: string;
}

export const blueprints: Blueprint[] = [
  {
    name: 'DeployFlow',
    description: 'Production delivery, GitOps & observability',
    href: 'https://github.com/Rupt-Code-Cyber/DeployFlow',
  },
  {
    name: 'CloudForge',
    description: 'Multi-cloud infrastructure & Terraform',
    href: 'https://github.com/Rupt-Code-Cyber/CloudForge',
  },
  {
    name: 'Enterprise Cloud Security',
    description: 'AWS security architecture & controls',
    href: 'https://github.com/Rupt-Code-Cyber/Enterprise-Cloud-Security',
  },
  {
    name: 'SecureCI',
    description: 'DevSecOps & CI/CD security automation',
    href: 'https://github.com/Rupt-Code-Cyber/Secureci',
  },
  {
    name: 'AI Customer Warranty Processor',
    description: 'AI, RAG & intelligent document automation',
    href: 'https://github.com/Rupt-Code-Cyber/AI_Customer_Warranty_processor',
  },
];