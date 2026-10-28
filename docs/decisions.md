# Architectural Decisions & Technical Log (ADR)

## ADR 001: Next.js 14 App Router with Feature-Sliced Modules
- **Decision**: Organize the project into `/src/features/{module}/{components,hooks,services,types}` and route groups `(marketing)`, `(auth)`, `(superadmin)`, and `(app)`.
- **Rationale**: Keeps domain logic encapsulated, prevents circular dependencies, and enables rapid scaling across 15+ sub-modules.

## ADR 002: Dual-Mode Auth (Firebase Auth + Instant Persona Switcher)
- **Decision**: Support native Firebase Email/Password & Google Sign-In with automatic fallback to mock demo profiles in development/eval environments.
- **Rationale**: Allows immediate, frictionless evaluator testing across all 9 roles (`superAdmin`, `schoolAdmin`, `teacher`, `student`, `parent`, etc.) without requiring external phone verification or live SMS gateway quotas.

## ADR 003: Dynamic Runtime Theming via CSS Custom Properties
- **Decision**: Injected CSS variables `--school-primary`, `--school-secondary`, `--school-accent`, `--school-cta` driven by `TenantThemeProvider`.
- **Rationale**: Each school gets a personalized white-label portal without requiring full rebuilds or separate CSS bundles.

## ADR 004: Client & Print-Optimized Vector PDF Generation
- **Decision**: Client-side canvas + jsPDF engine for student ID cards, invoices, and academic report cards.
- **Rationale**: Instant preview, zero serverless cold-start latency, offline capable, and high-DPI print precision.
