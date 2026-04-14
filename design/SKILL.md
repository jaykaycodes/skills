---
name: design
description: End-to-end product design and UI implementation system with one command. Routes context capture, planning, build, review, polish, and design-system extraction through intent-based modes for consistent, high-quality outcomes.
argument-hint: "[context|plan|build|review|polish|tune|extract] [target]"
user-invocable: true
license: MIT
---

# Design System

Use one command (`/design`) for the full lifecycle of design work.

This skill is harness-neutral and portable. Persist shared context in `.agents/design.md`. If your environment has another persistent instructions location, mirror the same content there.

## Mode Router

Parse the first argument as mode. If omitted, default to `build`.

- `context`: capture product/audience/style constraints and write `.agents/design.md`
- `plan`: produce a concrete design brief before coding
- `build`: implement UI with strong hierarchy, spacing rhythm, and interaction quality
- `review`: perform UX + implementation review with severity and fix order
- `polish`: apply final pass for visual quality, clarity, and consistency
- `tune`: targeted optimization for `typography|layout|color|motion|responsive|performance|states`
- `extract`: pull repeated decisions into reusable design tokens/components/docs

Legacy intent aliases:
- `teach` -> `context`
- `shape` -> `plan`
- `audit` / `critique` -> `review`
- `typeset` / `layout` / `colorize` / `animate` / `adapt` / `optimize` / `harden` -> `tune`

## Canonical Usage

- `/design context`
- `/design plan checkout redesign`
- `/design build settings page information hierarchy`
- `/design build marketing hero with strong value prop`
- `/design review onboarding flow`
- `/design polish dashboard cards and empty states`
- `/design tune typography analytics table`
- `/design tune layout pricing page`
- `/design tune color dark mode contrast`
- `/design tune responsive account settings`
- `/design extract dashboard`

## Quick Intent Map

- "set up design context" -> `context`
- "plan before coding" -> `plan`
- "implement this UI" -> `build`
- "what is wrong with this UI?" -> `review`
- "ship-ready pass" -> `polish`
- "typography / spacing / color / motion / mobile / perf / states" -> `tune` with the right dimension
- "pull into design system" -> `extract`

## Progressive Disclosure

Load only the references needed for the current mode:

- `references/modes.md`
- `references/design-principles.md`
- `references/review-scorecard.md` (for `review`)
- `references/implementation-guardrails.md` (for `build`, `polish`, `tune`)
- `references/style-directions.md` (when user asks for style exploration)

## Default Flow

If mode is omitted:

1. Ensure context exists (run `context` if missing).
2. If requirements are ambiguous, run `plan`.
3. Run `build`.
4. Run `review`.
5. Run `polish`.

## Output Contract

- Ground recommendations in concrete user outcomes, not generic advice.
- Include exact file/component touch points when implementing.
- For `review`, separate Critical / Major / Minor / Polish findings.
- Always end with next 1-3 highest leverage actions.
