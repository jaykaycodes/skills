# Foundation and Style

## House baseline

Use this top-level starter pattern:

```just
[private]
@default:
  JUST_LIST_SUBMODULES=true just --list
```

Then keep public recipes documented with `#` comments so list/help output remains useful.

## Style rules

- Keep recipe names action-oriented and consistent (`dev`, `build`, `check`, `check-fix`).
- Put one concern per recipe; compose through dependencies or delegation.
- Prefer short comments that explain intent and entry points.
- Use groups/attributes when they improve list readability.
- Hide internals with `[private]`.

## Discoverability patterns

- Ensure top-level list output acts as a command palette.
- Document all public recipes and important args.
- Use aliases sparingly; prefer one canonical recipe per action.
- Keep wrappers thin and route to module recipes.

## Helpful manual topics

- Default recipe
- Listing available recipes
- Documentation comments
- Groups
- Private recipes
- Quiet recipes
- Aliases
