import { VaultItemType } from '../Vault-Page/vaultData';

// Community Item Model
export interface CommunityItem {
  id: string;
  type: VaultItemType;
  title: string;
  description: string;
  category: string;
  content: string;
  url?: string;
  tool?: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    isVerified?: boolean;
  };
  metrics: {
    likes: number;
    views: number;
  };
  publishedAt: string;
  isSelf?: boolean;
}

export type CommunityTab = 'all' | 'prompt' | 'skill' | 'website' | 'my-shares';

export const COMMUNITY_TABS: { id: CommunityTab; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'prompt', label: 'Prompts' },
  { id: 'skill', label: 'Skill Rules' },
  { id: 'website', label: 'Workflows & Links' },
  { id: 'my-shares', label: 'My Published 🌟' },
];

// Page size for paginated fetching
export const BATCH_SIZE = 6;

// Mock Master Dataset (Production templates for pagination and filtering)
export const MASTER_COMMUNITY_ITEMS: CommunityItem[] = [
  {
    id: 'comm-1',
    type: 'prompt',
    title: 'DeepSeek R1 + Claude 3.7 Hybrid Chain-of-Thought',
    description:
      'A structured reasoning protocol that instructs the LLM to write hidden self-correcting logic before outputting concise production code.',
    category: 'Agent Skills',
    tool: 'Claude',
    content: `You are an elite reasoning engine and principal software architect.
Before producing any code or technical solution:
1. <thought_process>: Write out your hidden step-by-step hypothesis, edge cases, and failure modes.
2. Critique your own initial solution for race conditions, re-renders, and memory overhead.
3. Validate against standard engineering invariants.
4. Output the final, pristine implementation with minimal explanation and zero hallucinated dependencies.`,
    author: {
      name: 'Harsh Rathod',
      handle: '@harshrathod',
      avatar: '/avatars/avatar-1.svg',
      isVerified: true,
    },
    metrics: { likes: 642, views: 4210 },
    publishedAt: '2h ago',
  },
  {
    id: 'comm-2',
    type: 'skill',
    title: 'Next.js 15 & React 19 Strict .cursorrules',
    description:
      'Production-tested cursorrules enforcing Server Components, Server Actions validation, and zero client-side bundle leakage.',
    category: 'Frontend',
    tool: 'Cursor',
    content: `# Next.js 15 & React 19 Architectural Rules
- ALWAYS default to React Server Components (RSC).
- Use 'use client' strictly at leaf nodes handling user events or browser APIs.
- Validate all Server Action payloads with Zod or Valibot before invoking database layers.
- Prefer Tailwind CSS v4 design tokens and CSS variables over inline arbitrary styles.
- Enforce strict TypeScript: NO 'any', always define return types for asynchronous functions.
- Optimize images using Next/Image with explicit aspect ratios and AVIF priority loading.`,
    author: {
      name: 'Elena Rostova',
      handle: '@elena_ux',
      avatar: '/avatars/avatar-2.svg',
      isVerified: true,
    },
    metrics: { likes: 890, views: 6540 },
    publishedAt: '5h ago',
  },
  {
    id: 'comm-3',
    type: 'skill',
    title: 'Google Antigravity Autonomous Refactoring Skill',
    description:
      'Autonomous agent protocol for discovering, safely refactoring, and verifying legacy code modules without introducing regression bugs.',
    category: 'Agent Skills',
    tool: 'Antigravity',
    content: `---
name: autonomous-refactor
description: Comprehensive refactoring workflow ensuring zero regressions and high cohesion
---

# Instructions
1. Discover existing callers and AST signatures using rip-grep.
2. Build unit tests capturing baseline behavior before touching target files.
3. Apply modular separation of concerns without changing external API interfaces.
4. Run project build and automated test suites to verify integrity.
5. Generate a walkthrough markdown summary highlighting performance and clarity gains.`,
    author: {
      name: 'Kenji Sato',
      handle: '@kenji_code',
      avatar: '/avatars/avatar-3.svg',
      isVerified: true,
    },
    metrics: { likes: 415, views: 2980 },
    publishedAt: '1d ago',
  },
  {
    id: 'comm-4',
    type: 'prompt',
    title: 'Senior Systems Architect PRD-to-RFC Generator',
    description:
      'Transforms vague product requirements into rigorous Technical RFC specifications complete with data schemas and trade-off matrices.',
    category: 'System Prompts',
    tool: 'Claude',
    content: `Given a product requirements document or feature brief, produce an RFC with:
- Context & Executive Summary: Problem statement and business motivation.
- System Architecture Diagram (Mermaid syntax) showing data flow and network boundaries.
- Database Schema (PostgreSQL DDL or Prisma syntax) with indexed foreign keys.
- API Endpoints & Request/Response JSON contracts with HTTP status codes.
- Alternatives Considered & Technical Trade-offs (Latency vs Consistency vs Cost).
- Rollout & Disaster Recovery Plan (Feature flags and backward compatibility).`,
    author: {
      name: 'Sarah Jenkins',
      handle: '@sarah_fullstack',
      avatar: '/avatars/avatar-4.svg',
      isVerified: false,
    },
    metrics: { likes: 320, views: 2150 },
    publishedAt: '2d ago',
  },
  {
    id: 'comm-5',
    type: 'website',
    title: 'Cursor Directory — Curated .cursorrules for 50+ Frameworks',
    description:
      'An open-source directory of community-tested system prompt rules for Rust, Python, Svelte, Flutter, and Tailwind.',
    category: 'AI Docs',
    tool: 'Cursor',
    url: 'https://cursorrules.org',
    content:
      'Comprehensive open-source repository of verified .cursorrules. Easily find and copy tailored IDE instructions for specific tech stacks.',
    author: {
      name: 'Marcus Vance',
      handle: '@marcus_agent',
      avatar: '/avatars/avatar-5.svg',
      isVerified: true,
    },
    metrics: { likes: 510, views: 3450 },
    publishedAt: '3d ago',
  },
  {
    id: 'comm-6',
    type: 'skill',
    title: 'Python FastAPI & Async SQLAlchemy 2.0 Template',
    description:
      'Windsurf & Claude system rule set for writing async Python APIs with strict Pydantic v2 schemas and connection pooling.',
    category: 'Backend',
    tool: 'Windsurf',
    content: `# FastAPI & Async SQLAlchemy 2.0 Guidelines
- Use async/await throughout all route handlers and database repositories.
- Use Annotated dependencies with Depends() for cleaner dependency injection.
- Structure schemas with Pydantic v2 (ConfigDict, model_validator).
- Prevent N+1 queries by using selectinload() or joinedload() on ORM relationships.
- Use Alembic migrations exclusively for schema changes. Never run sync DDL in runtime.`,
    author: {
      name: 'Alex Chen',
      handle: '@chen_dev',
      avatar: '/avatars/avatar-1.svg',
      isVerified: false,
    },
    metrics: { likes: 478, views: 3820 },
    publishedAt: '4d ago',
  },
  {
    id: 'comm-7',
    type: 'prompt',
    title: 'Editorial Neo-Brutalist CSS & Design Token Stylist',
    description:
      'Prompts the LLM to design high-fashion editorial interfaces using 2px borders, warm cream backdrops, and spring physics.',
    category: 'Design',
    tool: 'Claude',
    content: `You are an elite design technologist specializing in Editorial Neo-Brutalism.
Design Guidelines:
- High contrast 2px solid outlines (border-vault-dark #002D0F).
- Primary colors: Warm Vault Cream (#F8F9E9), Vault Yellow (#F1F78C), Vault Green (#1ECC62).
- Typography: Instrument Serif for grand editorial headers; Manrope for clean UI and metadata.
- Motion: Cubic-bezier spring transitions (cubic-bezier(0.16, 1, 0.3, 1)).
- Avoid generic corporate styles, plain shadows, and boring flat buttons. Everything must feel crafted and intentional.`,
    author: {
      name: 'Maya Patel',
      handle: '@maya_design',
      avatar: '/avatars/avatar-2.svg',
      isVerified: true,
    },
    metrics: { likes: 580, views: 4100 },
    publishedAt: '5d ago',
  },
  {
    id: 'comm-8',
    type: 'prompt',
    title: 'Docker Scratch Multi-Stage Build Optimizer for Go & Rust',
    description:
      'Generates minimal, secure <15MB production container definitions with non-root security contexts and multi-stage caching.',
    category: 'DevOps',
    tool: 'General IDE',
    content: `# Multi-Stage Dockerfile Blueprint
# Stage 1: Build & test with dependencies
FROM golang:1.23-alpine AS builder
WORKDIR /app
RUN apk --no-cache add ca-certificates git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/server .

# Stage 2: Pristine zero-vulnerability runtime container
FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/server /server
USER 10001:10001
EXPOSE 8080
ENTRYPOINT ["/server"]`,
    author: {
      name: 'David Kim',
      handle: '@david_ops',
      avatar: '/avatars/avatar-3.svg',
      isVerified: false,
    },
    metrics: { likes: 215, views: 1670 },
    publishedAt: '1w ago',
  },
  {
    id: 'comm-9',
    type: 'skill',
    title: 'Windsurf Cascade Agent Testing & Linting Protocol',
    description:
      'Enforces test-driven development and strict ESLint boundary checking before any task completion in Windsurf.',
    category: 'DevOps',
    tool: 'Windsurf',
    content: `# Cascade TDD and Linting Protocol
1. Prior to editing files, run existing test suites to establish green baseline.
2. For each new utility, write a failing unit test asserting expected edge cases.
3. Write the minimal code satisfying the test assertion.
4. Execute linter checks; zero lint warnings permitted.`,
    author: {
      name: 'Tanya Morales',
      handle: '@tanya_qa',
      avatar: '/avatars/avatar-4.svg',
      isVerified: true,
    },
    metrics: { likes: 360, views: 2430 },
    publishedAt: '1w ago',
  },
  {
    id: 'comm-10',
    type: 'prompt',
    title: 'SQL Database Indexing & Query Plan Explainer',
    description:
      'Analyzes slow Postgres and MySQL queries, breaks down EXPLAIN ANALYZE output, and recommends compound indexes.',
    category: 'Backend',
    tool: 'Claude',
    content: `You are an expert DBA. Given a slow SQL query and schema:
1. Parse table scans, nested loops, and memory sorts.
2. Suggest optimal B-Tree or GIN indexes with column ordering rationale.
3. Rewrite joins to eliminate Cartesian products.`,
    author: {
      name: 'Leo Zhang',
      handle: '@leo_data',
      avatar: '/avatars/avatar-5.svg',
      isVerified: true,
    },
    metrics: { likes: 490, views: 3120 },
    publishedAt: '2w ago',
  },
  {
    id: 'comm-11',
    type: 'website',
    title: 'Awesome Agentic Skills Repository (GitHub)',
    description:
      'Curated community catalog of high-impact skill.md files, MCP plugins, and prompt templates for autonomous AI assistants.',
    category: 'Agent Skills',
    tool: 'Antigravity',
    url: 'https://github.com/agentic-skills',
    content:
      'A collection of production-grade skill.md configurations for Antigravity, Cursor, and Claude Code.',
    author: {
      name: 'Harsh Rathod',
      handle: '@harshrathod',
      avatar: '/avatars/avatar-1.svg',
      isVerified: true,
    },
    metrics: { likes: 720, views: 5100 },
    publishedAt: '2w ago',
  },
  {
    id: 'comm-12',
    type: 'prompt',
    title: 'Tailwind CSS v4 Container Queries & Grid Master',
    description:
      'Guides LLMs to build responsive, component-driven layouts using @container queries and zero fixed media query breakpoints.',
    category: 'Frontend',
    tool: 'Cursor',
    content: `Use modern container queries:
- Add @container on parent containers.
- Use @sm:, @md:, @lg: on children to adapt fluidly to local width.
- Eliminate horizontal overflow using min-w-0 and shrink-0.`,
    author: {
      name: 'Elena Rostova',
      handle: '@elena_ux',
      avatar: '/avatars/avatar-2.svg',
      isVerified: true,
    },
    metrics: { likes: 530, views: 3740 },
    publishedAt: '3w ago',
  },
];
