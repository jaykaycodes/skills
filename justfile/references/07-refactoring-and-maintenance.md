# Refactoring and Canonicalization Playbook

Use this loop whenever a justfile starts to sprawl.

## 1) Inventory

- List public recipes and their intent.
- Find duplicates that differ only by flags/paths.
- Identify private implementation details leaking into root.

## 2) Consolidate

- Merge near-duplicate recipes into parameterized recipes.
- Replace wrappers with one canonical entry point where possible.
- Keep aliases only for backwards compatibility transitions.

## 3) Modularize

- Move concern-local workflows to colocated module justfiles.
- Move infrequently changed internals to private helper modules (for example `.config/private.just`).
- Keep root justfile as a curated command surface.

## 4) Document

- Ensure all public recipes have `#` docs comments.
- Update comments when arguments/behavior change.
- Keep docs concise and action-oriented.

## 5) Verify

- Run `just --list` from root and confirm readability.
- Smoke-test core paths (`dev`, `check`, `test`, `build`).
- Confirm no broken module references.

## Migration heuristics

- Prefer additive transitions first, then remove deprecated names.
- When removing recipes, leave a short migration note in team docs/changelog.
- Avoid introducing clever abstractions that hide common workflows.
