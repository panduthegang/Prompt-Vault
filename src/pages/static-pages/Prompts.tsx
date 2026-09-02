import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Check,
  ChevronRight,
  Lock,
  ArrowUpRight,
  Zap,
  Star,
  Flame
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { copyToClipboard } from '../../utils/clipboard';

interface PromptItem {
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
const VISIBLE_PROMPTS: PromptItem[] = [
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
const BLURRED_PROMPTS: PromptItem[] = [
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

export default function Prompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-vault-cream flex flex-col selection:bg-vault-green selection:text-vault-dark overflow-x-hidden">
      {/* Smart Reveal Navbar */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* Sub-header Breadcrumbs / Status ticker */}
        <div className="w-full bg-vault-cream border-b-2 border-vault-dark py-2 sm:py-2.5 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs font-sans font-semibold">
            <div className="flex items-center gap-1.5 sm:gap-2 text-vault-dark/70">
              <Link to="/" className="hover:text-vault-dark transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-vault-dark/40" />
              <span className="text-vault-dark bg-vault-yellow px-2.5 py-0.5 rounded-full border border-vault-dark font-bold text-[11px] sm:text-xs">
                Prompts
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-sans font-bold text-vault-dark/80">
              <span className="w-2 h-2 rounded-full bg-vault-green animate-pulse shrink-0" />
              <span>2,400+ Verified AI Prompts</span>
            </div>
          </div>
        </div>

        {/* Compact, Focused Hero Section */}
        <section className="w-full bg-vault-yellow border-b-2 border-vault-dark px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 lg:py-10 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <h1 className="font-serif text-[32px] xs:text-4xl sm:text-5xl md:text-[56px] leading-[0.94] tracking-tight text-vault-dark font-normal uppercase">
              <span className="block">PROMPTS FOR</span>
              <span className="block italic text-vault-darker">BREAKTHROUGH WORKFLOWS</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm md:text-[15px] text-vault-dark/80 max-w-xl mx-auto leading-relaxed">
              Battle-tested system instructions, IDE rules, and reasoning chains curated for engineering excellence.
            </p>
          </div>
        </section>

        {/* Section 1: Visible Prompt Cards (Cream Background, 2px Outlines, Editorial Neo-Brutalist Layout) */}
        <section className="w-full bg-vault-cream px-4 sm:px-6 md:px-10 lg:px-14 pt-8 sm:pt-10 pb-3 sm:pb-4">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            {/* Cards Header Info Row (Responsive: cleanly wrapped on mobile, single line on desktop) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-4 sm:pb-5 border-b-2 border-vault-dark">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="font-serif italic text-2xl sm:text-3xl text-vault-dark font-normal">
                  Featured Prompts
                </span>
                <span className="bg-vault-yellow px-2.5 py-0.5 rounded-full border border-vault-dark text-[11px] sm:text-xs font-sans font-bold text-vault-dark shrink-0">
                  {VISIBLE_PROMPTS.length} Cards
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-sans font-semibold text-vault-dark/75">
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-vault-green fill-vault-green shrink-0" />
                  1-Click Copy
                </span>
                <span className="text-vault-dark/30">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-vault-dark fill-vault-yellow shrink-0" />
                  Production Tested
                </span>
              </div>
            </div>

            {/* Cards Grid (3 Columns on desktop, 1 on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
              {VISIBLE_PROMPTS.map((prompt) => {
                const isCopied = copiedId === prompt.id;
                return (
                  <article
                    key={prompt.id}
                    className="bg-vault-cream border-2 border-vault-dark rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4 sm:space-y-5 hover:bg-vault-yellow/10 transition-colors shadow-sm group relative overflow-hidden"
                  >
                    {/* Top Row: Large Editorial Index Number & Model Badge */}
                    <div className="space-y-3 sm:space-y-3.5">
                      <div className="flex items-center justify-between gap-2 border-b border-vault-dark/15 pb-2.5 sm:pb-3">
                        <span className="font-serif italic text-3xl sm:text-4xl text-vault-green font-normal leading-none select-none">
                          {prompt.indexNumber}
                        </span>

                        <span
                          className={`text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border-2 ${prompt.modelBadgeStyle}`}
                        >
                          {prompt.model}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1 sm:space-y-1.5">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-vault-dark/60 block">
                          {prompt.category}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-vault-dark font-normal leading-tight tracking-tight">
                          {prompt.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-[13px] text-vault-dark/80 leading-relaxed">
                          {prompt.description}
                        </p>
                      </div>

                      {/* Code Box with Dedicated Terminal Header Bar & Non-Overlapping Copy Action */}
                      <div className="bg-vault-dark text-vault-cream rounded-2xl border-2 border-vault-dark overflow-hidden flex flex-col shadow-inner">
                        {/* Terminal Header Toolbar */}
                        <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 bg-vault-darker/90 border-b border-vault-cream/15 select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
                            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
                            <span className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
                            <span className="text-[10px] font-mono text-vault-cream/60 font-semibold tracking-wider uppercase ml-1">
                              prompt.md
                            </span>
                          </div>

                          {/* Integrated Copy Button in Header Bar (No text obstruction!) */}
                          <button
                            type="button"
                            onClick={() => handleCopy(prompt.id, prompt.promptSnippet)}
                            className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                              isCopied
                                ? 'bg-vault-green text-vault-dark border-vault-dark shadow-xs scale-105'
                                : 'bg-vault-cream/15 text-vault-cream border-vault-cream/30 hover:bg-vault-cream hover:text-vault-dark hover:border-vault-dark active:scale-95'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 stroke-[2.2]" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Code Text Content */}
                        <div className="p-3 sm:p-4">
                          <pre className="whitespace-pre-wrap font-mono text-[11px] sm:text-xs text-vault-cream/90 max-h-36 sm:max-h-40 overflow-y-auto pr-2 select-all font-normal leading-relaxed">
                            {prompt.promptSnippet}
                          </pre>
                        </div>
                      </div>

                      {/* Parameter Variables Chips */}
                      {prompt.variables.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5 sm:pt-1">
                          <span className="text-[10px] font-sans uppercase font-bold text-vault-dark/60">
                            Variables:
                          </span>
                          {prompt.variables.map((v, vIdx) => (
                            <span
                              key={vIdx}
                              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-vault-yellow border border-vault-dark/30 text-vault-dark"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer Meta */}
                    <div className="pt-3 border-t border-vault-dark/15 flex items-center justify-between text-xs font-sans text-vault-dark/75">
                      <div className="flex items-center gap-2">
                        <img
                          src={prompt.authorAvatar}
                          alt={prompt.author}
                          className="w-5 h-5 rounded-full ring-1 ring-vault-dark object-cover"
                        />
                        <span className="font-semibold text-vault-dark text-[11px] sm:text-xs">{prompt.author}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-vault-dark/60 text-[11px] sm:text-xs">{prompt.tokens}</span>
                        <span className="flex items-center gap-0.5 font-bold text-vault-dark text-[11px] sm:text-xs">
                          <Star className="w-3 h-3 text-vault-dark fill-vault-yellow" />
                          <span>{prompt.rating}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Sleek Downward Curve Cutoff with Centered Lock Pill Button */}
        <section className="w-full relative pt-3 sm:pt-4 pb-4 sm:pb-12 max-h-[290px] sm:max-h-[360px] lg:max-h-none overflow-hidden">
          {/* Blurred Cards Grid (1 card on mobile, 2 on tablet, 3 on desktop) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8 pointer-events-none select-none opacity-40 filter blur-[2px]">
            {BLURRED_PROMPTS.map((prompt, pIdx) => (
              <article
                key={prompt.id}
                className={`bg-vault-cream border-2 border-vault-dark rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 lg:p-7 flex-col justify-between space-y-4 sm:space-y-5 shadow-sm ${
                  pIdx === 0 ? 'flex' : pIdx === 1 ? 'hidden md:flex' : 'hidden lg:flex'
                }`}
              >
                {/* Top Row */}
                <div className="space-y-3 sm:space-y-3.5">
                  <div className="flex items-center justify-between gap-2 border-b border-vault-dark/15 pb-2.5 sm:pb-3">
                    <span className="font-serif italic text-3xl sm:text-4xl text-vault-green font-normal leading-none">
                      {prompt.indexNumber}
                    </span>

                    <span
                      className={`text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border-2 ${prompt.modelBadgeStyle}`}
                    >
                      {prompt.model}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-vault-dark/60 block">
                      {prompt.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-vault-dark font-normal leading-tight tracking-tight">
                      {prompt.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] text-vault-dark/80 leading-relaxed">
                      {prompt.description}
                    </p>
                  </div>

                  {/* Code Box with Matching Header */}
                  <div className="bg-vault-dark text-vault-cream rounded-2xl border-2 border-vault-dark overflow-hidden flex flex-col shadow-inner">
                    <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 bg-vault-darker/90 border-b border-vault-cream/15">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
                        <span className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
                        <span className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
                        <span className="text-[10px] font-mono text-vault-cream/60 font-semibold tracking-wider uppercase ml-1">
                          prompt.md
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-vault-cream/10 text-vault-cream/60 border border-vault-cream/20">
                        Locked
                      </span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <pre className="whitespace-pre-wrap font-mono text-[11px] sm:text-xs text-vault-cream/90 max-h-36 overflow-hidden font-normal">
                        {prompt.promptSnippet}
                      </pre>
                    </div>
                  </div>

                  {/* Variables */}
                  {prompt.variables.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5 sm:pt-1">
                      <span className="text-[10px] font-sans uppercase font-bold text-vault-dark/60">
                        Variables:
                      </span>
                      {prompt.variables.map((v, vIdx) => (
                        <span
                          key={vIdx}
                          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-vault-yellow border border-vault-dark/30 text-vault-dark"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Meta */}
                <div className="pt-3 border-t border-vault-dark/15 flex items-center justify-between text-xs font-sans text-vault-dark/75">
                  <div className="flex items-center gap-2">
                    <img
                      src={prompt.authorAvatar}
                      alt={prompt.author}
                      className="w-5 h-5 rounded-full ring-1 ring-vault-dark object-cover"
                    />
                    <span className="font-semibold text-vault-dark text-[11px] sm:text-xs">{prompt.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-vault-dark/60 text-[11px] sm:text-xs">{prompt.tokens}</span>
                    <span className="flex items-center gap-0.5 font-bold text-vault-dark text-[11px] sm:text-xs">
                      <Star className="w-3 h-3 text-vault-dark fill-vault-yellow" />
                      <span>{prompt.rating}</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Frosted Glassmorphic Fade Overlay directly covering the blurred cards */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vault-cream/70 to-vault-cream backdrop-blur-[5px] pointer-events-none z-10" />

          {/* Downward Curve SVG Line & Centered Expanding Button DIRECTLY ON TOP of the Blurred Cards */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
            {/* SVG Curve Container */}
            <div className="relative w-full flex items-center justify-center pointer-events-auto">
              <svg
                viewBox="0 0 1440 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="w-full h-20 sm:h-28 md:h-36"
              >
                <defs>
                  <linearGradient id="curveStrokeGradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#002D0F" stopOpacity="0.3" />
                    <stop offset="25%" stopColor="#002D0F" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#002D0F" stopOpacity="1" />
                    <stop offset="75%" stopColor="#002D0F" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#002D0F" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M -20 15 C 440 145, 1000 145, 1460 15"
                  stroke="url(#curveStrokeGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Signature Expanding Two-Tone Pill Button with Lock Icon (Sitting in center of curve dip) */}
              <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <Link
                  id="prompts-curve-unlock-btn"
                  to="/signup"
                  className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
                >
                  {/* Front Green Pill */}
                  <span className="relative z-10 inline-flex items-center justify-center gap-2 bg-vault-green text-vault-dark border border-vault-dark rounded-full px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 font-sans font-semibold text-xs sm:text-sm lg:text-[14.5px] tracking-tight shadow-md group-hover:brightness-[1.03] transition-all duration-300 whitespace-nowrap">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    <span>Unlock 2,400+ Prompts</span>
                  </span>

                  {/* Back Dark Green Capsule - Deep overlap tucks behind the curved pill cap */}
                  <span className="relative -ml-6 sm:-ml-7 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-7 sm:pl-8 pr-3.5 sm:pr-4 max-w-0 opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[68px] sm:group-hover:max-w-[74px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                    <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Subtle Sign In Link Below Curve */}
            <div className="mt-4 sm:mt-7 text-center pointer-events-auto">
              <Link
                to="/signin"
                className="font-sans text-xs font-semibold text-vault-dark/80 hover:text-vault-dark hover:underline underline-offset-4 transition-colors"
              >
                Already a member? Sign in to your vault ↗
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
