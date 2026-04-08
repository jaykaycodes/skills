---
name: justfile
description: Author and refactor `just` justfiles using current manual features and a modular project layout. Use when creating or editing `justfile`, designing task runners, improving recipe ergonomics, adding modules/imports, documenting recipes, or standardizing workflows in `just`.
---

# Justfile Skill

Build and maintain `just` task systems that are modern, documented, modular, and easy to operate.

Primary manual source: [Just Programmer's Manual](https://just.systems/man/en/print.html)

## What this skill enforces

Use these conventions by default unless the user explicitly requests otherwise:

1. First recipe in every top-level `justfile`:

```just
[private]
@default:
  JUST_LIST_SUBMODULES=true just --list
```

2. Document every user-facing recipe with `#` comments so it shows up in `just --list`.
3. Prefer recipe parameters, defaults, options, variadics, validations, and conditionals to avoid duplicate recipes.
4. Keep top-level `justfile` slim by moving private/misc implementation details into module files such as `.config/private.just`.
5. Use nested justfiles by concern (for example `apps/web/justfile`) and declare modules from the root justfile.
6. Continuously simplify and canonicalize workflows; remove overlapping recipes and normalize naming.

## Working mode

When asked to create or modify justfiles:

1. Read existing justfiles and modules first.
2. Preserve behavior, then improve structure and ergonomics.
3. Keep public API recipes stable when possible.
4. Add or improve help text for every public recipe.
5. Use module boundaries to hide churn-heavy internals.
6. Validate with `just --list` and representative recipe runs when feasible.

## Authoring checklist

- [ ] `@default` recipe exists and is first in top-level justfile
- [ ] public recipes are documented with `#` comments
- [ ] arguments/options are used instead of copy-pasted recipe variants
- [ ] complex/private commands live in module files
- [ ] root justfile delegates to concern-specific modules
- [ ] names are consistent, concise, and canonical
- [ ] commands are shell-safe and cross-platform aware when needed

## Modernization expectation

When touching any justfile, run a quick modernization pass so agents keep adopting current `just` capabilities instead of repeating older patterns. See:

- [Modern feature adoption checklist](references/10-modern-feature-adoption-checklist.md)

## Reference index

Keep this file slim. For details, follow the topic references:

- [Manual topic map](references/00-manual-map.md)
- [Foundation and style](references/01-foundation-and-style.md)
- [Recipes, params, dependencies, and flow](references/02-recipes-params-flow.md)
- [Settings, variables, functions, and expressions](references/03-settings-vars-expressions.md)
- [Modules, imports, and multi-justfile layout](references/04-modules-imports-layout.md)
- [Shelling, scripts, and platform behavior](references/05-scripting-shell-cross-platform.md)
- [CLI operations and team workflows](references/06-cli-and-operations.md)
- [Refactoring and canonicalization playbook](references/07-refactoring-and-maintenance.md)
- [Built-in functions cheatsheet](references/08-built-in-functions-cheatsheet.md)
- [Attributes, groups, and visibility](references/09-attributes-groups-and-visibility.md)
- [Modern feature adoption checklist](references/10-modern-feature-adoption-checklist.md)

## Output expectations for agent edits

When producing or editing justfiles, the agent should:

- Keep comments close to the recipes they document.
- Prefer clear delegation (`just module::recipe`) over deeply nested shell logic.
- Extract reusable internals into private module recipes.
- Consolidate many tiny wrappers into one parameterized recipe where it improves usability.
- Call out any tradeoffs (readability vs indirection, portability vs shell features).
