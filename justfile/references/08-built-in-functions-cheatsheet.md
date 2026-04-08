# Built-in Functions Cheatsheet

Primary source: <https://just.systems/man/en/print.html> (Built-in functions section and subsections)

Use this file as a quick lookup for when to use `just` built-ins instead of shelling out.

## General guidance

- Prefer built-ins over shell commands when an equivalent exists.
- Keep expressions readable; extract repeated expressions into variables.
- Use shell commands only when built-ins cannot express the logic cleanly.

## High-value categories

## System and invocation context

Use these to avoid hardcoded assumptions:

- invocation directory
- justfile directory/path
- source/module directory/path
- just executable path
- process info (PID and related metadata)

Typical use:

- compute repo-relative paths robustly
- support running from subdirectories
- make module helpers location-independent

## Environment variables

Prefer environment helpers for explicit env behavior:

- get env with defaults or validation
- set/unset behavior via expressions and settings
- bridge env to recipe parameters and back

Typical use:

- optional feature toggles
- required secrets/tooling paths
- CI/local behavior branching

## External commands and executables

Use command/executable helpers to:

- check if tooling exists before running recipes
- gate optional workflows with clear error messages
- avoid brittle `which`/`command -v` shell snippets everywhere

## Path and filesystem manipulation

Use path helpers for:

- joining paths safely
- canonicalizing/absolutizing paths
- extracting parent/basename/ext where needed
- checking filesystem state in expressions

Typical use:

- stable cross-module path calculations
- validating required files before execution

## String and case helpers

Use string helpers for:

- normalization (slug-ish or key formatting)
- safe recipe arg transformation
- consistent naming in generated artifacts

## Datetime, random, hashes, UUID, semver

Use these when you need deterministic/structured metadata in workflows:

- timestamping generated files
- generating IDs for ephemeral artifacts
- hashing content/input references
- semver-aware comparisons in release recipes

## Expression patterns

Prefer expression-level composition:

```just
# choose defaults based on invocation context
target := if env('CI', '') != '' { 'ci' } else { 'local' }
```

```just
# build reusable paths from directory helpers
artifacts := justfile_directory() + '/.artifacts'
```

## Anti-patterns

- Replacing every expression with shell one-liners.
- Recomputing complex paths inline many times.
- Hiding required env assumptions in opaque shell scripts.
- Using built-ins in clever but unreadable nested expressions.

## Related references

- [Settings, variables, functions, and expressions](03-settings-vars-expressions.md)
- [Modules, imports, and multi-justfile layout](04-modules-imports-layout.md)
- [Refactoring and canonicalization playbook](07-refactoring-and-maintenance.md)
