# CLI Operations and Team Workflows

## Core operational commands

- `just --list` for discoverability and help
- `just --summary` for concise recipe inventory
- `just --choose` for interactive selection where supported
- `just --fmt` / dump for normalization and review

## CI and automation patterns

- Keep CI entry recipes explicit (`ci`, `check`, `test`, `build`).
- Keep recipes deterministic and non-interactive in CI contexts.
- Prefer recipe-level flags/params over ad hoc shell parsing.

## Team ergonomics

- Keep default recipe useful for newcomers.
- Maintain short, descriptive docs comments.
- Use canonical recipes and aliases only for migration.
- Review and prune stale recipes regularly.

## Helpful manual topics

- Command-line options
- Setting command-line options with environment variables
- Selecting recipes with an interactive chooser
- Formatting and dumping justfiles
- Re-running recipes when files change
- Parallelism
- Shell completion scripts
- Global and user justfiles
