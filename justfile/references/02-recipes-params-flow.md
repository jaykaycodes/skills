# Recipes, Params, Dependencies, and Flow

Use recipe features to consolidate workflows and avoid copy/paste variants.

## Parameters and options

- Prefer parameterized recipes over many fixed variants.
- Use defaults for common paths and flags.
- Use variadics (`*args`) for pass-through command flags.
- Use recipe options/flags where explicit toggles improve clarity.

Example:

```just
# Lint and typecheck selected paths (or defaults)
check *paths:
  vp check {{ if paths == '' { 'apps/ packages/' } else { paths } }}
```

## Validation and guardrails

- Validate required inputs early and fail with actionable errors.
- Use conditionals to gate dangerous or context-specific behavior.
- Require confirmation on risky operations where appropriate.

## Dependencies and ordering

- Use dependencies for setup/preflight tasks.
- Keep dependency graphs shallow and readable.
- Use explicit in-recipe `just <recipe>` only when ordering is contextual.

## Control flow

- Prefer just expressions for simple branches.
- Move complex branching into script/shebang recipes or module-private helpers.
- Keep command output and failure modes obvious.

## Helpful manual topics

- Recipe parameters
- Recipe flags and options
- Dependencies
- Running recipes at end / middle of a recipe
- Conditional expressions
- Stopping execution with error
- Requiring confirmation for recipes
