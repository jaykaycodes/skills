# Modules, Imports, and Multi-Justfile Layout

## Recommended layout

Use a root `justfile` as the public entry point and module declaration hub:

- root `justfile` exposes canonical public recipes
- concern-local justfiles live near code (`apps/web/justfile`, `apps/api/justfile`)
- private helpers live in files like `.config/private.just`

## Composition patterns

- Use `mod` to include concern-specific justfiles.
- Delegate root recipes to module recipes (`just web::dev`).
- Keep private churn-heavy logic in module-private files.
- Use imports for shared blocks when module boundaries are not needed.

## Visibility and API design

- Public API should be small and memorable.
- Hide implementation recipes with `[private]`.
- Keep module names stable; avoid frequent renames.

## Nested workflows

- Prefer invoking from repo root for consistent UX.
- Allow module-local execution when team workflow benefits.
- Keep path assumptions explicit in comments.

## Helpful manual topics

- Modules
- Imports
- Invoking justfiles in other directories
- Hiding justfiles
- Fallback to parent justfiles
- Source/module directory built-ins
