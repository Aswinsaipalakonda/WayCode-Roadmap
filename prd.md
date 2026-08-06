# WayCode — Product Requirements Document (PRD)

> **An Asynchronous Mobile Gateway for Autonomous Software Engineering Agents**

| Field | Value |
|:---|:---|
| **Product Name** | WayCode |
| **Version** | 1.0.0 |
| **Author** | Aswin Sai Palakonda |
| **Date** | August 2026 |
| **Status** | Draft — Awaiting Approval |
| **Platform** | Mobile-First PWA (Progressive Web App) |
| **Database** | Supabase (PostgreSQL) |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Proposed Solution](#3-proposed-solution)
4. [Target Users & Personas](#4-target-users--personas)
5. [System Architecture](#5-system-architecture)
6. [Technology Stack](#6-technology-stack)
7. [Pages & Screens](#7-pages--screens)
8. [Feature Catalog](#8-feature-catalog)
9. [User Flows & Workflows](#9-user-flows--workflows)
10. [Design System & UI Guidelines](#10-design-system--ui-guidelines)
11. [Database Schema (Supabase / PostgreSQL)](#11-database-schema-supabase--postgresql)
12. [API Specification](#12-api-specification)
13. [Security Model](#13-security-model)
14. [Notification System](#14-notification-system)
15. [Deployment Architecture](#15-deployment-architecture)
16. [Success Metrics & Evaluation](#16-success-metrics--evaluation)
17. [Roadmap & Phasing](#17-roadmap--phasing)
18. [Risks & Mitigations](#18-risks--mitigations)
19. [Assumptions & Constraints](#19-assumptions--constraints)
20. [Glossary](#20-glossary)

---

## 1. Executive Summary

WayCode is a **mobile-first Progressive Web App (PWA)** that decouples **developer intent generation** from **heavy AI agent execution**. It enables developers to prompt, monitor, review, approve, and deploy production-level code commits from their mobile device — even after closing the browser or losing network connectivity.

The core innovation is the **Resource Interface Duality** principle: the best device for *interacting with* an AI agent (mobile phone) is not the same device that *executes* the work (cloud server). WayCode bridges this gap with an asynchronous gateway architecture powered by Redis job queues, persistent cloud AI workers, and a mobile control plane that never runs compilation or IDE-heavy workloads.

### Key Value Propositions

- **Build from anywhere** — submit coding intents from any mobile browser
- **Connection-independent execution** — tasks continue even when the phone disconnects
- **Repository-native workflow** — direct Git integration without exposing local uncommitted state
- **Human-in-the-loop governance** — approval gates for pushes and deployments
- **24/7 persistent AI runtime** — cloud executor remains available independently of developer workstation

---

## 2. Problem Statement

### 2.1 Core Problem

AI coding agents are powerful, but their interfaces are still **desktop-first**. Three fundamental constraints prevent developers from leveraging them on mobile:

| # | Problem | Description |
|:--|:---|:---|
| 01 | **Desktop Dependency** | Most agentic development workflows assume a persistent desktop, terminal, IDE, and local development environment. |
| 02 | **Mobile Constraints** | Traditional IDEs become difficult to operate on small, touch-based mobile interfaces. |
| 03 | **Network Instability** | Remote desktop and continuous browser sessions degrade when mobile connectivity becomes unstable. |

### 2.2 The Core Limitation

> **The core limitation isn't compute. It's *access*.**

### 2.3 Research Gap — The Resource Interface Duality

Existing solutions (Cloud IDEs, Remote Desktop) attempt to replicate the desktop experience on mobile. WayCode takes a fundamentally different approach:

| Plane | Device | Strengths | Weakness |
|:---|:---|:---|:---|
| **Interface Plane** | Mobile Device | Intent generation: Excellent · Approvals: Excellent · Monitoring: Excellent | Large IDE workloads: Limited |
| **Execution Plane** | Cloud Runtime | Repository operations: Excellent · AI agents: Excellent · Build & testing: Excellent | Direct interaction: Indirect |

**Proposed Principle:** *Separate intent from execution.*

---

## 3. Proposed Solution

WayCode is **one gateway with four core responsibilities**:

### 3.1 Asynchronous Execution
Requests become persistent Redis jobs. The mobile browser does not need to remain connected while an AI agent works autonomously on the cloud host.

**Pipeline:** `REQUEST → QUEUE → EXECUTE → REPORT`

### 3.2 Persistent AI Runtime
The cloud executor remains available 24/7 independently of the developer's workstation or smartphone connection. Managed by PM2 Background Daemon with 99.9% uptime target.

### 3.3 Repository-Native Workflow
Native version control workflow without exposing local uncommitted state. Operations: Git Clone → Checkout Branch → LLM Code Edit → Local Build → Test Check → Git Push.

### 3.4 Mobile-First Control Plane
High-level intent inputs optimized for touch viewports. No code editing on mobile — only:
- Intent Prompting
- GitHub OAuth Login
- Live Terminal Logs
- WhatsApp / Push Alerts

---

## 4. Target Users & Personas

### 4.1 Primary Persona — Solo Developer / Indie Hacker
- Manages 1–5 repositories
- Wants to ship features from mobile during commute, travel, or away from desk
- Comfortable with GitHub and AI tools
- Values speed-to-production over manual code editing

### 4.2 Secondary Persona — Team Lead / Engineering Manager
- Monitors multiple team repositories
- Reviews and approves AI-generated code changes
- Needs deployment visibility and notification alerts
- Values governance and audit trail

### 4.3 Tertiary Persona — Student / Learner
- B.Tech / CS student building portfolio projects
- Uses AI agents to accelerate development
- Needs affordable, accessible mobile-first tooling

---

## 5. System Architecture

WayCode follows a **three-layer decoupled architecture** with strict separation between interaction, orchestration, and execution.

### 5.1 Layer 01 — Mobile Control Plane (Interface)
- **Role:** Developer interaction without a mobile IDE
- **Responsibilities:** Repository selection, high-level prompts, approvals, task monitoring, logs, deployment state
- **Technologies:** PWA, OAuth, HTTPS, WebSocket
- **Key Constraint:** Heavy development operations never execute on the phone

### 5.2 Layer 02 — Async Gateway (Orchestration)
- **Role:** Connection-independent task queue and state management
- **Responsibilities:** API routing, Redis job persistence, task state machine, WebSocket streaming, notification dispatch
- **Technologies:** Node.js REST API, Redis Queue, Job State Engine, WebSocket Server (WSS)

### 5.3 Layer 03 — AI Execution Plane (Execution)
- **Role:** Autonomous code generation, build, test, and push
- **Responsibilities:** AI agent invocation, Git operations, sandbox execution, build runner, security linting
- **Technologies:** LLM API (Gemini 2.5 Pro), Agent Runtime, Git SCM, Docker Sandbox, Build Runner

### 5.4 Architecture Flow Diagram

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  MOBILE CONTROL  │     │   ASYNC GATEWAY  │     │  AI EXECUTION    │
│     PLANE        │────▶│                  │────▶│     PLANE        │
│                  │     │                  │     │                  │
│ • Intent Prompt  │     │ • REST API       │     │ • LLM Agent      │
│ • GitHub OAuth   │     │ • Redis Queue    │     │ • Git Clone      │
│ • Task Monitor   │     │ • Job State      │     │ • Docker Sandbox │
│ • Diff Review    │     │ • WebSocket WSS  │     │ • Build Runner   │
│ • Approve/Reject │     │ • Notification   │     │ • Test Suite     │
│ • Deploy Status  │     │   Dispatch       │     │ • Git Push       │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         ▲                                                 │
         │                                                 │
         └────────── Mobile Notification (WhatsApp) ◀──────┘
```

### 5.5 Data Flow

```
Git Repository → CI/CD Pipeline → Deployment → Mobile Notification
```

---

## 6. Technology Stack

| Category | Technology | Purpose |
|:---|:---|:---|
| **Frontend** | Next.js | React-based SSR/SSG framework for the PWA |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **App Shell** | PWA (Service Worker) | Installable mobile app experience |
| **Backend API** | Node.js | Gateway server & REST API |
| **Database** | Supabase (PostgreSQL) | User data, task history, repository metadata, audit logs |
| **Cache / Queue** | Redis | Asynchronous job queue, task state persistence |
| **Real-time** | WebSocket (Socket.IO) | Live terminal log streaming, task state sync |
| **AI Intelligence** | Gemini 2.5 Pro (LLM API) | Code generation, planning, and modification agent |
| **Agent Runtime** | Python / Agent Framework | SWE-agent / OpenHands agent orchestration |
| **Sandbox** | Docker Containers | Isolated per-task code execution environments |
| **Auth** | GitHub OAuth (via Supabase Auth) | Secure developer authentication with PKCE |
| **Version Control** | Git SCM / GitHub API | Repository operations, branch management, commit, push |
| **CI/CD** | GitHub Actions / Vercel | Automated build, test, and deployment pipeline |
| **Notifications** | WhatsApp Cloud API + Push Notifications | Task completion alerts with deployment URLs |
| **Process Manager** | PM2 | Background daemon for persistent worker processes |
| **Reverse Proxy** | Nginx | HTTPS termination, load balancing |
| **Hosting** | Hostinger VPS | Cloud server infrastructure |

---

## 7. Pages & Screens

Based on the UI design guidelines and architecture mockups, WayCode consists of the following screens:

### 7.1 Authentication Screens

#### 7.1.1 Splash / Welcome Screen
- WayCode logo and branding
- Tagline: "AI-Powered Development, Deployed to Production."
- "Sign in with GitHub" CTA button
- Trust signals: "Secure · Private · Developer First"

#### 7.1.2 GitHub OAuth Flow
- Redirect to GitHub for OAuth consent
- PKCE-based authentication via Supabase Auth
- Post-auth redirect back to main workspace

---

### 7.2 Main Application Screens

#### 7.2.1 Chat / Workspace Screen (Home)
This is the **primary interaction screen** — a conversational interface for submitting developer intents.

**Layout Components:**
- **Top Bar:** WayCode logo, hamburger menu (opens slide-out nav), notification bell, user avatar
- **Side Navigation Icons:** Home, Code/Repos, Tasks, Files, Settings (vertical icon rail)
- **Greeting Section:** "Hi Aswin! 👋 — What would you like to build today?"
- **Intent Input Area:**
  - Large prompt text area with placeholder intent
  - Action chips: "Attach Context", "Use Database", "Add Constraints"
  - Send button (blue arrow icon)
  - AI Model selector pill (e.g., "Gemini 2.5 Pro")
- **Recent Tasks List:**
  - Each task card shows: Task name, repo name, status badge (Completed/Running/Failed), time ago, progress percentage
  - Example tasks: "Admin Dashboard" (Completed, 2m ago), "Orders API Integration" (Running, 70%)
- **Bottom Tab Bar:** Chat, Tasks, Repos, Deploy, Settings

#### 7.2.2 Repository Workspace / Slide-Out Navigation
An overlay panel that slides from the left showing the developer's GitHub repositories.

**Layout Components:**
- **Search Bar:** "Search repositories..."
- **GitHub Repositories Section** with "+" button to add new
- **Repository List:** Each item shows:
  - Repository name (highlighted when selected)
  - Visibility badge (Private/Public)
  - Selection state (highlighted blue for active repo)
- **Usage Metrics Panel:**
  - Credits usage: "2,450 / 5,000" with progress bar
  - Storage usage: "4.2 GB / 10 GB" with progress bar
- **User Card:** Avatar, name, email, plan badge (e.g., "Pro Plan")

#### 7.2.3 Repository Detail / Overview Screen
When a repository is selected, shows detailed repository information.

**Layout Components:**
- **Repo Header:** Name, visibility badge, branch selector (e.g., "main"), last updated timestamp
- **Tab Navigation:** Overview, Code, Commits, Branches, Settings
- **Repository Overview Card:**
  - Description text
  - Stats grid: Commits count, Branches count, Issues count, Contributors count
- **Recent Activity Feed:**
  - Commit messages with timestamps
  - Activity type icons (feat, fix, chore)

#### 7.2.4 Intent Prompting Screen
The full-screen intent composition interface.

**Layout Components:**
- **WayCode header** with AI Model selector dropdown
- **Side icon rail:** Home, Code, Tasks, Files, Settings, Add (+)
- **Central prompt area:** Large text input with the developer's intent
  - Example: "Build an admin dashboard connected to Supabase orders table"
- **Action row:** Attach Context, Use Database, Add Constraints buttons
- **Send button:** Blue arrow to submit the intent

---

### 7.3 Task Management Screens

#### 7.3.1 Tasks List Screen
Shows all tasks across repositories with filtering and sorting.

**Layout Components:**
- **Tab filter:** All, Running, Completed, Failed, Queued
- **Task cards:** Each shows task name, repo, status, progress, time
- **Search and sort controls**

#### 7.3.2 Task Detail / Live Terminal Screen
Deep-dive into a running or completed task.

**Layout Components:**
- **Task header:** Name, status badge, elapsed time
- **Terminal log viewer:** Real-time streaming of agent execution logs
- **Progress indicator:** Circular or linear progress bar with percentage
- **Action buttons:** Cancel, Retry, View Diff

---

### 7.4 Diff Review & Approval Screen

#### 7.4.1 Code Diff Viewer
Shows the AI-generated code changes for review before approval.

**Layout Components:**
- **File path header:** e.g., "app/dashboard/orders/page.tsx"
- **Change summary badge:** "+128 −0" (additions/deletions)
- **Diff viewer:** Syntax-highlighted unified diff with line numbers
  - Green highlights for additions
  - Red highlights for deletions
- **Copy button** on the diff header
- **Action buttons at bottom:**
  - "Request Changes" (secondary button)
  - "Approve & Deploy" (primary blue/green button with rocket icon)

---

### 7.5 Deployment Screen

#### 7.5.1 Live Deployment & Alert View
Shows deployment status and live URL after successful push.

**Layout Components:**
- **Mobile notification mockup:** WhatsApp-style chat showing:
  - "Deployment Successful!" message
  - "Your project has been deployed successfully."
  - Live URL link (e.g., "https://nextjs-supabase-ecommerce.waycode.app")
- **Web dashboard view:** Orders table showing real production data:
  - Stats: Total Orders, Total Revenue, Pending Orders, Customers
  - Data table: Order ID, Customer, Status (Completed/Pending/Cancelled), Amount, Date
  - Revenue Overview chart

---

### 7.6 Settings Screen

#### 7.6.1 Profile & Settings
**Layout Components:**
- **User Profile Section:**
  - Avatar with edit icon
  - Name, email
  - Plan badge (e.g., "Pro Plan")
- **Preferences Section:**
  - Appearance: Light/Dark toggle
  - Editor Theme: "WayCode Light" selector
  - AI Model: "Gemini 2.5 Pro" selector
  - Code Style: "Prettier" selector
  - Auto Deploy: Toggle switch (ON/OFF)
- **Integrations Section:**
  - GitHub: Connected (green badge)
  - Supabase: Connected (green badge)
  - Redis Cloud: Connected (green badge)
- **About Section:**
  - Version: "1.0.0"
  - "Join Discord Community" link

---

## 8. Feature Catalog

### 8.1 Authentication & Authorization

| Feature | Description | Priority |
|:---|:---|:---|
| F-AUTH-01 | GitHub OAuth sign-in with PKCE flow via Supabase Auth | P0 |
| F-AUTH-02 | Automatic GitHub repository access scope verification | P0 |
| F-AUTH-03 | JWT-based session management with refresh tokens | P0 |
| F-AUTH-04 | User profile management (name, avatar, plan) | P1 |
| F-AUTH-05 | Role-based access control for team repositories | P2 |

### 8.2 Repository Management

| Feature | Description | Priority |
|:---|:---|:---|
| F-REPO-01 | List all GitHub repositories (private + public) for authenticated user | P0 |
| F-REPO-02 | Search & filter repositories by name | P0 |
| F-REPO-03 | View repository overview (description, stats, recent activity) | P1 |
| F-REPO-04 | Branch listing and selection | P1 |
| F-REPO-05 | View commit history with diffs | P1 |
| F-REPO-06 | Repository settings (rename, visibility, webhooks) | P2 |
| F-REPO-07 | Add/connect new GitHub repositories | P1 |

### 8.3 Intent Prompting & Task Creation

| Feature | Description | Priority |
|:---|:---|:---|
| F-INTENT-01 | Natural language intent input with touch-optimized text area | P0 |
| F-INTENT-02 | AI Model selector (Gemini 2.5 Pro, Claude, etc.) | P1 |
| F-INTENT-03 | Context attachment — link files, folders, or database schemas | P1 |
| F-INTENT-04 | Database context — auto-inject Supabase table schemas | P1 |
| F-INTENT-05 | Constraints — specify tech stack, coding style, or restrictions | P2 |
| F-INTENT-06 | Intent → normalized JSON payload conversion (repo, branch, prompt, auth) | P0 |
| F-INTENT-07 | Recent intents history for quick re-submission | P2 |

### 8.4 Asynchronous Task Queue

| Feature | Description | Priority |
|:---|:---|:---|
| F-QUEUE-01 | Redis-backed persistent task queue with unique task IDs | P0 |
| F-QUEUE-02 | Task state machine: QUEUED → PROCESSING → VERIFYING → PUSHING → DEPLOYING → COMPLETED / FAILED | P0 |
| F-QUEUE-03 | Connection-independent execution — tasks persist after browser close | P0 |
| F-QUEUE-04 | Task priority levels (normal, high, critical) | P2 |
| F-QUEUE-05 | Task cancellation from mobile | P1 |
| F-QUEUE-06 | Task retry with configurable backoff | P1 |

### 8.5 AI Agent Execution

| Feature | Description | Priority |
|:---|:---|:---|
| F-AGENT-01 | LLM agent invocation for code planning and generation | P0 |
| F-AGENT-02 | Codebase context analysis — dependency graph, file structure | P0 |
| F-AGENT-03 | Step-by-step modification plan generation | P1 |
| F-AGENT-04 | Repository cloning into isolated Docker sandbox | P0 |
| F-AGENT-05 | Feature branch creation (e.g., `agent/task-XXXX`) | P0 |
| F-AGENT-06 | Multi-file code editing with AST awareness | P0 |
| F-AGENT-07 | Automated local build execution inside sandbox | P0 |
| F-AGENT-08 | Static linting and code quality checks | P1 |
| F-AGENT-09 | Unit test execution and pass/fail reporting | P1 |
| F-AGENT-10 | Git commit with detailed change summaries | P0 |
| F-AGENT-11 | Git push to remote repository (GitHub) | P0 |

### 8.6 Real-Time Monitoring

| Feature | Description | Priority |
|:---|:---|:---|
| F-MONITOR-01 | WebSocket-based live terminal log streaming | P0 |
| F-MONITOR-02 | Task progress tracking (percentage, current phase) | P0 |
| F-MONITOR-03 | Task status badges with real-time updates | P0 |
| F-MONITOR-04 | Reconnect recovery — sync latest state after network drops | P0 |

### 8.7 Diff Review & Approval

| Feature | Description | Priority |
|:---|:---|:---|
| F-REVIEW-01 | Syntax-highlighted unified diff viewer | P0 |
| F-REVIEW-02 | File-by-file change navigation | P1 |
| F-REVIEW-03 | Addition/deletion summary stats (+N −N) | P0 |
| F-REVIEW-04 | Approve & Deploy action (one-tap) | P0 |
| F-REVIEW-05 | Request Changes with feedback text | P1 |
| F-REVIEW-06 | Reject and discard changes | P1 |

### 8.8 Deployment & CI/CD

| Feature | Description | Priority |
|:---|:---|:---|
| F-DEPLOY-01 | Automated CI/CD webhook trigger on git push (Vercel / GitHub Actions) | P0 |
| F-DEPLOY-02 | Preview deployment URL generation | P1 |
| F-DEPLOY-03 | Deployment status tracking (Building → Live → Failed) | P0 |
| F-DEPLOY-04 | Auto Deploy toggle in settings | P1 |
| F-DEPLOY-05 | Deployment history with rollback capability | P2 |

### 8.9 Notifications

| Feature | Description | Priority |
|:---|:---|:---|
| F-NOTIFY-01 | WhatsApp Cloud API alerts for task completion | P0 |
| F-NOTIFY-02 | Push notification support (PWA Web Push) | P1 |
| F-NOTIFY-03 | In-app notification feed (bell icon) | P1 |
| F-NOTIFY-04 | Notification includes: task status, summary diff, deployment URL | P0 |
| F-NOTIFY-05 | Configurable notification preferences per channel | P2 |

### 8.10 Settings & Configuration

| Feature | Description | Priority |
|:---|:---|:---|
| F-SETTINGS-01 | Appearance toggle (Light / Dark mode) | P1 |
| F-SETTINGS-02 | Editor theme selection | P2 |
| F-SETTINGS-03 | Default AI model selection | P1 |
| F-SETTINGS-04 | Code style preference (Prettier, ESLint config) | P2 |
| F-SETTINGS-05 | Auto Deploy toggle | P1 |
| F-SETTINGS-06 | Integration status display (GitHub, Supabase, Redis) | P1 |
| F-SETTINGS-07 | Usage metrics (credits, storage) | P1 |

### 8.11 PWA Capabilities

| Feature | Description | Priority |
|:---|:---|:---|
| F-PWA-01 | Service Worker for offline shell caching | P0 |
| F-PWA-02 | Installable (Add to Home Screen) manifest | P0 |
| F-PWA-03 | Splash screen with WayCode branding | P1 |
| F-PWA-04 | Background sync for queued intents when offline | P2 |

---

## 9. User Flows & Workflows

### 9.1 End-to-End Primary Workflow (9-Stage Pipeline)

This is the core user journey from mobile prompt to production deployment:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WAYCODE 9-STAGE WORKFLOW                        │
├─────────┬───────────────────────────────────────────────────────────┤
│ Stage   │ Description                                             │
├─────────┼───────────────────────────────────────────────────────────┤
│ 01      │ INTENT — Mobile prompt capture & intent parsing          │
│         │ Developer submits high-level intent from mobile browser.  │
│         │ Request → normalized JSON (repo, branch, prompt, auth).  │
│         │ Tech: Mobile Web UI, HTTPS Post                          │
├─────────┼───────────────────────────────────────────────────────────┤
│ 02      │ AUTH — OAuth & scope verification                        │
│         │ Gateway validates JWT + tenant permissions via OAuth.     │
│         │ Verifies repo write access and execution scope.          │
│         │ Tech: GitHub OAuth (Supabase Auth), JWT Bearer           │
├─────────┼───────────────────────────────────────────────────────────┤
│ 03      │ QUEUE — Asynchronous Redis job persistence               │
│         │ Request written to persistent Redis task queue.           │
│         │ Gateway returns unique task ID.                           │
│         │ Phone may disconnect safely.                              │
│         │ Tech: Redis Engine, Job Queue                            │
├─────────┼───────────────────────────────────────────────────────────┤
│ 04      │ AGENT — LLM agentic planning & context analysis          │
│         │ Cloud worker claims task, invokes LLM agent.              │
│         │ Agent parses codebase, builds dependency graph,           │
│         │ formulates step-by-step modification plan.                │
│         │ Tech: LLM Agent, AST Parser                              │
├─────────┼───────────────────────────────────────────────────────────┤
│ 05      │ SANDBOX — Isolated Git workspace modification            │
│         │ Agent clones repo into Docker container.                  │
│         │ Creates feature branch, applies code edits.               │
│         │ Tech: Docker Sandbox, Git Workspace                      │
├─────────┼───────────────────────────────────────────────────────────┤
│ 06      │ VERIFY — Automated build & verification checks           │
│         │ Runs local build tools, static linters, unit tests        │
│         │ inside sandbox to guarantee code correctness.             │
│         │ Tech: NPM / Cargo, Unit Tests                            │
├─────────┼───────────────────────────────────────────────────────────┤
│ 07      │ PUSH — Git commit & remote branch push                   │
│         │ Creates signed Git commit with change summaries.          │
│         │ Pushes feature branch to upstream remote.                 │
│         │ Tech: Git Push, SSH Signature                            │
├─────────┼───────────────────────────────────────────────────────────┤
│ 08      │ DEPLOY — CI/CD webhook & cloud deployment trigger        │
│         │ Remote push fires CI/CD pipeline webhooks.                │
│         │ Generates preview deployment URL.                         │
│         │ Tech: Vercel Webhook, Preview Build                      │
├─────────┼───────────────────────────────────────────────────────────┤
│ 09      │ NOTIFY — WhatsApp alert & mobile notification            │
│         │ Gateway dispatches push alert and WhatsApp message.       │
│         │ Contains: status, summary diffs, deployment URL.          │
│         │ Tech: WhatsApp API, Mobile Alert                         │
└─────────┴───────────────────────────────────────────────────────────┘
```

### 9.2 Fault Tolerance Flow (Disconnection Recovery)

**Scenario:** What happens when the phone disconnects?

> **Nothing happens to the execution job.** The phone acts as a control interface, not the runtime. When connectivity returns, the client retrieves the latest persisted task state seamlessly.

```
Mobile Client   →  OFFLINE (Network unavailable)
Gateway         →  ONLINE  (Task state persisted)
AI Worker       →  EXECUTING (Processing TASK-XXXX)
Repository      →  CONNECTED (Workspace available)
```

### 9.3 Interactive Scenario Flow

**Example Prompt:** "Add an analytics dashboard to the admin panel using Tailwind and the project's existing data hooks."

| Step | Phase | Terminal Output |
|:--|:---|:---|
| 01 | Submit | Request received → Repository access verified → Task created: TASK-4821 → STATUS: QUEUED |
| 02 | Queue | Persisting task state → Adding to execution queue → Job safely queued → CLIENT: May disconnect safely |
| 03 | Execute | Worker claimed TASK-4821 → git clone → git checkout -b agent/task-4821 → AGENT: Analyzing project → Implementing dashboard |
| 04 | Verify | npm run build → Running validation → Build successful → Validation checks passed |
| 05 | Deploy | git commit -m "feat: add admin analytics dashboard" → git push → CI/CD pipeline triggered → Deployment completed |
| 06 | Notify | Task state updated → STATUS: COMPLETED → Mobile notification dispatched → TASK-4821 complete |

---

## 10. Design System & UI Guidelines

> Derived from the WayCode UI Design Guidelines document (ui.png)

### 10.1 Color Palette

#### Core UI Colors

| Token | Hex | Usage |
|:---|:---|:---|
| Primary | `#0073E6` | Primary actions, links, active states |
| Primary Light | `#E6F0FF` | Light backgrounds, hover states |
| Accent | `#6C5CE7` | Secondary actions, highlights |
| Success | `#22C55E` | Success states, completed badges |
| Info | `#06B6D4` | Informational states |
| Warning | `#F59E0B` | Warning states, pending badges |
| Danger | `#EF4444` | Error states, failed badges, destructive actions |
| Neutral 900 | `#0F172A` | Primary text, dark backgrounds |

#### Neutral Scale

| Token | Hex | Usage |
|:---|:---|:---|
| Neutral 700 | `#334155` | Secondary text |
| Neutral 500 | `#64748B` | Muted text, placeholders |
| Neutral 300 | `#CBD5E1` | Borders, dividers |
| Neutral 100 | `#F1F5F9` | Light backgrounds |
| White | `#FFFFFF` | Surface backgrounds |

### 10.2 Typography

| Level | Size | Weight | Letter Spacing |
|:---|:---|:---|:---|
| H1 | 28px | Bold (700) | -0.5px |
| H2 | 22px | SemiBold (600) | -0.3px |
| H3 | 18px | SemiBold (600) | 0px |
| Body | 16px | Regular (400) | 0px |
| Small | 14px | Regular (400) | 0px |
| Caption | 12px | Medium (500) | 0.4px |

**Font Family:** Inter (Google Fonts)

### 10.3 Iconography

- **Style:** Outline / 2px stroke / Rounded
- **Library:** Custom SVG (Feather-like icons)
- **Icon set includes:** Home, Code/Terminal, Documents, Repos, Settings, Gear, Send/Arrow

### 10.4 Shadow System

| Token | Value |
|:---|:---|
| Shadow SM | `0 1px 2px rgba(15,23,42,0.06)` |
| Shadow MD | `0 4px 12px rgba(15,23,42,0.08)` |
| Shadow LG | `0 12px 28px rgba(15,23,42,0.12)` |
| Shadow XL | `0 20px 50px rgba(15,23,42,0.16)` |

### 10.5 Component Library (Primitives)

| Component | Variants |
|:---|:---|
| **Buttons** | Primary (blue filled), Secondary (outlined) |
| **Chips** | Next.js, Supabase, API — with icons |
| **Avatars** | Image-based, Initials fallback |
| **Progress Indicators** | Linear (horizontal bar), Circular (ring with %) |
| **Cards** | Task card (with status + progress), Code snippet card |
| **Feedback / Badges** | Status badges (Completed/Running/Failed/Queued) |

### 10.6 Spacing & Layout

| Token | Value |
|:---|:---|
| 4px | Smallest gap (icon padding) |
| 8px | Tight spacing |
| 12px | Standard internal padding |
| 16px | Component gap |
| 20px | Section spacing |
| 24px | Card padding |
| 32px | Large section gap |
| 40px | Page-level spacing |
| 48px | Major section breaks |
| 64px | Maximum spacing |

### 10.7 Grid System

- **Type:** Mobile Grid
- **Columns:** 4
- **Margin:** 16px
- **Gutter:** 16px

### 10.8 Responsive Breakpoints

| Breakpoint | Width |
|:---|:---|
| Mobile | 0 – 767px |
| Tablet | 768 – 1024px |
| Desktop | 1025px+ |

### 10.9 Motion Tokens

| Token | Duration |
|:---|:---|
| Fast | 150ms |
| Base | 250ms |
| Slow | 350ms |
| **Easing** | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 11. Database Schema (Supabase / PostgreSQL)

### 11.1 Core Tables

#### `users`
| Column | Type | Description |
|:---|:---|:---|
| id | UUID (PK) | Supabase Auth user ID |
| github_id | BIGINT | GitHub user ID |
| email | VARCHAR(255) | User email |
| full_name | VARCHAR(255) | Display name |
| avatar_url | TEXT | GitHub avatar URL |
| plan | ENUM('free','pro','team') | Subscription plan |
| credits_used | INTEGER | Credits consumed |
| credits_limit | INTEGER | Max credits for plan |
| storage_used_bytes | BIGINT | Storage consumed |
| storage_limit_bytes | BIGINT | Max storage for plan |
| preferences | JSONB | User preferences (theme, AI model, auto-deploy, etc.) |
| created_at | TIMESTAMPTZ | Account creation |
| updated_at | TIMESTAMPTZ | Last update |

#### `repositories`
| Column | Type | Description |
|:---|:---|:---|
| id | UUID (PK) | Internal repository ID |
| user_id | UUID (FK → users) | Owner |
| github_repo_id | BIGINT | GitHub repository ID |
| name | VARCHAR(255) | Repository name |
| full_name | VARCHAR(512) | "owner/repo" format |
| description | TEXT | Repository description |
| default_branch | VARCHAR(100) | Default branch (main/master) |
| is_private | BOOLEAN | Visibility flag |
| github_url | TEXT | Full GitHub URL |
| last_synced_at | TIMESTAMPTZ | Last metadata sync |
| created_at | TIMESTAMPTZ | Created timestamp |
| updated_at | TIMESTAMPTZ | Updated timestamp |

#### `tasks`
| Column | Type | Description |
|:---|:---|:---|
| id | UUID (PK) | Unique task ID |
| user_id | UUID (FK → users) | Task creator |
| repository_id | UUID (FK → repositories) | Target repository |
| task_code | VARCHAR(20) | Human-readable code (e.g., "TASK-4821") |
| intent_prompt | TEXT | Original developer prompt |
| intent_payload | JSONB | Normalized intent JSON (repo, branch, prompt, constraints) |
| ai_model | VARCHAR(100) | AI model used (e.g., "gemini-2.5-pro") |
| target_branch | VARCHAR(100) | Branch to work on |
| feature_branch | VARCHAR(100) | Agent-created branch (e.g., "agent/task-4821") |
| status | ENUM | QUEUED, PROCESSING, VERIFYING, PUSHING, DEPLOYING, COMPLETED, FAILED, CANCELLED |
| progress_percent | INTEGER | 0–100 progress |
| current_phase | VARCHAR(50) | Current execution phase |
| execution_logs | TEXT[] | Array of log entries |
| diff_summary | JSONB | Additions/deletions summary |
| diff_content | TEXT | Full unified diff |
| commit_sha | VARCHAR(40) | Git commit SHA |
| deployment_url | TEXT | Live deployment URL |
| deployment_status | ENUM | BUILDING, LIVE, FAILED |
| error_message | TEXT | Error details if failed |
| started_at | TIMESTAMPTZ | Execution start |
| completed_at | TIMESTAMPTZ | Execution completion |
| created_at | TIMESTAMPTZ | Task creation |
| updated_at | TIMESTAMPTZ | Last update |

#### `notifications`
| Column | Type | Description |
|:---|:---|:---|
| id | UUID (PK) | Notification ID |
| user_id | UUID (FK → users) | Recipient |
| task_id | UUID (FK → tasks) | Related task |
| type | ENUM('task_complete','task_failed','deploy_live','approval_needed') | Notification type |
| title | VARCHAR(255) | Notification title |
| body | TEXT | Notification body |
| channel | ENUM('in_app','push','whatsapp') | Delivery channel |
| is_read | BOOLEAN | Read status |
| sent_at | TIMESTAMPTZ | Dispatch time |
| created_at | TIMESTAMPTZ | Created timestamp |

#### `integrations`
| Column | Type | Description |
|:---|:---|:---|
| id | UUID (PK) | Integration ID |
| user_id | UUID (FK → users) | Owner |
| provider | ENUM('github','supabase','redis','vercel') | Service provider |
| status | ENUM('connected','disconnected','error') | Connection status |
| access_token_encrypted | TEXT | Encrypted access token |
| refresh_token_encrypted | TEXT | Encrypted refresh token |
| metadata | JSONB | Provider-specific data |
| connected_at | TIMESTAMPTZ | Connection time |
| updated_at | TIMESTAMPTZ | Last update |

#### `audit_logs`
| Column | Type | Description |
|:---|:---|:---|
| id | UUID (PK) | Log entry ID |
| user_id | UUID (FK → users) | Actor |
| task_id | UUID (FK → tasks) | Related task (nullable) |
| action | VARCHAR(100) | Action performed (e.g., "task.created", "diff.approved") |
| metadata | JSONB | Action details |
| ip_address | INET | Client IP |
| user_agent | TEXT | Client user agent |
| created_at | TIMESTAMPTZ | Event time |

### 11.2 Row Level Security (RLS) Policies

All tables enforce Supabase RLS:
- Users can only read/write their own data
- Tasks are scoped to the owning user
- Repository access is verified against GitHub OAuth scopes
- Audit logs are insert-only (no user updates/deletes)

---

## 12. API Specification

### 12.1 REST API Endpoints

#### Authentication
| Method | Endpoint | Description |
|:---|:---|:---|
| POST | `/api/auth/github` | Initiate GitHub OAuth flow |
| POST | `/api/auth/callback` | Handle OAuth callback |
| POST | `/api/auth/refresh` | Refresh JWT token |
| DELETE | `/api/auth/logout` | Revoke session |

#### Repositories
| Method | Endpoint | Description |
|:---|:---|:---|
| GET | `/api/repos` | List user's GitHub repositories |
| GET | `/api/repos/:id` | Get repository details |
| GET | `/api/repos/:id/branches` | List branches |
| GET | `/api/repos/:id/commits` | List recent commits |
| POST | `/api/repos/sync` | Sync repositories from GitHub |

#### Tasks
| Method | Endpoint | Description |
|:---|:---|:---|
| POST | `/api/tasks` | Create new task (submit intent) |
| GET | `/api/tasks` | List user's tasks with filtering |
| GET | `/api/tasks/:id` | Get task details |
| GET | `/api/tasks/:id/logs` | Get execution logs |
| GET | `/api/tasks/:id/diff` | Get code diff |
| POST | `/api/tasks/:id/approve` | Approve changes and trigger deploy |
| POST | `/api/tasks/:id/reject` | Reject changes |
| POST | `/api/tasks/:id/cancel` | Cancel running task |
| POST | `/api/tasks/:id/retry` | Retry failed task |

#### Notifications
| Method | Endpoint | Description |
|:---|:---|:---|
| GET | `/api/notifications` | List user's notifications |
| PATCH | `/api/notifications/:id/read` | Mark notification as read |
| PATCH | `/api/notifications/read-all` | Mark all as read |

#### Settings
| Method | Endpoint | Description |
|:---|:---|:---|
| GET | `/api/settings` | Get user settings/preferences |
| PATCH | `/api/settings` | Update user preferences |
| GET | `/api/settings/integrations` | List integration statuses |
| GET | `/api/settings/usage` | Get usage metrics (credits, storage) |

### 12.2 WebSocket Events

| Event | Direction | Description |
|:---|:---|:---|
| `task:status` | Server → Client | Task status change notification |
| `task:progress` | Server → Client | Progress percentage update |
| `task:log` | Server → Client | New terminal log line |
| `task:completed` | Server → Client | Task completion with results |
| `task:failed` | Server → Client | Task failure with error |
| `deploy:status` | Server → Client | Deployment status update |

---

## 13. Security Model

### 13.1 Four Pillars of Security

| Pillar | Implementation | Description |
|:---|:---|:---|
| **OAuth Authentication** | GitHub OAuth via Supabase Auth (PKCE) | Repository access is strictly linked to verified developer credentials |
| **Isolated Workspaces** | Docker Containers (Ephemeral) | Tasks execute inside ephemeral Docker containers without host exposure |
| **Secret Management** | Server-side only | Sensitive API keys remain server-side and never reach the mobile browser |
| **Approval Gates** | Mobile confirmation required | High-impact branch pushes and deployments require explicit mobile confirmation |

### 13.2 Security Measures

- All API traffic over HTTPS (TLS 1.3)
- JWT tokens with short TTL + refresh rotation
- Encrypted storage for OAuth tokens (AES-256)
- Input validation on all API endpoints
- Rate limiting on authentication and task creation endpoints
- CORS restricted to WayCode PWA domains
- Supabase RLS on all database tables
- Docker container network isolation
- No raw terminal access exposed to mobile client
- Audit logging for all state-changing operations

---

## 14. Notification System

### 14.1 Channels

| Channel | Technology | Use Case |
|:---|:---|:---|
| **WhatsApp** | WhatsApp Cloud API | Primary alert for task completion/failure with deployment URLs |
| **Web Push** | PWA Push API + Service Worker | Secondary real-time notification |
| **In-App** | WebSocket + Supabase Realtime | Live feed inside the application |

### 14.2 Notification Payload

Each notification contains:
- Task ID and human-readable code
- Task status (Completed / Failed)
- Summary of changes (files modified, lines added/removed)
- Live deployment URL (if deployment succeeded)
- Direct link to review diff in WayCode

---

## 15. Deployment Architecture

### 15.1 Infrastructure

| Component | Hosting | Notes |
|:---|:---|:---|
| PWA Frontend | Vercel | Next.js SSR/SSG with Edge Functions |
| API Gateway | Hostinger VPS | Node.js + Nginx reverse proxy |
| Redis | Redis Cloud (Upstash / Hosted) | Managed Redis for job queue |
| Database | Supabase | Managed PostgreSQL + Auth + Realtime |
| AI Workers | Hostinger VPS | PM2-managed background daemons |
| Docker Runtime | Hostinger VPS | Per-task ephemeral containers |

### 15.2 Process Management

- **PM2 Daemon:** Manages API server + background worker processes
- **Worker Model:** Background worker daemons poll Redis queue, claim tasks, execute pipeline
- **Auto-restart:** PM2 watches for crashes and auto-restarts workers

### 15.3 CI/CD Pipeline

```
Developer Push → GitHub Actions → Build → Test → Vercel Deploy
```

---

## 16. Success Metrics & Evaluation

| # | Metric | Target | Description |
|:--|:---|:---|:---|
| 01 | **Task Completion Rate** | > 92% end-to-end pass | Percentage of tasks that complete the full pipeline without manual intervention |
| 02 | **Queue Latency** | Sub-second | Time from intent submission to Redis queue persistence |
| 03 | **Build Success Rate** | > 90% | Percentage of sandbox builds that pass verification |
| 04 | **Reconnect Recovery** | < 2 seconds | Time to sync latest state after network reconnection |
| 05 | **Execution Time** | Varies by task | End-to-end time from queue to completion |
| 06 | **Change Accuracy** | > 85% | Percentage of diffs that pass linting and validation |

---

## 17. Roadmap & Phasing

### Phase 01 — Foundation (Weeks 01–03)
- [  ] Supabase project setup (database, auth, RLS policies)
- [  ] GitHub OAuth PKCE authentication flow
- [  ] Cloud infrastructure provisioning (VPS, Redis, Nginx)
- [  ] Redis queue architecture and task state machine
- [  ] Next.js PWA scaffold with Tailwind CSS design system

### Phase 02 — Communication (Weeks 04–06)
- [  ] WebSocket stream protocol for live log streaming
- [  ] Persistent task state synchronization
- [  ] Mobile PWA control plane UI (Chat, Repos, Tasks screens)
- [  ] Repository listing and selection via GitHub API
- [  ] Intent prompting and task creation flow

### Phase 03 — Intelligence (Weeks 07–09)
- [  ] Autonomous AI agent runtime integration (LLM API)
- [  ] Isolated Git sandbox (Docker) per-task setup
- [  ] Automated build, lint, and test verification
- [  ] Git commit and push automation
- [  ] Diff review and approval workflow

### Phase 04 — Validation (Weeks 10–12)
- [  ] Automated CI/CD webhook integration (Vercel/GitHub Actions)
- [  ] WhatsApp Cloud API notification dispatch
- [  ] Security audit and OWASP compliance review
- [  ] Benchmark testing and performance metrics
- [  ] Production deployment and documentation

---

## 18. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|:---|:---|:---|:---|
| LLM generates incorrect code | High | Medium | Sandbox verification + human approval gate |
| Redis job loss during crash | High | Low | Redis persistence (AOF), task state in PostgreSQL backup |
| GitHub API rate limiting | Medium | Medium | Token rotation, caching, conditional requests |
| WhatsApp API quota exceeded | Low | Low | Fallback to push notifications, queue notifications |
| VPS resource exhaustion | High | Medium | Docker resource limits, PM2 cluster mode, monitoring alerts |
| OAuth token expiration mid-task | Medium | Medium | Refresh token rotation, graceful token handling in workers |
| Network partition during deployment | Medium | Low | Idempotent deployments, webhook retry with backoff |

---

## 19. Assumptions & Constraints

### Assumptions
- Users have a GitHub account with repositories they own or have write access to
- Target repositories use common build tools (npm, yarn, cargo) that can run inside Docker
- The LLM API (Gemini 2.5 Pro) supports the required code generation quality
- Supabase free/pro tier provides sufficient database and auth capacity
- Users have WhatsApp for receiving notifications (fallback to push if not)
- VPS has sufficient resources to run Docker containers concurrently (2–4 parallel tasks)

### Constraints
- **Mobile-only interface** — no desktop-optimized views in v1.0
- **No local code editing** — WayCode is a control plane, not an IDE
- **Single-tenant initially** — each user sees only their own data
- **GitHub-only VCS** — no GitLab/Bitbucket support in v1.0
- **English-only UI** — no i18n in v1.0

---

## 20. Glossary

| Term | Definition |
|:---|:---|
| **Intent** | A high-level natural language description of the desired code change |
| **Task** | A persisted unit of work created from an intent, tracked through the full pipeline |
| **Control Plane** | The mobile interface layer that handles interaction without execution |
| **Execution Plane** | The cloud-based runtime that performs AI agent work, builds, and pushes |
| **Gateway** | The API middleware layer connecting the control plane to the execution plane |
| **Sandbox** | An isolated Docker container where code modifications are executed |
| **Diff** | The unified code changes produced by the AI agent for human review |
| **Approval Gate** | A mandatory human confirmation step before high-impact operations |
| **PWA** | Progressive Web App — installable web application with offline capabilities |
| **PKCE** | Proof Key for Code Exchange — OAuth 2.0 extension for public clients |
| **Resource Interface Duality** | The principle that the best device for interaction differs from the best device for execution |

---

> **Document Status:** This PRD is pending user review and approval before implementation begins.
