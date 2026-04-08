# Manual Topic Map (`just` print manual)

Primary source: <https://just.systems/man/en/print.html>

This map helps the agent quickly jump from user intent to manual sections.

## Core authoring

- Default recipe, listing, aliases, docs comments
- Settings and table of settings
- Variables, assignments, expressions, strings, substitutions
- Attributes, groups, private/quiet recipes

## Recipe execution model

- Parameters (positional, variadic, defaults)
- Dependencies and execution ordering
- Running recipes before/after/in the middle
- Conditional expressions and error/exit behaviors

## Shell and scripts

- Shebang recipes
- Script recipes and temp files
- Safer bash shebang patterns
- Configuring shell and shell arguments
- Windows shell differences

## Composition and scaling

- Imports and modules
- Nested justfiles and invoking across directories
- Hiding justfiles
- Fallback to parent justfiles

## Operations and CLI

- Command-line options and env-variable equivalents
- Formatting and dumping justfiles
- Interactive chooser
- Watching/rerunning workflows
- Parallelism notes

## Help and discoverability

- `just --list` behavior
- Documentation comments and grouping
- Private recipes and visibility
- Naming and canonical workflow curation

## Related reference files

- [Foundation and style](01-foundation-and-style.md)
- [Recipes, params, dependencies, and flow](02-recipes-params-flow.md)
- [Settings, variables, functions, and expressions](03-settings-vars-expressions.md)
- [Modules, imports, and multi-justfile layout](04-modules-imports-layout.md)
- [Shelling, scripts, and platform behavior](05-scripting-shell-cross-platform.md)
- [CLI operations and team workflows](06-cli-and-operations.md)
- [Refactoring and canonicalization playbook](07-refactoring-and-maintenance.md)
