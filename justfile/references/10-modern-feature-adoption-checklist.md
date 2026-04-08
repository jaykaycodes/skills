# Modern Feature Adoption Checklist

Primary source: <https://just.systems/man/en/print.html>

Use this checklist whenever creating or refactoring justfiles so agents do not stick to legacy patterns.

## Adoption pass

- [ ] Default recipe is private and lists commands (`JUST_LIST_SUBMODULES=true just --list`)
- [ ] Public recipes are documented with `#` comments
- [ ] Recipe groups are used to improve list readability where helpful
- [ ] Duplicate workflows are consolidated with parameters/defaults/variadics
- [ ] Conditional expressions replace brittle shell branching where practical
- [ ] Dependencies are explicit and minimal (no hidden ordering)
- [ ] Attributes are used intentionally (`[private]`, confirmation, quiet behavior)
- [ ] Complex logic moved to script/shebang or private module recipes
- [ ] Built-in functions are preferred over shell one-liners for paths/env/context
- [ ] Root justfile is slim and delegates to concern-local modules
- [ ] Churn-heavy internals are moved to a private helper file (for example `.config/private.just`)
- [ ] CLI ergonomics are verified (`just --list`, optional `--summary`, consistent names)

## Refactor heuristics

- If two recipes differ only by flags/paths, consolidate into one parameterized recipe.
- If a recipe body grows beyond quick scanning, extract private helper recipes.
- If a recipe is user-facing, make its comment answer: "When should I run this?"
- If a public recipe is obscure, either rename it or make it private.
- If module boundaries are unclear, organize by domain ownership and runtime context.

## Done criteria

- Public command palette is discoverable and stable.
- Internals are hidden, reusable, and easy to evolve.
- Recipe names and behavior are canonical for the team.
