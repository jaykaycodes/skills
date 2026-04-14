# Design Modes

## `context`
- Goal: create shared design context before implementation.
- Output: `.agents/design.md` with users, jobs, tone, constraints, and anti-goals.
- Ask only questions that are not inferable from code/docs.

## `plan`
- Goal: reduce design ambiguity before writing code.
- Output: concise design brief with hierarchy, key states, interactions, and risks.
- Includes: success metric and failure modes.

## `build`
- Goal: implement or refactor UI with production quality.
- Required: semantic structure, accessibility, responsive behavior, and visual hierarchy.
- Prefer small validated iterations over massive rewrites.

## `review`
- Goal: surface design and implementation issues with severity.
- Output structure:
  - Critical (must-fix)
  - Major (fix before ship)
  - Minor (next pass)
  - Polish (optional)

## `polish`
- Goal: improve perceived quality without changing core product behavior.
- Focus on rhythm, copy sharpness, affordances, spacing, and state coherence.

## `tune`
- Goal: focus pass on one dimension.
- Dimensions:
  - `typography`
  - `layout`
  - `color`
  - `motion`
  - `responsive`
  - `performance`
  - `states`

## `extract`
- Goal: convert repeated patterns into reusable assets.
- Output:
  - token proposals
  - reusable component opportunities
  - documentation updates
