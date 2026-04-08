# Shelling, Scripts, and Cross-Platform Behavior

## Shell policy

- Default to POSIX `sh`-compatible commands unless project policy says otherwise.
- If non-default shell is required, set it explicitly in justfile settings.
- Keep shell-specific behavior isolated and documented.

## Shebang vs script recipes

- Use regular line recipes for straightforward command chains.
- Use shebang/script recipes for:
  - multiline control flow
  - complex validation
  - robust error handling
  - language-native tooling (Python/Node/etc.)

## Safety patterns

- Use strict modes where available (`set -euo pipefail` in bash-like scripts).
- Validate inputs before side effects.
- Emit clear, actionable error messages.

## Windows and portability

- Be explicit if a recipe assumes unix tools (`sed`, `lsof`, etc.).
- Offer alternative shell settings where practical.
- Avoid silent path-format assumptions.

## Helpful manual topics

- Shebang recipes
- Script recipes (+ temporary files)
- Safer bash shebang recipes
- Configuring the shell
- Avoiding argument splitting
- Paths on Windows
- Signal handling
