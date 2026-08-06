# WayCode — Antigravity Build Prompts

> **Sequenced prompts to build the entire WayCode application from scratch.**
> Each prompt is self-contained and references the `prd.md`, `architecture.png`, and `ui.png` for context.

---

## How to Use This File

1. **Execute prompts in order** — they follow the 4-phase roadmap from the PRD
2. **Copy the entire prompt block** (between the `---` dividers) and paste into Antigravity
3. **Wait for completion** before starting the next prompt
4. **Review & test** after each prompt before moving on
5. Prompts reference `@[prd.md]`, `@[architecture.png]`, and `@[ui.png]` — keep these files in the workspace

---

## Phase 01 — Foundation (Weeks 01–03)

### PROMPT 01: Project Scaffold & Next.js Initialization

```
Initialize the WayCode project as a Next.js application with TypeScript and Tailwind CSS inside the current workspace directory (f:\Major Projects\WayCode).

Requirements:
- Use Next.js 15 (App Router) with TypeScript
- Use Tailwind CSS v4 for styling
- Configure as a PWA with next-pwa or @serwist/next
- Add web app manifest (manifest.json) with:
  - Name: "WayCode"
  - Short name: "WayCode"
  - Theme color: #0073E6
  - Background color: #0F172A
  - Display: standalone
  - Start URL: /
  - Icons referencing the existing images/logo.svg
- Set up the project structure following feature-based architecture:
  ```
  src/
  ├── app/                    # Next.js App Router pages
  │   ├── (auth)/             # Auth layout group
  │   │   ├── login/
  │   │   └── callback/
  │   ├── (dashboard)/        # Authenticated layout group
  │   │   ├── chat/           # Main workspace / home
  │   │   ├── tasks/          # Task list & detail
  │   │   ├── repos/          # Repository management
  │   │   ├── deploy/         # Deployment status
  │   │   └── settings/       # Settings & profile
  │   ├── layout.tsx
  │   └── page.tsx            # Splash / welcome redirect
  ├── components/
  │   ├── ui/                 # Primitive components (Button, Badge, Card, etc.)
  │   ├── layout/             # Shell, TopBar, BottomTabBar, SlideOutNav
  │   └── features/           # Feature-specific components
  ├── lib/
  │   ├── supabase/           # Supabase client & helpers
  │   ├── api/                # API client functions
  │   └── utils/              # Shared utilities
  ├── hooks/                  # Custom React hooks
  ├── types/                  # TypeScript type definitions
  └── styles/                 # Global styles & design tokens
  ```
- Install dependencies: @supabase/supabase-js, @supabase/ssr, socket.io-client, lucide-react (for icons)
- Keep the existing index.html, README.md, images/, architecture.png, ui.png untouched — they are project documentation
- Configure path aliases (@/ -> src/)
- Add .env.local.example with placeholders for:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_APP_URL
  - GITHUB_CLIENT_ID
  - GITHUB_CLIENT_SECRET

Refer to @[prd.md] Section 6 (Technology Stack) and Section 7 (Pages & Screens) for the full structure.
```

---

### PROMPT 02: Design System & Tailwind Configuration

```
Set up the complete WayCode design system by configuring Tailwind CSS and creating reusable UI primitive components.

Refer to @[prd.md] Section 10 (Design System & UI Guidelines) and @[ui.png] for the exact design tokens.

1. **Tailwind Config** — extend tailwind.config.ts with:
   - Colors: Primary (#0073E6), Primary Light (#E6F0FF), Accent (#6C5CE7), Success (#22C55E), Info (#06B6D4), Warning (#F59E0B), Danger (#EF4444), Neutral scale (900: #0F172A, 700: #334155, 500: #64748B, 300: #CBD5E1, 100: #F1F5F9)
   - Font family: Inter (import from Google Fonts in layout.tsx)
   - Font sizes matching: H1 28px, H2 22px, H3 18px, Body 16px, Small 14px, Caption 12px
   - Border radius tokens: sm (8px), md (12px), lg (16px), xl (20px), 2xl (24px), 3xl (32px), full (9999px)
   - Shadow system: sm, md, lg, xl as specified in PRD Section 10.4
   - Motion/transition: fast (150ms), base (250ms), slow (350ms), easing cubic-bezier(0.4, 0, 0.2, 1)
   - Breakpoints: mobile (default), tablet (768px), desktop (1025px)

2. **Global Styles** (globals.css):
   - CSS custom properties for all design tokens
   - Custom scrollbar styling
   - Selection color: rgba(0, 115, 230, 0.18)
   - Smooth scroll behavior
   - Antialiased text rendering

3. **UI Primitive Components** (src/components/ui/):
   Create the following reusable components with proper TypeScript types:
   - **Button** — variants: primary (blue filled), secondary (outlined), ghost, danger. Sizes: sm, md, lg. Full-width option.
   - **Badge** — variants: success (green), running (blue), failed (red), queued (gray), pending (amber). Pill-shaped with dot indicator.
   - **Card** — base card with padding, border, shadow, rounded-3xl. Interactive variant with hover lift.
   - **Avatar** — image-based with initials fallback. Sizes: sm (32px), md (40px), lg (56px).
   - **Input** — text input with label, placeholder, error state. Touch-optimized height (48px min).
   - **TextArea** — multi-line input optimized for intent prompting.
   - **ProgressBar** — linear (horizontal) and circular (ring) variants. Shows percentage.
   - **Chip** — small pill with optional icon. For tech tags like "Next.js", "Supabase", "API".
   - **Toggle** — on/off switch for settings.
   - **Skeleton** — loading placeholder component.
   - **StatusDot** — animated pulsing dot (green for online, red for offline, blue for running).

All components should use the design tokens from Tailwind config and support dark mode readiness.
```

---

### PROMPT 03: Supabase Database Schema & RLS Setup

```
Create the complete Supabase database schema for WayCode with all tables, types, RLS policies, and migration files.

Refer to @[prd.md] Section 11 (Database Schema) for the exact column definitions.

1. **Create Supabase migration file** at `supabase/migrations/001_initial_schema.sql` with:

   a. **Custom ENUM types:**
      - user_plan: 'free', 'pro', 'team'
      - task_status: 'queued', 'processing', 'verifying', 'pushing', 'deploying', 'completed', 'failed', 'cancelled'
      - deployment_status: 'building', 'live', 'failed'
      - notification_type: 'task_complete', 'task_failed', 'deploy_live', 'approval_needed'
      - notification_channel: 'in_app', 'push', 'whatsapp'
      - integration_provider: 'github', 'supabase', 'redis', 'vercel'
      - integration_status: 'connected', 'disconnected', 'error'

   b. **Tables** (all with exact columns from PRD Section 11.1):
      - users
      - repositories
      - tasks
      - notifications
      - integrations
      - audit_logs

   c. **Indexes** for performance:
      - tasks: user_id, status, created_at
      - repositories: user_id, github_repo_id
      - notifications: user_id, is_read, created_at
      - audit_logs: user_id, created_at

   d. **Triggers:**
      - Auto-update updated_at on users, repositories, tasks, integrations
      - Auto-generate task_code (TASK-XXXX format) on task insert

2. **Row Level Security (RLS) policies:**
   - users: Users can read/update their own row only
   - repositories: Users can CRUD their own repos only
   - tasks: Users can read/create/update their own tasks only
   - notifications: Users can read/update their own notifications only
   - integrations: Users can read/update their own integrations only
   - audit_logs: Users can insert only (no read/update/delete by user — admin only)

3. **Create TypeScript types** at `src/types/database.ts`:
   - Generate TypeScript interfaces matching all table schemas
   - Export a Database type for Supabase client typing

4. **Create Supabase client helpers** at `src/lib/supabase/`:
   - client.ts: Browser-side Supabase client (createBrowserClient)
   - server.ts: Server-side Supabase client (createServerClient for RSC/Route Handlers)
   - middleware.ts: Supabase auth middleware for session refresh
```

---

### PROMPT 04: GitHub OAuth Authentication System

```
Implement the complete GitHub OAuth authentication flow for WayCode using Supabase Auth.

Refer to @[prd.md] Section 7.1 (Authentication Screens), Section 8.1 (Auth Features), Section 13 (Security Model), and @[architecture.png] for the step-1 auth screen reference.

1. **Splash / Welcome Screen** (`src/app/page.tsx`):
   Build a mobile-first welcome screen with:
   - Dark background (#0F172A) filling the full viewport
   - Centered WayCode logo (use existing images/logo.svg) — large, prominent
   - Product name "WayCode" in bold white text below logo
   - Tagline: "AI-Powered Development, Deployed to Production." in muted gray
   - "Sign in with GitHub" button — large, white background, rounded-full, with GitHub icon, bold text
   - Trust signals at bottom: "Secure · Private · Developer First" in small gray text
   - The screen should look exactly like the Step 1 (Setup & Auth) panel in @[architecture.png]
   - Add subtle gradient orb animation in the background
   - Redirect to dashboard if user is already authenticated

2. **OAuth Callback Handler** (`src/app/(auth)/callback/route.ts`):
   - Handle Supabase Auth callback with code exchange
   - On success: sync user profile to `users` table (github_id, email, full_name, avatar_url)
   - On success: sync GitHub repositories to `repositories` table using GitHub API
   - Redirect to /chat (main workspace)
   - On error: redirect to / with error message

3. **Auth Middleware** (`src/middleware.ts`):
   - Protect all (dashboard) routes — redirect unauthenticated users to /
   - Refresh Supabase session on every request
   - Allow public access to / (splash) and /callback

4. **Auth Hooks & Context** (`src/hooks/useAuth.ts`, `src/lib/supabase/auth.ts`):
   - useAuth hook: returns current user, loading state, signOut function
   - signInWithGitHub function: triggers Supabase OAuth with GitHub provider
   - signOut function: clears session and redirects to /
   - getUserProfile: fetches full user profile from users table

5. **GitHub Repository Sync** (`src/lib/api/github.ts`):
   - Function to fetch all repos from GitHub API using the user's access token
   - Upsert repos into the repositories table
   - Handle pagination for users with many repos

Ensure the auth flow uses PKCE (which Supabase handles by default) and request the 'repo' scope for repository access.
```

---

### PROMPT 05: App Shell — Layout, Navigation & Bottom Tab Bar

```
Build the authenticated app shell with the mobile-first layout including TopBar, SlideOutNavigation, and BottomTabBar.

Refer to @[prd.md] Section 7.2 (Main Application Screens), and @[ui.png] for the exact layout reference — specifically panels "1. MAIN CHAT WORKSPACE", "2. SLIDE-OUT NAVIGATION & REPOS", and the bottom tab bar.

1. **Dashboard Layout** (`src/app/(dashboard)/layout.tsx`):
   - Full-height mobile layout with TopBar at top, content area in middle, BottomTabBar fixed at bottom
   - Content area scrolls independently
   - Safe area insets for notched phones (env(safe-area-inset-*))

2. **TopBar Component** (`src/components/layout/TopBar.tsx`):
   - Left: Hamburger menu button (opens slide-out nav)
   - Center: WayCode logo + "WayCode" text
   - Right: Notification bell icon (with unread badge count) + User avatar (circular, 32px)
   - Frosted glass background: bg-white/90 backdrop-blur-xl
   - Fixed to top, height ~56px
   - Border-bottom subtle divider

3. **BottomTabBar Component** (`src/components/layout/BottomTabBar.tsx`):
   - 5 tabs: Chat (message icon), Tasks (list icon), Repos (code icon), Deploy (rocket icon), Settings (gear icon)
   - Each tab has an icon + label text below
   - Active tab: Primary blue icon + text, inactive: Neutral 500
   - Fixed to bottom with safe area padding
   - Frosted glass background matching TopBar
   - Uses Next.js Link for navigation to: /chat, /tasks, /repos, /deploy, /settings
   - Current route detection for active state

4. **SlideOutNavigation Component** (`src/components/layout/SlideOutNav.tsx`):
   - Slide-in overlay from left side (full height, ~85% width)
   - Dark overlay backdrop when open
   - Header: WayCode logo with close (X) button
   - Search bar: "Search repositories..."
   - "GITHUB REPOSITORIES" section header with "+" add button
   - Repository list: Each item shows repo name, visibility badge (Private/Public pill)
   - Selected repo highlighted in blue
   - "USAGE" section at bottom:
     - Credits: "2,450 / 5,000" with linear progress bar
     - Storage: "4.2 GB / 10 GB" with linear progress bar
   - User card at very bottom: Avatar, name, plan badge ("Pro Plan")
   - Smooth slide animation (350ms, ease)
   - Close on backdrop click or swipe left
   - Fetch real repo data from Supabase repositories table

5. **Side Icon Rail** (optional, visible on tablet/desktop only):
   - Vertical icon bar on the left: Home, Code/Repos, Tasks, Files, Settings icons
   - 48px wide, icons centered
   - Active icon highlighted with blue background pill

Match the exact visual style from @[ui.png] — clean white surfaces, Inter font, subtle shadows, blue accent highlights.
```

---

## Phase 02 — Communication (Weeks 04–06)

### PROMPT 06: Chat / Workspace Screen (Home)

```
Build the main Chat / Workspace screen — the primary interaction hub of WayCode.

Refer to @[prd.md] Section 7.2.1 (Chat / Workspace Screen) and @[ui.png] panel "1. MAIN CHAT WORKSPACE" for exact layout.

Create `src/app/(dashboard)/chat/page.tsx` with:

1. **Greeting Section:**
   - "Hi {user.first_name}! 👋" in H1 bold
   - "What would you like to build today?" in Body muted text
   - Personalized using the authenticated user's name from Supabase

2. **Intent Input Card:**
   - Large card container with subtle border and shadow
   - Small sparkle/star icon (accent blue) top-left inside card
   - Code icon (</>) floating on right side of card
   - Multi-line text area placeholder: "Build an admin dashboard connected to Supabase orders table"
   - Below the text area, action chip row:
     - "📎 Attach Context" chip
     - "🗄 Use Database" chip  
     - "⚙ Add Constraints" chip
   - Blue circular send button (arrow icon) at bottom-right of card
   - AI Model selector pill at top-right: "⚡ Gemini 2.5 Pro" dropdown
   - The card should feel premium — rounded-3xl, shadow-lg, border-primary/10

3. **Recent Tasks Section:**
   - Section header: "Recent Tasks" with "View all" link
   - List of task cards, each showing:
     - Task name (bold, e.g., "Admin Dashboard")
     - Repo name below (muted, e.g., "nextjs-supabase-ecommerce")
     - Status badge on right: Completed (green), Running (blue with progress %), Failed (red)
     - Time ago (e.g., "2m ago", "1h ago")
   - Running tasks show a linear progress bar with percentage
   - Failed tasks show a red error icon
   - Cards are interactive — tap to navigate to /tasks/[id]
   - Fetch real data from Supabase tasks table, ordered by created_at DESC, limit 5

4. **Empty State:**
   - When no tasks exist, show a friendly illustration/icon
   - "No tasks yet. Submit your first intent above!" message
   - Subtle animation (fade-in)

The screen should scroll naturally with the greeting at top and tasks below. The intent input card should be visually prominent and inviting.
```

---

### PROMPT 07: Repository Management Screens

```
Build the Repository management screens — list view and detail view.

Refer to @[prd.md] Section 7.2.2 (Slide-Out Nav), 7.2.3 (Repository Detail), Section 8.2 (Repository Features), and @[architecture.png] Step 2 (Repository Workspace).

1. **Repos List Page** (`src/app/(dashboard)/repos/page.tsx`):
   - Page header: "Repositories" with sync button (refresh icon)
   - Search input: "Search repositories..." with search icon
   - Repository cards list, each card showing:
     - Repository name (bold)
     - Description (truncated, muted text)
     - Visibility badge pill: "Private" (dark) or "Public" (outlined)
     - Last updated timestamp
     - Language indicator dot (if available)
     - Stats row: commits, branches, stars (small text)
   - Pull-to-refresh gesture support
   - Tap a card to navigate to /repos/[id]
   - "+" FAB button to connect new repos
   - Fetch from Supabase repositories table with search filtering
   - Loading skeleton while data loads

2. **Repository Detail Page** (`src/app/(dashboard)/repos/[id]/page.tsx`):
   - Header: Repo name, visibility badge, "Updated 2 hours ago"
   - Branch selector dropdown: Shows current branch (e.g., "main"), lists all branches
   - Tab navigation: Overview, Code, Commits, Branches, Settings
   - **Overview Tab (default):**
     - "Repository Overview" card with description text
     - Stats grid (2x2): Commits (142), Branches (7), Issues (3), Contributors (2)
     - "Recent Activity" section:
       - List of recent commits with:
         - Commit type icon (feat/fix/chore)
         - Commit message truncated
         - Time ago
     - "Start a Task" button — navigates to /chat with this repo pre-selected
   - **Commits Tab:** List of commits with SHA, message, author, timestamp
   - **Branches Tab:** List of branches with active branch highlighted
   - Fetch repo details from GitHub API (via server action) and Supabase

Match the exact layout from @[architecture.png] Step 2 panel — clean white cards, stats in a grid, activity feed below.
```

---

### PROMPT 08: Intent Prompting & Task Creation

```
Build the full intent prompting flow and task creation system.

Refer to @[prd.md] Section 7.2.4 (Intent Prompting Screen), Section 8.3 (Intent Features), Section 8.4 (Task Queue), Section 9.1 (9-Stage Workflow), and @[architecture.png] Step 3 (Intent Prompting).

1. **Intent Submission Flow** (enhance the chat page intent card):
   When the user taps the send button on the intent card:
   
   a. **Validate the intent:**
      - Must have a selected repository (from slide-out nav or repos page)
      - Must have non-empty prompt text
      - Show inline validation errors if missing

   b. **Create Task API Route** (`src/app/api/tasks/route.ts` - POST):
      - Accept: { repository_id, intent_prompt, target_branch, ai_model, constraints }
      - Generate unique task_code (TASK-XXXX with random 4-digit number)
      - Normalize into intent_payload JSON: { repo, branch, prompt, constraints, auth }
      - Insert into Supabase tasks table with status: 'queued'
      - Return task ID and task_code to client
      - Create audit_log entry: "task.created"

   c. **Client-side after submission:**
      - Show success toast: "Task TASK-XXXX created and queued!"
      - Clear the intent input
      - Navigate to /tasks/[id] to monitor the task
      - Animate the task card appearing in Recent Tasks

2. **Intent Input Enhancements:**
   - Repository selector: Show currently selected repo name as a chip above the text area
   - Branch selector: Dropdown to pick target branch (default: repo's default_branch)
   - "Attach Context" modal: File tree of the repo (via GitHub API) — select files to include as context
   - "Use Database" modal: Lists Supabase tables — select tables to auto-inject schema
   - "Add Constraints" modal: Text input for additional constraints (tech stack, coding rules)
   - AI Model selector: Dropdown with options (Gemini 2.5 Pro, Claude 3.5 Sonnet)

3. **Task List API Routes** (`src/app/api/tasks/route.ts` - GET):
   - List tasks for authenticated user
   - Support query params: status filter, repo filter, search, page, limit
   - Order by created_at DESC
   - Return with pagination metadata

4. **Individual Task API** (`src/app/api/tasks/[id]/route.ts`):
   - GET: Return full task details
   - PATCH: Update task status, progress, logs (used by worker later)

Refer to @[architecture.png] Step 3 for the visual layout — centered prompt with action chips below.
```

---

### PROMPT 09: Tasks List & Task Detail Screens

```
Build the Tasks management screens — list view with filtering and task detail with live monitoring.

Refer to @[prd.md] Section 7.3 (Task Management Screens), Section 8.6 (Real-Time Monitoring).

1. **Tasks List Page** (`src/app/(dashboard)/tasks/page.tsx`):
   - Page header: "Tasks" with count badge
   - **Filter tab bar** (horizontal, scrollable): All, Queued, Running, Completed, Failed
     - Each tab shows count in parentheses
     - Active tab: bold, underlined, primary color
   - **Task cards list:** Each card contains:
     - Left: Status indicator (colored dot — green/blue/red/gray)
     - Task name (bold, H3)
     - Repo name (muted, caption size)
     - Status badge (Completed/Running/Failed/Queued) with appropriate color
     - Progress bar (only for Running status, shows %)
     - Time: "Created 2m ago" or "Completed 1h ago"
     - Tap to navigate to /tasks/[id]
   - **Empty states per filter:**
     - No running tasks: "All quiet. No tasks running right now."
     - No failed tasks: "Great news! No failed tasks."
   - Search input at top to filter by task name
   - Fetch from GET /api/tasks with filter params
   - Infinite scroll or "Load More" pagination

2. **Task Detail Page** (`src/app/(dashboard)/tasks/[id]/page.tsx`):
   - **Task Header:**
     - Back button (← arrow)
     - Task code: "TASK-4821" in mono font
     - Task name (bold, large)
     - Status badge (large, prominent)
     - Elapsed time: "Running for 2m 34s" or "Completed in 4m 12s"
   
   - **Progress Section:**
     - Circular progress ring (large, centered) with percentage inside
     - Current phase text below: "Analyzing codebase..." / "Building project..." etc.
     - Phase progress steps (horizontal): Intent → Auth → Queue → Agent → Sandbox → Verify → Push → Deploy → Notify
       - Completed phases: green checkmark
       - Current phase: blue pulsing dot
       - Pending phases: gray dot
   
   - **Terminal Log Viewer:**
     - Dark background card (#111114) with terminal aesthetic
     - Monospace font (SF Mono / Menlo)
     - Terminal dots at top (red/yellow/green circles)
     - Title: "execution.log"
     - Log lines with timestamps:
       - Normal logs in gray
       - Success messages in green with ✓
       - Status updates in blue
       - Errors in red with ✗
     - Auto-scroll to bottom as new logs arrive
     - Initial implementation: fetch logs from Supabase (WebSocket real-time comes in later prompt)
   
   - **Action Buttons (bottom fixed bar):**
     - Running: "Cancel Task" (danger secondary button)
     - Completed: "View Diff" (primary button), "Deploy" (secondary)
     - Failed: "Retry" (primary button), "View Logs" (secondary)
   
   - Fetch task data from GET /api/tasks/[id]
   - Set up Supabase Realtime subscription on the task row for live updates
```

---

### PROMPT 10: WebSocket Integration & Real-Time Updates

```
Implement WebSocket-based real-time communication for live task updates, log streaming, and state synchronization.

Refer to @[prd.md] Section 8.6 (Real-Time Monitoring), Section 12.2 (WebSocket Events), Section 9.2 (Fault Tolerance).

1. **Supabase Realtime Setup** (instead of custom Socket.IO, leverage Supabase Realtime for v1):
   
   Create `src/hooks/useTaskRealtime.ts`:
   - Subscribe to Supabase Realtime channel for the specific task row
   - Listen for UPDATE events on the `tasks` table
   - On task status change: update local state, show toast notification
   - On progress change: update progress ring and percentage
   - On logs change: append new log lines to terminal viewer
   - On completion: show success animation, enable "View Diff" button
   - On failure: show error state, enable "Retry" button
   - Auto-reconnect on connection drop
   - Clean up subscription on component unmount

2. **Create `src/hooks/useTasksRealtime.ts`:**
   - Subscribe to all tasks for the current user
   - Used on Tasks List page and Chat page (Recent Tasks)
   - On any task status change: update the list in real-time
   - Badge count update for BottomTabBar (Tasks tab shows running count)

3. **Reconnect Recovery (`src/hooks/useReconnect.ts`):**
   - Detect online/offline status (navigator.onLine + event listeners)
   - When coming back online:
     - Re-fetch latest task states from Supabase
     - Re-establish Realtime subscriptions
     - Show "Reconnected" toast
   - When going offline:
     - Show "You're offline. Tasks continue on the cloud." banner
     - Queue any pending actions locally

4. **Notification Badge Updates:**
   - Subscribe to Supabase Realtime on `notifications` table
   - Update the bell icon badge count in TopBar when new notifications arrive
   - Play subtle haptic feedback (if supported) on new notification

5. **Apply real-time to existing screens:**
   - Chat page: Recent Tasks list updates in real-time
   - Tasks List page: Cards update status/progress in real-time
   - Task Detail page: Terminal logs stream in real-time, progress updates live
   - TopBar: Notification badge count updates

Ensure all subscriptions handle the reconnection scenario gracefully — if the user's phone was offline and comes back, the UI should sync to the latest state within 2 seconds (PRD metric #04).
```

---

### PROMPT 11: API Routes — Repositories, Tasks, Notifications

```
Build all remaining REST API route handlers for WayCode.

Refer to @[prd.md] Section 12.1 (REST API Endpoints) for the complete specification.

1. **Repository API Routes** (`src/app/api/repos/`):
   
   a. `route.ts` — GET /api/repos:
      - Fetch all repositories for authenticated user from Supabase
      - Support query params: search (name filter), sort (name/updated), limit, offset
      - Return: { repos: Repository[], total: number, page: number }
   
   b. `[id]/route.ts` — GET /api/repos/:id:
      - Fetch single repository by ID
      - Verify ownership (user_id match)
      - Return full repository details
   
   c. `[id]/branches/route.ts` — GET /api/repos/:id/branches:
      - Fetch branches from GitHub API using stored access token
      - Return: { branches: Branch[], default: string }
   
   d. `[id]/commits/route.ts` — GET /api/repos/:id/commits:
      - Fetch recent commits from GitHub API
      - Support: branch filter, limit (default 20)
      - Return: { commits: Commit[] }
   
   e. `sync/route.ts` — POST /api/repos/sync:
      - Fetch all repos from GitHub API for the user
      - Upsert into Supabase repositories table
      - Return: { synced: number, new: number, updated: number }

2. **Task API Routes** (`src/app/api/tasks/`):
   
   a. `[id]/logs/route.ts` — GET /api/tasks/:id/logs:
      - Return execution_logs array for the task
      - Support: since (timestamp) for incremental fetching
   
   b. `[id]/diff/route.ts` — GET /api/tasks/:id/diff:
      - Return diff_content and diff_summary
      - 404 if no diff available yet
   
   c. `[id]/approve/route.ts` — POST /api/tasks/:id/approve:
      - Verify task status is 'verifying' or 'completed' (awaiting approval)
      - Update status to 'deploying'
      - Create audit_log: "diff.approved"
      - Trigger deployment (placeholder for now — will be implemented in Phase 04)
      - Return: { status: 'deploying' }
   
   d. `[id]/reject/route.ts` — POST /api/tasks/:id/reject:
      - Accept: { reason: string }
      - Update task status to 'cancelled'
      - Create audit_log: "diff.rejected"
      - Return: { status: 'cancelled' }
   
   e. `[id]/cancel/route.ts` — POST /api/tasks/:id/cancel:
      - Only allow if status is 'queued' or 'processing'
      - Update status to 'cancelled'
      - Create audit_log: "task.cancelled"
   
   f. `[id]/retry/route.ts` — POST /api/tasks/:id/retry:
      - Only allow if status is 'failed' or 'cancelled'
      - Reset status to 'queued', clear error fields
      - Create audit_log: "task.retried"

3. **Notification API Routes** (`src/app/api/notifications/`):
   
   a. `route.ts` — GET /api/notifications:
      - Fetch notifications for authenticated user
      - Support: unread_only (boolean), limit, offset
      - Return: { notifications: Notification[], unread_count: number }
   
   b. `[id]/read/route.ts` — PATCH /api/notifications/:id/read:
      - Mark single notification as read (is_read = true)
   
   c. `read-all/route.ts` — PATCH /api/notifications/read-all:
      - Mark all user's notifications as read

4. **Settings API Routes** (`src/app/api/settings/`):
   
   a. `route.ts`:
      - GET: Return user preferences from users.preferences JSONB
      - PATCH: Update user preferences (merge JSONB)
   
   b. `integrations/route.ts` — GET:
      - Return integration statuses from integrations table
   
   c. `usage/route.ts` — GET:
      - Return: { credits_used, credits_limit, storage_used_bytes, storage_limit_bytes }

All routes must:
- Verify Supabase authentication (getUser from session)
- Return proper HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- Include error messages in response body
- Use consistent response format: { data?, error?, message? }
```

---

## Phase 03 — Intelligence (Weeks 07–09)

### PROMPT 12: Diff Review & Approval Screen

```
Build the Diff Review & Approval screen for reviewing AI-generated code changes.

Refer to @[prd.md] Section 7.4 (Diff Review & Approval Screen), Section 8.7 (Review Features), and @[architecture.png] Step 5 (Diff Review & Approval).

Create `src/app/(dashboard)/tasks/[id]/diff/page.tsx`:

1. **Diff Header:**
   - Back button with task code: "← TASK-4821"
   - Task name as page title
   - Overall change summary: "+128 −0" badge (green for additions, red for deletions)

2. **File Navigator:**
   - Collapsible list of changed files
   - Each file shows: file path, change type (Added/Modified/Deleted), +N −M stats
   - Icon per file type (tsx, ts, css, json, etc.)
   - Tap a file to scroll to its diff section

3. **Diff Viewer Component** (`src/components/features/DiffViewer.tsx`):
   - File path header bar with copy button: "app/dashboard/orders/page.tsx"
   - Change summary badge on the right: "+128 −0"
   - Unified diff display:
     - Line numbers on left (gutter)
     - Syntax highlighted code (use a lightweight syntax highlighter like Prism.js or highlight.js)
     - Added lines: green background (#dcfce7) with "+" prefix
     - Removed lines: red background (#fee2e2) with "−" prefix
     - Context lines: white/neutral background
     - Monospace font (SF Mono / Fira Code / JetBrains Mono)
   - Horizontal scroll for long lines
   - Line wrapping toggle

4. **Action Bar (fixed at bottom):**
   - Two buttons side by side:
     - "Request Changes" — secondary/outlined button, left side
     - "🚀 Approve & Deploy" — primary button (gradient blue-to-indigo), right side, prominent
   - "Request Changes" opens a bottom sheet:
     - Text area: "Describe the changes you'd like..."
     - "Submit Feedback" button
     - Calls POST /api/tasks/:id/reject with feedback
   - "Approve & Deploy" shows confirmation dialog:
     - "This will push changes to {branch} and trigger deployment. Continue?"
     - "Cancel" and "Approve" buttons
     - Calls POST /api/tasks/:id/approve

5. **States:**
   - Loading: Skeleton loading while diff loads
   - No diff: "Diff not available yet. Check back when the task completes."
   - Error: "Failed to load diff. Retry?"

Fetch diff data from GET /api/tasks/:id/diff. Style the diff viewer to look exactly like the Step 5 panel in @[architecture.png] — dark code area with green highlighted additions.
```

---

### PROMPT 13: Deployment Status Screen

```
Build the Deployment management screen showing deployment history and live status.

Refer to @[prd.md] Section 7.5 (Deployment Screen), Section 8.8 (Deployment Features), and @[architecture.png] Step 6 (Live Deployment & Alert).

Create `src/app/(dashboard)/deploy/page.tsx`:

1. **Page Header:**
   - "Deployments" title
   - "Auto Deploy" toggle (synced with user preferences)

2. **Active Deployment Banner** (if any deployment is in progress):
   - Gradient card (blue-to-indigo)
   - Pulsing status dot + "Deploying..."
   - Task name and repo
   - Progress bar
   - Time elapsed: "Building for 45s..."

3. **Recent Deployments List:**
   - Each deployment card shows:
     - Status icon: ✓ green (Live), ⏳ amber (Building), ✗ red (Failed)
     - Task name and code
     - Repository name
     - Deployment timestamp: "Deployed 2h ago"
     - Live URL link (if status is 'live'): clickable, opens in new tab
     - Duration: "Built in 32s"
   - Tap card to expand with more details:
     - Deployment URL (clickable)
     - Commit SHA (truncated, clickable to GitHub)
     - Branch name
     - Files changed summary

4. **Empty State:**
   - When no deployments: rocket illustration
   - "No deployments yet. Approve a task to trigger your first deployment!"

5. **Deployment Detail Modal/Sheet:**
   - Full deployment info when tapping a card:
     - WhatsApp-style notification preview showing:
       - "Deployment Successful! ✅"
       - "Your project has been deployed successfully."
       - Live URL as clickable link
     - Stats: Total build time, files changed, lines added/removed
     - "Open Live Site" button
     - "View Diff" button → navigates to /tasks/[id]/diff

Fetch deployments by querying tasks with deployment_status IS NOT NULL, ordered by completed_at DESC. Use Supabase Realtime to update deployment status in real-time.
```

---

### PROMPT 14: Settings & Profile Screen

```
Build the Settings & Profile screen with all configuration options.

Refer to @[prd.md] Section 7.6 (Settings Screen), Section 8.10 (Settings Features), and @[ui.png] panel "3. SETTINGS & PROFILE".

Create `src/app/(dashboard)/settings/page.tsx`:

1. **Profile Section (top):**
   - Back arrow + "Settings" title
   - Large user avatar (80px, circular) with edit/camera overlay icon
   - Full name (bold, H2)
   - Email (muted text)
   - Plan badge: "Pro Plan" pill (blue background, white text)
   - Edit profile button (pencil icon)

2. **Preferences Section:**
   - Section header: "PREFERENCES"
   - Setting rows (each with label + control on right):
     - ☀ Appearance: "Light" / "Dark" segmented control or dropdown
     - 🎨 Editor Theme: "WayCode Light" dropdown selector
     - ⚡ AI Model: "Gemini 2.5 Pro" dropdown selector
     - </> Code Style: "Prettier" dropdown selector
     - 🔄 Auto Deploy: Toggle switch (ON/OFF with blue accent)
   - Each row: icon, label text, control right-aligned
   - Divider lines between rows
   - All preferences saved to user.preferences JSONB via PATCH /api/settings

3. **Integrations Section:**
   - Section header: "INTEGRATIONS"
   - Integration rows:
     - GitHub: GitHub icon + "GitHub" label + "Connected" green badge (right side)
     - Supabase: Supabase icon + "Supabase" label + "Connected" green badge
     - Redis Cloud: Redis icon + "Redis Cloud" label + "Connected" green badge
   - Each connected integration shows green dot + "Connected" text
   - Disconnected shows red dot + "Disconnected" + "Connect" button
   - Fetch from GET /api/settings/integrations

4. **About Section:**
   - Section header: "ABOUT"
   - Version: "1.0.0" (right-aligned)
   - "Join Discord Community" link with external link icon
   - "Terms of Service" link
   - "Privacy Policy" link

5. **Danger Zone (bottom):**
   - "Sign Out" button (red text, outlined)
   - Calls signOut from useAuth hook
   - Confirmation dialog before signing out

6. **Usage Stats Card** (below profile):
   - Credits: circular progress or linear bar, "2,450 / 5,000"
   - Storage: linear bar, "4.2 GB / 10 GB"
   - Fetch from GET /api/settings/usage

Match the exact layout from @[ui.png] panel "3. SETTINGS & PROFILE" — clean grouped rows with consistent spacing.
```

---

### PROMPT 15: Notification System & In-App Feed

```
Build the notification system with in-app notification feed, bell icon integration, and notification preferences.

Refer to @[prd.md] Section 8.9 (Notification Features), Section 14 (Notification System).

1. **Notification Bell Integration** (update TopBar):
   - Bell icon with red badge showing unread count
   - Tap bell → opens Notification Sheet/Modal
   - Badge disappears when count is 0
   - Fetch unread count from GET /api/notifications?unread_only=true

2. **Notification Feed Sheet** (`src/components/features/NotificationSheet.tsx`):
   - Bottom sheet or full-page overlay
   - Header: "Notifications" with "Mark all read" text button
   - Notification cards list:
     - Icon per type:
       - ✅ task_complete: green checkmark
       - ❌ task_failed: red X
       - 🚀 deploy_live: rocket icon
       - 👀 approval_needed: eye icon
     - Title (bold): "Task TASK-4821 Completed"
     - Body (muted): "Admin Dashboard has been built and pushed to GitHub."
     - Timestamp: "2m ago"
     - Unread indicator: blue dot on left
     - Tap notification → navigate to relevant task (/tasks/[id])
     - Swipe to mark as read (or tap to auto-mark)
   - Empty state: "No notifications yet. We'll alert you when tasks complete!"
   - Infinite scroll pagination

3. **Notification Preferences** (add to Settings page):
   - Section under existing preferences:
     - "NOTIFICATION CHANNELS" header
     - WhatsApp Alerts: Toggle (on/off)
     - Push Notifications: Toggle (on/off)
     - In-App Notifications: Toggle (always on, grayed out)
   - Save to user.preferences JSONB

4. **Server-side Notification Creator** (`src/lib/notifications.ts`):
   - createNotification(userId, taskId, type, title, body, channel) function
   - Inserts into Supabase notifications table
   - This will be called by the task worker when tasks complete/fail
   - Also creates an audit_log entry

5. **Real-time Notification Updates:**
   - Subscribe to Supabase Realtime on notifications table for current user
   - When new notification arrives:
     - Increment bell badge count
     - If notification sheet is open, prepend the new notification
     - Play subtle sound/haptic (if browser supports)

6. **Notification Toast Component** (`src/components/ui/Toast.tsx`):
   - Slide-in toast from top for real-time notifications
   - Shows notification title and preview body
   - Auto-dismiss after 5 seconds
   - Tap to navigate to task
   - Dismiss button (X)
```

---

### PROMPT 16: Task Worker Simulation & Pipeline Engine

```
Build the server-side task execution pipeline that simulates the AI agent workflow. This is the core engine that processes queued tasks.

Refer to @[prd.md] Section 9.1 (9-Stage Workflow), Section 8.5 (AI Agent Execution).

For v1, we'll simulate the AI agent execution pipeline using a server-side worker that can be triggered via API. The actual LLM integration will be connected later.

1. **Task Worker Engine** (`src/lib/worker/taskWorker.ts`):
   Create a task processing pipeline function that:
   
   a. **Claims a task:** Takes a task_id, updates status to 'processing'
   
   b. **Executes the 9-stage pipeline sequentially:**
      Each stage updates the task in Supabase with:
      - status field
      - current_phase field
      - progress_percent (0-100)
      - execution_logs (append new log entries)
   
   Stage progression:
   ```
   Stage 01 - Intent Parsing (0-10%):
     Log: "Parsing intent prompt..."
     Log: "Repository target: {repo_name}"
     Log: "Branch: {target_branch}"
     Log: "✓ Intent parsed successfully"
   
   Stage 02 - Auth Verification (10-15%):
     Log: "Verifying repository access..."
     Log: "OAuth scope: repo (read/write)"
     Log: "✓ Access verified"
   
   Stage 03 - Queue Confirmation (15-20%):
     Log: "Task {task_code} queued for execution"
     Log: "Worker claimed task"
   
   Stage 04 - Agent Planning (20-40%):
     Log: "Invoking LLM agent (Gemini 2.5 Pro)..."
     Log: "Analyzing project structure..."
     Log: "Building dependency graph..."
     Log: "Generating modification plan..."
     Log: "✓ Plan: 3 files to modify, 1 file to create"
   
   Stage 05 - Sandbox Execution (40-60%):
     Log: "Cloning repository into sandbox..."
     Log: "$ git clone {repo_url}"
     Log: "$ git checkout -b agent/{task_code}"
     Log: "Applying code modifications..."
     Log: "✓ 4 files modified"
   
   Stage 06 - Verification (60-75%):
     Log: "Running build verification..."
     Log: "$ npm run build"
     Log: "Build output: Compiled successfully"
     Log: "$ npm test"
     Log: "Tests: 12 passed, 0 failed"
     Log: "✓ All verification checks passed"
   
   Stage 07 - Git Push (75-85%):
     Log: "Creating commit..."
     Log: '$ git commit -m "feat: {intent_summary}"'
     Log: "$ git push origin agent/{task_code}"
     Log: "✓ Pushed to remote"
     Update: commit_sha, feature_branch
   
   Stage 08 - Deployment (85-95%):
     Log: "CI/CD webhook triggered..."
     Log: "Vercel deployment started..."
     Log: "Building preview..."
     Log: "✓ Deployed to https://{repo_name}.vercel.app"
     Update: deployment_url, deployment_status = 'live'
   
   Stage 09 - Notification (95-100%):
     Log: "Dispatching notifications..."
     Log: "✓ In-app notification sent"
     Log: "✓ Task {task_code} completed successfully"
     Update: status = 'completed', completed_at = now()
   ```
   
   Each stage has a simulated delay (1-3 seconds per stage) to mimic real execution.
   Between stages, the Supabase row is updated so Realtime pushes updates to the client.

2. **Worker API Route** (`src/app/api/worker/process/route.ts` - POST):
   - Accepts: { task_id }
   - Calls taskWorker(task_id)
   - Protected: Only callable from server-side (add API key check or internal-only guard)
   - Runs asynchronously (don't await the full pipeline — start it and return)

3. **Auto-trigger Worker:**
   After task creation (POST /api/tasks), automatically call the worker endpoint to start processing.
   This simulates the Redis queue → worker claim flow.

4. **Generate Sample Diff:**
   Create a function that generates a realistic-looking unified diff based on the intent prompt.
   - Generates fake file paths based on the repo name
   - Creates realistic code additions (React components, API routes, etc.)
   - Stores in task.diff_content and task.diff_summary
   - This will be shown in the Diff Review screen

5. **Error Handling:**
   - If any stage fails, update status to 'failed' with error_message
   - Create a notification with type 'task_failed'
   - Log the error in execution_logs
```

---

### PROMPT 17: Notifications Feed Page

```
Build a dedicated Notifications page accessible from the bottom tab bar, and add the notification bell sheet to the TopBar.

Refer to @[prd.md] Section 8.9 (Notification Features).

Create `src/app/(dashboard)/notifications/page.tsx`:

1. **Notifications Page:**
   - Page title: "Notifications"
   - "Mark all as read" button in header
   - Filter tabs: All, Unread
   - Notification list with date group headers ("Today", "Yesterday", "This Week")
   - Each notification card:
     - Type icon with colored background circle
     - Title text (bold)
     - Body text preview (2 lines max, truncated)
     - Timestamp (relative: "2m ago")
     - Unread: left blue border accent
     - Read: normal border, slightly faded
   - Tap → navigate to the related task
   - Tap and hold → "Mark as read" option
   - Pull-to-refresh

2. **Update BottomTabBar:**
   - Change the 5th tab from "Settings" to show both Notifications and Settings:
     - Option A: Keep 5 tabs as: Chat, Tasks, Repos, Deploy, Settings
     - Add notification access through the TopBar bell icon instead
   - Show unread badge count on the bell icon in TopBar

3. **Create test notifications:**
   - Add a utility function to seed sample notifications for testing
   - Notifications for different types: task_complete, task_failed, deploy_live, approval_needed
   - Call this after task worker completes to generate real notifications
```

---

## Phase 04 — Validation (Weeks 10–12)

### PROMPT 18: PWA Configuration & Offline Support

```
Configure full PWA capabilities for WayCode — installability, offline support, and mobile optimization.

Refer to @[prd.md] Section 8.11 (PWA Capabilities).

1. **Web App Manifest** (update `public/manifest.json`):
   - name: "WayCode"
   - short_name: "WayCode"
   - description: "AI-Powered Development, Deployed to Production."
   - start_url: "/chat"
   - display: "standalone"
   - background_color: "#0F172A"
   - theme_color: "#0073E6"
   - orientation: "portrait"
   - icons: Multiple sizes (72, 96, 128, 144, 152, 192, 384, 512) — generate from logo.svg
   - screenshots for app store display

2. **Service Worker** (via next-pwa or @serwist/next):
   - Cache static assets (JS, CSS, fonts, images)
   - Cache API responses with stale-while-revalidate strategy
   - Offline fallback page with WayCode branding:
     - Logo, "You're offline" message
     - "Your tasks continue running on the cloud."
     - "Connect to the internet to sync your latest results."
   - Cache the app shell for instant loading
   - Runtime caching for Supabase API calls

3. **Mobile Meta Tags** (update layout.tsx):
   - Apple touch icon
   - Apple mobile web app capable
   - Apple status bar style (black-translucent for immersive)
   - Viewport: width=device-width, initial-scale=1, viewport-fit=cover
   - Theme color meta tag

4. **Install Prompt:**
   - Detect beforeinstallprompt event
   - Show a custom install banner on the Chat page:
     - "Install WayCode for the best experience"
     - "Install" button + "Maybe later" dismiss
   - Only show once, remember dismissal in localStorage

5. **Splash Screen:**
   - Apple splash screen images for different device sizes
   - WayCode logo centered on dark background

6. **Offline Detection UI:**
   - Banner component that appears when offline:
     - Yellow/amber background
     - "You're offline. Tasks continue in the cloud."
     - Auto-dismiss when back online with "Reconnected ✓" green flash
```

---

### PROMPT 19: Dark Mode Implementation

```
Implement complete dark mode support for WayCode.

Refer to @[prd.md] Section 10.1 (Color Palette), and @[ui.png] — note the architecture screens show a dark theme.

1. **Dark Mode Color Tokens:**
   Add dark variants to Tailwind config and CSS variables:
   - Background: #0B0B0F (dark), #111114 (surface)
   - Surface: #1A1A1F (cards), #222228 (elevated)
   - Text: #F5F5F7 (primary), #8E8E93 (muted)
   - Border: rgba(255, 255, 255, 0.08)
   - Maintain the same Primary (#0073E6), Success, Warning, Danger colors

2. **Theme Provider** (`src/components/providers/ThemeProvider.tsx`):
   - Use next-themes for theme management
   - Support: 'light', 'dark', 'system'
   - Persist theme choice in localStorage and user.preferences
   - Apply dark class to <html> element
   - Sync with Settings page Appearance toggle

3. **Update All Components for Dark Mode:**
   - All Card components: dark:bg-neutral-800 dark:border-neutral-700
   - TopBar and BottomTabBar: dark:bg-neutral-900/90
   - Text colors: dark:text-white, dark:text-neutral-400
   - Input fields: dark:bg-neutral-800 dark:border-neutral-600
   - Terminal viewer: Already dark, no changes needed
   - Badges: Adjust background opacity for dark surfaces
   - SlideOutNav: dark:bg-neutral-900
   - Diff viewer: dark:bg-neutral-900 for code blocks

4. **System Preference Detection:**
   - Respect prefers-color-scheme media query when set to 'system'
   - Smooth transition between themes (300ms transition on background-color)

5. **Dark Mode Splash Screen:**
   - The login/splash screen already uses dark theme — ensure consistency
```

---

### PROMPT 20: Onboarding & Empty States

```
Add user onboarding flow and polished empty states across all screens.

Refer to @[prd.md] Section 4 (Target Users), and general UX best practices.

1. **First-Time Onboarding Flow:**
   After first GitHub OAuth login, show a 3-step onboarding:
   
   Step 1 — Welcome:
   - "Welcome to WayCode! 🎉"
   - "Build from anywhere using AI agents."
   - WayCode logo animation
   - "Get Started" button
   
   Step 2 — Select Repository:
   - "Choose a repository to start building"
   - Show list of synced GitHub repos
   - User taps to select their first repo
   - "Continue" button
   
   Step 3 — First Intent:
   - "Try your first prompt!"
   - Pre-filled example: "Add a responsive navbar with dark mode support"
   - "Send" button to create first task
   - "Skip" link to go to dashboard
   
   - Store onboarding_completed in user.preferences
   - Only show once

2. **Empty States for All Screens:**
   
   Chat (no tasks):
   - Sparkle illustration
   - "Ready to build something amazing?"
   - "Type your first intent above to get started."
   
   Tasks (no tasks):
   - Clipboard illustration
   - "No tasks yet"
   - "Submit an intent from the Chat screen to create your first task."
   
   Repos (no repos):
   - Folder illustration
   - "No repositories connected"
   - "Sign in with GitHub to sync your repos." (if not connected)
   - "Sync Repositories" button
   
   Deploy (no deployments):
   - Rocket illustration
   - "No deployments yet"
   - "Approve a completed task to trigger your first deployment."
   
   Notifications (no notifications):
   - Bell illustration
   - "All caught up! 🎉"
   - "We'll notify you when tasks complete or need attention."

3. **Loading Skeletons:**
   - Add shimmer/pulse skeleton loaders for all list screens
   - Skeleton matches the actual card layout (height, padding, structure)
   - Show for minimum 300ms to avoid flash

4. **Error States:**
   - Generic error component:
     - "Something went wrong"
     - Error message (human readable)
     - "Try Again" button
   - Network error: "Unable to connect. Check your internet and try again."
   - 404: "Page not found. Let's get you back home." with link to /chat
```

---

### PROMPT 21: Performance Optimization & Polish

```
Optimize WayCode for production-grade performance, smooth animations, and premium feel.

Refer to @[prd.md] Section 10.9 (Motion Tokens), and performance targets.

1. **Micro-Animations:**
   - Page transitions: Subtle fade + slide (150ms)
   - Card interactions: Scale on press (0.98), lift on hover (translateY -2px)
   - Status badge: Pulse animation for "Running" status
   - Send button: Subtle scale bounce on tap
   - Task completion: Confetti or checkmark burst animation
   - SlideOutNav: Smooth spring animation (cubic-bezier(0.4, 0, 0.2, 1))
   - Tab switches: Content fade transition
   - Toast notifications: Slide-in from top with spring physics
   - Progress ring: Smooth counter animation for percentage
   - Bottom tab: Active icon scale + color transition

2. **Performance Optimizations:**
   - Image optimization: Use next/image for all images, WebP format
   - Font optimization: Inter with display=swap, preload critical weights (400, 600, 700)
   - Code splitting: Dynamic imports for heavy components (DiffViewer, Terminal)
   - Prefetching: Prefetch adjacent pages on hover
   - API call deduplication: Use SWR or React Query for data fetching with caching
   - Debounce search inputs (300ms)
   - Virtualize long lists (tasks, notifications) with react-window or similar
   - Bundle analysis: Ensure initial JS bundle < 200KB gzipped

3. **Touch Optimizations:**
   - Minimum touch target: 44px × 44px
   - Haptic feedback on button press (if Vibration API available)
   - Pull-to-refresh on list screens
   - Swipe gestures: Left swipe to delete/dismiss, right swipe to mark read
   - Overscroll bounce effect
   - Prevent double-tap zoom (touch-action: manipulation)

4. **Accessibility:**
   - All interactive elements focusable with visible focus rings
   - ARIA labels for icon-only buttons
   - Screen reader announcements for status changes
   - Reduced motion support: prefers-reduced-motion disables animations
   - Color contrast: All text meets WCAG AA (4.5:1 ratio minimum)
   - Keyboard navigation for all interactive elements

5. **SEO & Meta:**
   - OpenGraph meta tags for sharing
   - Title: "WayCode — AI-Powered Mobile Development Gateway"
   - Description: "Build, deploy, and ship production code from your phone."
   - Favicon from existing logo.svg (generate .ico and .png versions)
```

---

### PROMPT 22: WhatsApp Notification Integration

```
Integrate WhatsApp Cloud API for sending task completion notifications to the developer's mobile.

Refer to @[prd.md] Section 14 (Notification System), Section 8.9 (Notification Features).

1. **WhatsApp Configuration:**
   - Add environment variables:
     - WHATSAPP_API_TOKEN (Meta Business API token)
     - WHATSAPP_PHONE_NUMBER_ID (Business phone number ID)
     - WHATSAPP_VERIFY_TOKEN (Webhook verification token)
   - Create `src/lib/notifications/whatsapp.ts`:
     - sendWhatsAppMessage(phoneNumber, templateName, templateParams) function
     - Uses Meta's WhatsApp Cloud API (graph.facebook.com/v18.0)
     - Template messages for:
       a. task_completed: "✅ Task {task_code} completed! {task_name} has been built and pushed. View: {deployment_url}"
       b. task_failed: "❌ Task {task_code} failed. {error_summary}. Open WayCode to retry."
       c. deploy_live: "🚀 Deployment live! {repo_name} deployed to {deployment_url}"

2. **User Phone Number Management:**
   - Add phone_number field to users table (migration)
   - Add "WhatsApp Number" input in Settings page under Notifications section
   - Phone number with country code selector
   - Verification flow: Send OTP → Verify → Save

3. **Notification Dispatcher Update** (update `src/lib/notifications.ts`):
   - After creating in-app notification, also:
     - Check user preferences for whatsapp_enabled
     - If enabled and phone_number exists, call sendWhatsAppMessage
     - Log delivery status to notification record

4. **Webhook Handler** (`src/app/api/webhooks/whatsapp/route.ts`):
   - GET: Verification endpoint for Meta webhook setup
   - POST: Handle delivery receipts and read receipts
   - Update notification.sent_at when delivered

5. **Fallback Logic:**
   - If WhatsApp fails (rate limit, invalid number): Fall back to in-app notification only
   - Log error but don't fail the task pipeline
```

---

### PROMPT 23: CI/CD Webhook & Deployment Automation

```
Implement the CI/CD deployment automation pipeline with Vercel webhook integration.

Refer to @[prd.md] Section 8.8 (Deployment Features), Section 15 (Deployment Architecture).

1. **Vercel Webhook Handler** (`src/app/api/webhooks/vercel/route.ts`):
   - POST: Handle Vercel deployment webhooks
   - Verify webhook signature (VERCEL_WEBHOOK_SECRET)
   - Parse deployment events:
     - deployment.created → Update task deployment_status = 'building'
     - deployment.succeeded → Update deployment_status = 'live', set deployment_url
     - deployment.failed → Update deployment_status = 'failed'
     - deployment.cancelled → Update deployment_status = 'failed'
   - Create notification on deployment success/failure
   - Update task progress and logs

2. **GitHub Webhook Handler** (`src/app/api/webhooks/github/route.ts`):
   - POST: Handle GitHub push events and PR events
   - Verify webhook signature (GITHUB_WEBHOOK_SECRET)
   - On push event from agent branch:
     - Log push confirmation to task execution_logs
     - Trigger CI/CD status update
   - On PR creation:
     - Log PR URL to task
     - Update task with PR link

3. **Deployment Trigger Service** (`src/lib/deployment/trigger.ts`):
   - triggerDeployment(taskId) function:
     - Called when task is approved
     - Uses Vercel API to create a new deployment
     - Or triggers GitHub Actions workflow via API
     - Updates task status to 'deploying'
   - getDeploymentStatus(deploymentId) function:
     - Poll or webhook-based status check

4. **Environment Variables:**
   - VERCEL_API_TOKEN
   - VERCEL_TEAM_ID (optional)
   - VERCEL_WEBHOOK_SECRET
   - GITHUB_WEBHOOK_SECRET

5. **Update Task Worker:**
   - In Stage 08 (Deployment), instead of simulation:
     - Call triggerDeployment if auto_deploy is enabled in user preferences
     - If auto_deploy is disabled, set task to 'completed' awaiting manual approval
     - On approval, then trigger deployment
```

---

### PROMPT 24: Final Polish, Testing & Production Build

```
Final production preparation — comprehensive testing, error boundary setup, and build optimization.

Refer to @[prd.md] Section 16 (Success Metrics), Section 18 (Risks & Mitigations).

1. **Error Boundaries:**
   - Global error boundary (`src/app/error.tsx`) — catches unhandled errors
     - Shows branded error page with WayCode logo
     - "Something went wrong" message
     - "Try Again" button that resets the error
     - "Go Home" link
   - Page-level error boundaries for each route segment
   - Not-found page (`src/app/not-found.tsx`) — branded 404

2. **Loading States:**
   - Global loading (`src/app/loading.tsx`) — WayCode logo pulse animation
   - Page-level loading for each route segment
   - Suspense boundaries around dynamic components

3. **Data Validation:**
   - Add Zod schemas for all API request/response validation:
     - createTaskSchema: validate intent_prompt (non-empty), repository_id (UUID)
     - updateSettingsSchema: validate preferences shape
     - All API routes validate input before processing
   - Client-side form validation with error messages

4. **Security Hardening:**
   - Rate limiting on API routes (using upstash/ratelimit or custom):
     - Auth endpoints: 5 req/min
     - Task creation: 10 req/min
     - General API: 60 req/min
   - CORS configuration in next.config.js
   - Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
   - CSP (Content Security Policy) headers
   - Input sanitization on all user inputs

5. **Build Optimization:**
   - Run `next build` and fix all build errors
   - Ensure no TypeScript errors (strict mode)
   - Ensure no ESLint warnings
   - Run Lighthouse audit — target score > 90 for all categories
   - Bundle size analysis — identify and tree-shake unused dependencies
   - Verify PWA installability in Chrome DevTools

6. **Environment Configuration:**
   - Create .env.production with all required variables (placeholders)
   - Document all environment variables in README.md
   - Verify Supabase RLS policies work correctly in production mode

7. **README Update:**
   - Update the existing README.md with:
     - Updated project structure
     - Full setup instructions (clone, install, env, run)
     - Supabase setup guide
     - Deployment instructions (Vercel)
     - Environment variables reference table
     - Screenshots of key screens

8. **Smoke Test Checklist:**
   Test each user flow end-to-end:
   - [ ] GitHub OAuth login → redirect to /chat
   - [ ] Repos sync and display in slide-out nav
   - [ ] Submit intent → task created → appears in tasks list
   - [ ] Task progress updates in real-time on task detail page
   - [ ] Terminal logs stream during task execution
   - [ ] Diff viewer shows generated diff after completion
   - [ ] Approve & Deploy triggers deployment flow
   - [ ] Notifications appear in bell feed
   - [ ] Settings save and persist across sessions
   - [ ] Dark mode toggle works correctly
   - [ ] Offline banner appears when disconnected
   - [ ] PWA installable from mobile browser
   - [ ] All screens responsive on 320px to 1024px+ widths
```

---

## Quick Reference: Prompt Execution Order

| # | Prompt | Phase | Est. Time |
|:--|:---|:---|:---|
| 01 | Project Scaffold & Next.js Init | Foundation | 30 min |
| 02 | Design System & Tailwind Config | Foundation | 45 min |
| 03 | Supabase Schema & RLS Setup | Foundation | 30 min |
| 04 | GitHub OAuth Auth System | Foundation | 45 min |
| 05 | App Shell — Layout & Navigation | Foundation | 60 min |
| 06 | Chat / Workspace Screen | Communication | 45 min |
| 07 | Repository Management Screens | Communication | 45 min |
| 08 | Intent Prompting & Task Creation | Communication | 45 min |
| 09 | Tasks List & Task Detail Screens | Communication | 60 min |
| 10 | WebSocket & Real-Time Updates | Communication | 45 min |
| 11 | API Routes (Repos, Tasks, etc.) | Communication | 45 min |
| 12 | Diff Review & Approval Screen | Intelligence | 45 min |
| 13 | Deployment Status Screen | Intelligence | 30 min |
| 14 | Settings & Profile Screen | Intelligence | 30 min |
| 15 | Notification System & Feed | Intelligence | 45 min |
| 16 | Task Worker & Pipeline Engine | Intelligence | 60 min |
| 17 | Notifications Feed Page | Intelligence | 20 min |
| 18 | PWA Config & Offline Support | Validation | 30 min |
| 19 | Dark Mode Implementation | Validation | 30 min |
| 20 | Onboarding & Empty States | Validation | 30 min |
| 21 | Performance & Polish | Validation | 45 min |
| 22 | WhatsApp Notification | Validation | 30 min |
| 23 | CI/CD & Deployment Automation | Validation | 30 min |
| 24 | Final Polish & Production Build | Validation | 45 min |
|    | **Total Estimated** |  | **~15 hours** |

---

> **Ready to start?** Copy **Prompt 01** and paste it into Antigravity to begin building WayCode! 🚀
