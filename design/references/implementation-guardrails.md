# Implementation Guardrails

## Must-haves
- Semantic HTML structure.
- Keyboard accessibility and visible focus.
- Explicit states for loading, empty, error, and success.
- Responsive layout for narrow and wide viewports.

## Avoid
- Magic numbers everywhere without tokenization.
- One-size spacing and typography across all contexts.
- Ambiguous click targets and weak affordances.
- Motion that harms readability or responsiveness.

## Practical defaults
- Use design tokens for spacing, radius, typography, and color.
- Prefer composition over large monolithic components.
- Keep copy concise and specific; remove redundant labels.
- Validate with at least one mobile and one desktop pass.

## Final pre-ship checklist
- Core task can be completed without confusion.
- Empty/error states are intentional, not placeholder text.
- Contrast and focus are acceptable in both themes (if applicable).
- No obvious visual collisions or overflow at common breakpoints.
