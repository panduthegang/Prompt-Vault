export interface PromptItem {
  id: string;
  indexNumber: string;
  title: string;
  category: 'Coding & IDE Rules' | 'Claude 3.7 & Reasoning' | 'System Prompts' | 'Writing & Marketing' | 'Agent Skills';
  model: string;
  modelBadgeStyle: string;
  description: string;
  promptSnippet: string;
  variables: string[];
  tokens: string;
  rating: string;
  author: string;
  authorAvatar: string;
}

// 6 Full Readable Production Prompts (Designed to WOW visitors)
export const VISIBLE_PROMPTS: PromptItem[] = [
  {
    id: 'p-01',
    indexNumber: '01',
    title: 'Autonomous Full-Stack Architect Rule',
    category: 'Coding & IDE Rules',
    model: 'Claude 3.7 Sonnet',
    modelBadgeStyle: 'bg-vault-green text-vault-dark border-vault-dark',
    description: 'Enforces strict modular clean architecture, zero dead code, and resilient TypeScript error boundaries in modern web frameworks.',
    promptSnippet: `You are a Principal Software Architect. When generating or refactoring code in {{framework}}, adhere to these strict rules:
1. Never hallucinate non-existent imports or deprecated package methods.
2. Structure all components with clean props interfaces, explicit return types, and isolated sub-handlers.
3. Apply zero-runtime-cost patterns, sanitize user inputs, and guard async states with robust try/catch boundaries.
4. Target framework: {{framework}} | Runtime: {{runtime_environment}}.`,
    variables: ['{{framework}}', '{{runtime_environment}}'],
    tokens: '~340 tokens',
    rating: '4.98',
    author: 'Alex Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'p-02',
    indexNumber: '02',
    title: 'Deep Research & Chain-of-Verification Protocol',
    category: 'Claude 3.7 & Reasoning',
    model: 'DeepSeek R1 / Claude 3.7',
    modelBadgeStyle: 'bg-vault-yellow text-vault-dark border-vault-dark',
    description: 'Forces multi-pass chain-of-thought analysis with built-in falsification checks before answering technical questions.',
    promptSnippet: `Perform a rigorous chain-of-verification analysis on: {{research_topic}}.
Step 1: Formulate 4 fundamental hypotheses based on foundational principles.
Step 2: Actively search for falsification evidence for each hypothesis.
Step 3: Score empirical confidence (0-100%) and synthesize a high-signal conclusion.
Constraint: Flag any assumptions explicitly under {{key_assumptions}}.`,
    variables: ['{{research_topic}}', '{{key_assumptions}}'],
    tokens: '~410 tokens',
    rating: '4.95',
    author: 'Dr. Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'p-03',
    indexNumber: '03',
    title: 'Strict API Contract & Error Shield Generator',
    category: 'System Prompts',
    model: 'GPT-4o',
    modelBadgeStyle: 'bg-[#E0E7FF] text-[#1E1B4B] border-[#1E1B4B]',
    description: 'Generates hardened REST / GraphQL endpoint schemas with comprehensive input validation, status codes, and idempotency guarantees.',
    promptSnippet: `Design an enterprise-grade API endpoint specification for {{endpoint_name}}.
Include:
- Complete JSON Schema request and response payloads.
- HTTP status codes (200, 400, 401, 422, 500) with RFC-7807 problem details.
- Distributed idempotency key headers and rate-limit headers.
- Service tier: {{service_tier}}.`,
    variables: ['{{endpoint_name}}', '{{service_tier}}'],
    tokens: '~290 tokens',
    rating: '4.92',
    author: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'p-04',
    indexNumber: '04',
    title: 'High-Converting Editorial Landing Copywriter',
    category: 'Writing & Marketing',
    model: 'Claude 3.7 Sonnet',
    modelBadgeStyle: 'bg-vault-green text-vault-dark border-vault-dark',
    description: 'Produces magnetic, punchy Neo-Brutalist and luxury SaaS hero copy with compelling value metrics and zero corporate fluff.',
    promptSnippet: `Draft high-conversion landing page copy for {{product_name}}, a tool built for {{target_audience}}.
Voice: Editorial luxury, Neo-brutalist confidence, concise, zero generic buzzwords.
Provide:
1. 3 Hero headline variations (2-3 lines max, uppercase punch).
2. 1 Compelling 2-sentence value proposition.
3. 2 High-conversion CTA button labels matching {{conversion_goal}}.`,
    variables: ['{{product_name}}', '{{target_audience}}', '{{conversion_goal}}'],
    tokens: '~320 tokens',
    rating: '4.97',
    author: 'Sora Tanaka',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'p-05',
    indexNumber: '05',
    title: 'Zero-Shot TypeScript Refactor & Profiler',
    category: 'Coding & IDE Rules',
    model: 'Cursor / Claude',
    modelBadgeStyle: 'bg-[#FEF3C7] text-[#78350F] border-[#78350F]',
    description: 'Identifies memory leaks, unnecessary React re-renders, and bloated loops, rewriting components for maximum V8 engine performance.',
    promptSnippet: `Analyze the provided component: {{component_snippet}}.
1. Identify all redundant state re-renders and unmemoized object dependencies.
2. Eliminate any O(n^2) data transformations by pre-indexing lookups into Map/Set primitives.
3. Provide the optimized drop-in replacement with JSDoc benchmark notes.`,
    variables: ['{{component_snippet}}'],
    tokens: '~380 tokens',
    rating: '4.94',
    author: 'Liam Miller',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'p-06',
    indexNumber: '06',
    title: 'Adaptive Agent SKILL.md Generator Protocol',
    category: 'Agent Skills',
    model: 'Antigravity / Cursor',
    modelBadgeStyle: 'bg-vault-yellow text-vault-dark border-vault-dark',
    description: 'Transforms messy human workflows into standard, parseable YAML frontmatter SKILL.md packages ready for agentic execution.',
    promptSnippet: `Generate a compliant SKILL.md manifest for the workflow: {{agent_workflow_name}}.
Frontmatter:
---
name: {{agent_workflow_name}}
description: {{workflow_description}}
---
Rules:
1. Provide step-by-step instructions with deterministic preconditions and postconditions.
2. Include error recovery strategies for edge cases.`,
    variables: ['{{agent_workflow_name}}', '{{workflow_description}}'],
    tokens: '~450 tokens',
    rating: '5.0',
    author: 'Devin Thorne',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
  },
];

// Blurred Teaser Prompts (Exact same structure & UI as visible cards to maintain 100% consistency)
export const BLURRED_PROMPTS: PromptItem[] = [
  {
    id: 'p-07',
    indexNumber: '07',
    title: 'Senior Cloud Infrastructure Terraform Architect',
    category: 'System Prompts',
    model: 'GPT-4o / Claude',
    modelBadgeStyle: 'bg-[#E0E7FF] text-[#1E1B4B] border-[#1E1B4B]',
    description: 'Generates zero-trust multi-region AWS/GCP Terraform modules with automated state locking and IAM least privilege.',
    promptSnippet: `You are a Principal Cloud DevOps Engineer. Formulate production-ready Terraform modules for {{cloud_provider}} infrastructure.
1. Enforce strict remote state locking with DynamoDB / GCS.
2. Implement least-privilege IAM roles and isolate VPC subnets.
3. Target region: {{region}} | Environment: {{environment}}.`,
    variables: ['{{cloud_provider}}', '{{region}}', '{{environment}}'],
    tokens: '~420 tokens',
    rating: '4.96',
    author: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'p-08',
    indexNumber: '08',
    title: 'Multi-Agent Reflection & Self-Correction Loop',
    category: 'Agent Skills',
    model: 'Claude 3.7 Sonnet',
    modelBadgeStyle: 'bg-vault-green text-vault-dark border-vault-dark',
    description: 'Orchestrates a primary worker agent and a peer critic agent to iterate until code passes all edge case tests.',
    promptSnippet: `Execute a recursive dual-agent reflection protocol for: {{task_goal}}.
Agent A (Builder): Draft candidate implementation for {{target_module}}.
Agent B (Critic): Identify failure modes, time complexities, and race conditions.
Iterate until Agent B signs off with 100% confidence.`,
    variables: ['{{task_goal}}', '{{target_module}}'],
    tokens: '~390 tokens',
    rating: '4.99',
    author: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'p-09',
    indexNumber: '09',
    title: 'Production Database Migration Sentinel',
    category: 'Coding & IDE Rules',
    model: 'DeepSeek R1',
    modelBadgeStyle: 'bg-vault-yellow text-vault-dark border-vault-dark',
    description: 'Writes zero-downtime PostgreSQL table migrations, backward-compatible dual-write triggers, and rollbacks.',
    promptSnippet: `Generate an atomic, zero-downtime database migration strategy for {{table_name}}.
1. Create additive non-blocking column definitions.
2. Add background index creation (CREATE INDEX CONCURRENTLY).
3. Draft reversible rollback scripts and data validation checkpoints.`,
    variables: ['{{table_name}}'],
    tokens: '~310 tokens',
    rating: '4.91',
    author: 'Alex Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
];
