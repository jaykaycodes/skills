# Agent Skills

My collection of agent skills.

## Quick install
```bash
npx skills@latest add jaykaycodes/skills
```

## Sync upstream packs

This repo vendors and transforms upstream skills when needed.

```bash
node scripts/sync-impeccable.mjs
```

The sync script:
- snapshots `pbakaus/impeccable` into `third_party/impeccable/upstream`
- pins the exact upstream commit in `third_party/impeccable/impeccable.lock.json`
- generates one bundled skill (`ui`) with progressive-disclosure references


## Skills

### Tooling

These skills help you configure tools, workflows, and project automation.

- **justfile** — Author and refactor `just` justfiles using the manual as reference and a modular layout: default list recipe, `#` recipe docs, parameters and conditionals, modules and nested justfiles, and ongoing workflow canonicalization. See `justfile/SKILL.md` and `justfile/references/`.

  ```bash
  npx skills@latest add jaykaycodes/skills/justfile
  ```

### UI (Impeccable, bundled)

Impeccable is imported from upstream and repackaged into a single command skill so the command surface stays small.

- **ui** — one command with mode routing:
  - `/ui teach`
  - `/ui build <feature>`
  - `/ui review <surface>`
  - `/ui polish <surface>`
  - `/ui tune <type|layout|color|motion|responsive|performance|hardening>`

  ```bash
  npx skills@latest add jaykaycodes/skills/ui
  ```

## Attribution

The bundled `ui` skill is derived from [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable) (Apache-2.0). See `third_party/impeccable/LICENSE` and `third_party/impeccable/NOTICE.md`.
