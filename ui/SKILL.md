---
name: ui
description: Unified design workflow for frontend UI. Handles context setup, planning, implementation, audit, and polish through one command with mode arguments. Use when the user asks for UI or UX design help and avoid multiple design slash commands.
argument-hint: "[teach|shape|build|review|polish|tune] [target]"
user-invocable: true
license: Apache 2.0. Derived from pbakaus/impeccable. See third_party/impeccable/NOTICE.md for attribution.
---

# UI Design Bundle

This is a bundled interface over the impeccable command set so users only need one command.

## Mode Router

Parse the first argument as mode. If no mode is provided, default to `build`.

- `teach`: gather project design context and update `.impeccable.md`
- `shape`: run planning/discovery and produce a design brief
- `build`: create or refactor UI implementation
- `review`: run technical + UX review, prioritized findings, and recommended next actions
- `polish`: final refinement pass before shipping
- `tune`: targeted pass for one dimension (`type`, `layout`, `color`, `motion`, `responsive`, `performance`, `hardening`)

When interpreting old command names:
- `audit` + `critique` map to `review`
- `typeset`, `layout`, `colorize`, `animate`, `adapt`, `optimize`, `harden` map to `tune`
- `distill`, `bolder`, `quieter`, `delight`, `overdrive` are style directives inside `build` or `polish`

## Quick Mode Cheat Sheet

When the user speaks in intent (not mode names), map requests like this:

- "set up design context" -> `teach`
- "plan this before coding" -> `shape`
- "implement this UI" -> `build`
- "what's wrong with this UI?" -> `review`
- "final pass before shipping" -> `polish`
- "improve typography hierarchy" -> `tune type`
- "fix spacing or layout rhythm" -> `tune layout`
- "improve colors/contrast/theme" -> `tune color`
- "add/refine animation" -> `tune motion`
- "make it mobile-friendly" -> `tune responsive`
- "speed this up" -> `tune performance`
- "cover edge cases/states/errors" -> `tune hardening`
- "cleaner/minimal/subtle" -> `polish` (style direction: quieter/distill)
- "more expressive/bold/fun" -> `polish` (style direction: bolder/delight/overdrive)

If user intent is ambiguous, ask one brief question to pick mode.

## Progressive Disclosure

Load only the reference file needed for the selected mode:

- `references/commands/impeccable.md` for `teach`, `build`, or `polish`
- `references/commands/shape.md` for `shape`
- `references/commands/audit.md` + `references/commands/critique.md` for `review`
- One of:
  - `references/commands/typeset.md`
  - `references/commands/layout.md`
  - `references/commands/colorize.md`
  - `references/commands/animate.md`
  - `references/commands/adapt.md`
  - `references/commands/optimize.md`
  - `references/commands/harden.md`
  for `tune` based on the requested dimension.

## Default Flow

Use this as the default sequence unless the user asks for a specific mode:

1. If no design context exists, run `teach`
2. If requirements are ambiguous, run `shape`
3. Run `build`
4. Run `review`
5. Run `polish`

## Output Contract

- Keep recommendations concrete and prioritized
- Include exact files/components when proposing changes
- For `review`, separate blocking issues from polish
- End with the next 1-3 best actions
