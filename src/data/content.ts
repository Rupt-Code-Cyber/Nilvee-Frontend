export interface GraphNode {
  label: string;
  depth: number;
  live?: boolean;
}

export const systemGraph: GraphNode[] = [
{ label: 'APPLICATIONS', depth: 0, live: true },
{ label: 'SERVICES', depth: 1, live: true },
{ label: 'PLATFORM', depth: 2 },
{ label: 'INFRASTRUCTURE', depth: 3 },
{ label: 'INTELLIGENCE', depth: 5 }];


export const graphBranches = ['CLOUD', 'DATA', 'SECURITY'];

export const heroSignals = [
'SYSTEMS ENGINEERED FOR SCALE',
'SECURITY BY DESIGN',
'AUTOMATION FIRST',
'BUILT FOR PRODUCTION'];


export interface Capability {
  index: string;
  title: string;
  summary: string;
  points: string[];
}

export const capabilities: Capability[] = [
{
  index: '01',
  title: 'Cloud infrastructure',
  summary:
  'Networks, clusters, and environments defined in code — reproducible from an empty account to a running production estate.',
  points: ['Terraform & IaC baselines', 'Kubernetes platforms', 'Multi-environment topology']
},
{
  index: '02',
  title: 'Developer platforms',
  summary:
  'Pipelines, golden paths, and internal tooling that shrink the distance between a merged commit and a live release.',
  points: ['CI/CD delivery', 'Release automation', 'Observability by default']
},
{
  index: '03',
  title: 'Secure software',
  summary:
  'Product engineering with threat modelling, identity, and auditability treated as build-time requirements.',
  points: ['APIs & services', 'Identity & access', 'Hardened build chain']
},
{
  index: '04',
  title: 'Intelligent automation',
  summary:
  'Data pipelines and applied models that remove repetitive operational work instead of adding another dashboard.',
  points: ['Event pipelines', 'Applied ML & LLM systems', 'Human-in-the-loop controls']
}];


export interface EngineeringStep {
  step: string;
  title: string;
  body: string;
  duration: string;
}

export const engineeringSteps: EngineeringStep[] = [
{
  step: 'MAP',
  title: 'System mapping',
  body: 'We audit what exists — services, data flows, delivery bottlenecks, and the risks nobody has written down yet.',
  duration: '1–2 weeks'
},
{
  step: 'DESIGN',
  title: 'Architecture & plan',
  body: 'A target architecture with explicit trade-offs, sequenced into increments that ship value before the programme ends.',
  duration: '2–3 weeks'
},
{
  step: 'BUILD',
  title: 'Engineering delivery',
  body: 'The engineers who design the system are the engineers who build it, deploy it, document it, and hand it over',
  duration: '6–16 weeks'
},
{
  step: 'RUN',
  title: 'Operate & hand over',
  body: 'Runbooks, on-call readiness, and documentation so your team owns the system with confidence when we step back.',
  duration: 'Ongoing'
}];


export const securityControls = [
{
  label: 'IDENTITY',
  title: 'Least privilege, enforced',
  body: 'SSO, short-lived credentials, and scoped roles across every environment and pipeline.'
},
{
  label: 'SUPPLY CHAIN',
  title: 'Provenance on every build',
  body: 'Signed artefacts, dependency scanning, and reproducible builds wired into CI.'
},
{
  label: 'DATA',
  title: 'Encrypted and classified',
  body: 'Encryption in transit and at rest, tenancy isolation, and retention rules that match your obligations.'
},
{
  label: 'RESPONSE',
  title: 'Detect, then recover',
  body: 'Audit trails, alert routing, and rehearsed recovery paths with measured restore times.'
}];


export const intelligenceOutcomes = [
{ metric: '71%', label: 'Manual ops work removed', note: 'Median across automation engagements' },
{ metric: '9×', label: 'Faster release cadence', note: 'After delivery platform rollout' },
{ metric: '99.98%', label: 'Platform availability', note: 'Trailing twelve months' },
{ metric: '< 15m', label: 'Mean time to recovery', note: 'With rehearsed runbooks' }];


export const companyFacts = [
{ label: 'FOUNDED', value: '2022' },
{ label: 'ENGINEERS', value: '20+' },
{ label: 'REGIONS', value: 'EU · UK · US · CANADA' },
{ label: 'ENGAGEMENTS', value: '100+' }];


export const fallbackServices = [
{ name: 'Cloud infrastructure' },
{ name: 'Developer platform & CI/CD' },
{ name: 'Secure software engineering' },
{ name: 'Data & intelligent automation' },
{ name: 'Security review & hardening' },
{ name: 'Something else' }];


export const budgetBands = [
'Under $25k',
'$25k – $75k',
'$75k – $200k',
'$200k+',
'Not sure yet'];