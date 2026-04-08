# Attributes, Groups, and Visibility

Primary source: <https://just.systems/man/en/print.html> (Attributes, Groups, Private/Quiet recipes, docs comments, metadata)

Use this file to design a clean public command surface with internal implementation hidden.

## Public API design

- Treat root justfile recipes as user-facing API.
- Keep API small, memorable, and documented.
- Delegate implementation details to private/module recipes.

## Attributes

Use attributes intentionally:

- `[private]` for internals not meant to be called directly
- quiet/echo control attributes for clean UX
- confirmation-related attributes for risky operations
- metadata/doc-related attributes where supported

Prefer explicitness over attribute-heavy magic.

## Groups

Use groups to improve discoverability in list output:

- organize by user intent (`dev`, `check`, `test`, `build`, `release`, `meta`)
- keep group naming consistent across modules
- avoid over-grouping tiny one-off recipes

## Documentation comments

- Add `#` comments immediately above each public recipe.
- Keep comments action-oriented and concise.
- Include key parameter expectations in comments when non-obvious.

## Visibility strategy (recommended)

1. Root justfile:
   - curated public recipes
   - group tags for discoverability
   - mandatory default list recipe
2. Concern modules:
   - most implementation recipes
   - public module entry points if needed
3. Private helper module (for example `.config/private.just`):
   - low-level scripts
   - churn-heavy internals
   - non-user-facing orchestration

## Example pattern

```just
# Top-level command palette
[private]
@default:
  JUST_LIST_SUBMODULES=true just --list

# Start app in local dev mode
[group("dev")]
dev:
  just web::dev
```

```just
# web module internals
mod private "../../.config/private.just"

# Build web assets
build:
  bun run build

[private]
prepare-release:
  just private::sync-release-metadata
```

## Anti-patterns

- Exposing every internal helper as a public recipe.
- Missing comments for user-facing recipes.
- Inconsistent grouping or naming between modules.
- Using aliases as permanent duplicates instead of migration shims.

## Related references

- [Foundation and style](01-foundation-and-style.md)
- [Modules, imports, and multi-justfile layout](04-modules-imports-layout.md)
- [CLI operations and team workflows](06-cli-and-operations.md)
