# WayCode Development Rules & Directives

## Mandatory Execution Guidelines
1. **Quality & Functionality Verification**:
   - Every feature must be fully functional, dynamic, and complete. No placeholders or mock failures.
   - Before completing any task/prompt, run `npm run lint` and `npm run build` to verify zero lint errors and clean production compilation.
2. **Automated Git Workflow**:
   - After verifying clean build and linting, automatically stage, commit, and push changes to remote repositories:
     ```bash
     git add .
     git commit -m "<descriptive message>"
     git push origin main
     git push roadmap main
     ```
3. **Branding & Assets**:
   - Use `images/logo.svg` as the primary logo, favicon, and brand icon across the PWA application.
4. **UI Components & Architecture**:
   - Use `shadcn/ui` components for building interfaces rapidly with custom Tailwind tokens matching PRD specs.
   - Maintain a clean feature-based folder structure under `src/`.
