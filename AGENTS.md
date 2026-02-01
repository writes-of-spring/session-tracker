# AGENTS

Guidance for coding agents working in this repository.

## Project basics
- Stack: Vite + React 19 + TypeScript + TanStack Router/Form + Tailwind CSS.
- Package manager: npm (lockfile: package-lock.json).
- Module system: ESM (`"type": "module"`).
- Path alias: `@/` -> `src/` (see `tsconfig.json`).
- Node: prefer Node 20+ (some deps require >=20).
- Codegen: TanStack Router generates `src/routeTree.gen.ts`.

## Commands
- Install deps: `npm install`
- Dev server: `npm run dev` (Vite on port 3000)
- Production build: `npm run build` (Vite build + `tsc` typecheck)
- Preview build: `npm run preview`
- Lint: `npm run lint` (oxlint)
- Lint + fix: `npm run lint:fix`
- Format: `npm run fmt` (oxfmt)
- Format check: `npm run fmt:check`

## Testing (Vitest)
- Run all tests (non-watch): `npm run test`
- Run a single test file: `npm run test -- --run src/path/to/file.test.tsx`
- Run tests matching a name: `npm run test -- --run -t "pattern"`
- Run a single test file in watch mode: `npx vitest src/path/to/file.test.tsx`
- Watch mode (all): `npx vitest`
- Coverage is not configured by default.

## Repo structure
- App entry: `src/main.tsx`.
- Routes: file-based under `src/routes/` (root in `src/routes/__root.tsx`).
- UI primitives: `src/components/ui/`.
- Form wrappers/hooks: `src/components/form/`.
- Shared utilities: `src/lib/`.
- Global styles/theme: `src/styles.css`.

## Naming and files
- Components are PascalCase (e.g., `Button`, `TextField`).
- UI component files use PascalCase (e.g., `src/components/ui/Button.tsx`).
- Form component files use kebab-case (e.g., `src/components/form/text-field.tsx`).
- Hooks use `useX` and are camelCase.
- Use `const` for options/lookup tables and suffix with `Options` if relevant.
- Route files follow TanStack Router file-based rules (`index.tsx`, `weekly.tsx`).

## Code style: general
- TypeScript strict mode; prefer explicit types when inference is unclear.
- Keep components small and single-purpose; prefer composition.
- Use `function` declarations for components and helpers (current style).
- Avoid default exports unless the file is a single component (existing pattern is mixed).
- Use `const` for values; avoid `let` unless reassigned.
- Keep boolean props prefixed with `is/has/should`.
- Prefer early returns and guard clauses over deep nesting.
- Keep DOM-manipulating helpers (e.g., CSV download) in route files or local utilities.

## Formatting (oxfmt)
- Semicolons are required.
- Imports are auto-sorted; do not hand-order.
- Import groups (oxfmt): builtin, external, internal (`@/`), parent, sibling, index, object, type.
- No blank lines between import groups (oxfmt will remove them).
- Tailwind class sorting/formatting is handled by oxfmt.
- Do not disable lint/format rules unless absolutely necessary.

## Lint rules (oxlint)
- `typescript/consistent-type-imports` is enforced.
- `noUnusedParameters` is enabled; prefix intentionally unused params with `_`.
- `noUnusedLocals` is disabled; still avoid unused locals.
- `noFallthroughCasesInSwitch` is enabled.
- `noUncheckedSideEffectImports` is enabled; keep side-effect imports intentional.

## Imports
- Use `import type` for type-only imports (enforced by oxlint).
- Prefer named imports from libraries; avoid namespace imports.
- Use the `@/` alias for internal modules instead of relative climbing.
- Keep side-effect imports (e.g., `"./styles.css"`) at the top of the file.
- Prefer explicit paths over barrel imports unless already established.

## TypeScript and types
- Use `as const` for literal arrays/options (see `modalityOptions`).
- Use `zod` for runtime validation; keep schema and types aligned.
- Avoid `any`; use `unknown` + narrowing when needed.
- Use `satisfies` when shaping configs without widening.
- Prefer `Record<...>` or mapped types over `object`.

## React patterns
- File-based routing uses `createFileRoute` in route files.
- Use `createRootRoute` in `src/routes/__root.tsx` for layout/root providers.
- Prefer React-ARIA Components for inputs; compose with Tailwind variants.
- Use `composeTailwindRenderProps` when a component accepts `className` render props.
- Keep hooks at top-level; no conditional hooks.
- Use `StrictMode` in `src/main.tsx` (already configured).

## Routing conventions
- Route components are named `Route` and exported as `createFileRoute(...)`.
- Use `Link` from `@tanstack/react-router` for navigation.
- Prefer `Outlet` for layout slots in `__root.tsx`.
- Let TanStack Router regenerate route tree; do not edit `routeTree.gen.ts`.

## Styling
- Tailwind CSS v4 with custom theme variables in `src/styles.css`.
- Prefer design tokens (`--color-*`, `--font-*`) already defined.
- Use `tv` (tailwind-variants) for reusable variants; see UI components.
- Use `twMerge` or `composeTailwindRenderProps` to merge classes safely.
- Avoid inline styles unless necessary for dynamic values.
- Keep accessibility styles from React-ARIA (focus ring) intact.
- Use `className` and `composeRenderProps` patterns used in UI components.

## Forms and validation
- Forms are built with TanStack React Form (`useAppForm`).
- Validation uses `zod` schemas; keep error messages user-friendly.
- Use `form.AppField` and provided field components (`TextField`, `Select`, etc.).
- Prefer declarative validation (`validators`) over manual checks in submit.
- When adding fields, update default values and schema together.
- Use `revalidateLogic()` to keep validation consistent on change.

## Error handling
- Validate external data with Zod before use.
- For optional values, normalize/trim before validation (`.trim()` pattern).
- Prefer explicit error messages on fields instead of silent failures.
- Avoid throwing in UI event handlers; surface errors in the form.
- Handle browser APIs carefully (e.g., revoke object URLs after use).

## Testing guidelines
- Use React Testing Library for component tests.
- Prefer user-facing assertions (text, role) over implementation details.
- Keep tests isolated; avoid relying on global state.
- Use `describe/it` from Vitest; avoid Jest globals not provided by Vitest.

## Generated files
- `src/routeTree.gen.ts` is auto-generated by TanStack Router.
- Do not edit generated files; update routes under `src/routes/` instead.
- Consider excluding generated files from lint/format if needed.

## Accessibility
- Use React-ARIA primitives (label, description, error slots) for inputs.
- Always provide labels for form fields (visible or via `aria-label`).
- Ensure interactive elements have focus styles.
- Ensure buttons and links have accessible names.

## Misc
- Fonts are loaded via Google Fonts in `src/styles.css`.
- Dark mode is not active; keep `color-scheme: light` unless adding a dark theme.
- Devtools are wired in `src/routes/__root.tsx`; keep them optional.

## Cursor/Copilot rules
- No `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md` found.
