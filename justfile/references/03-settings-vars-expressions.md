# Settings, Variables, Functions, and Expressions

## Settings strategy

Use only settings that improve clarity or portability. Common candidates:

- `dotenv-load` for env hydration
- `shell` for platform/shell consistency
- `positional-arguments` when recipe UX requires exact argument behavior
- `export` only when child processes truly need all vars

Keep settings near the top of each justfile/module.

## Variables and expressions

- Use variables for shared constants and paths.
- Prefer explicit expressions over shell interpolation when possible.
- Use just built-ins for path/env/system manipulation before reaching for shell.
- Keep string quoting consistent and intentional.

## Built-ins and user-defined functions

- Reach for built-ins first (`env`, path helpers, invocation helpers, etc.).
- Use user-defined functions when expression reuse is high and semantics are stable.
- Avoid over-abstracting one-off values.

## Environment handling

- Use `.env` for local defaults, but avoid hidden magic for critical values.
- Export only what downstream commands need.
- Be explicit about required env vars in recipe comments.

## Helpful manual topics

- Settings (+ table of settings)
- Variables and assignments
- Expressions and substitutions
- Strings and sigils
- Built-in functions
- User-defined functions
- Constants
- Getting and setting environment variables
