#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import os from "node:os"
import crypto from "node:crypto"
import { execSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..")
const UPSTREAM_REPO = "https://github.com/pbakaus/impeccable.git"
const UPSTREAM_SLUG = "pbakaus/impeccable"
const VENDOR_ROOT = path.join(REPO_ROOT, "third_party", "impeccable")
const VENDOR_UPSTREAM = path.join(VENDOR_ROOT, "upstream")
const LOCK_PATH = path.join(VENDOR_ROOT, "impeccable.lock.json")
const MANIFEST_PATH = path.join(VENDOR_ROOT, "generated-manifest.json")
const SOURCE_SKILLS_PATH = [".agents", "skills"]
const BUNDLE_SKILL_NAME = "ui"
const COMMAND_ALIAS_MAP = [
  ["impeccable teach", "ui teach"],
  ["impeccable craft", "ui build"],
  ["impeccable extract", "ui tune layout"],
  ["impeccable", "ui build"],
  ["shape", "ui shape"],
  ["audit", "ui review"],
  ["critique", "ui review"],
  ["polish", "ui polish"],
  ["typeset", "ui tune type"],
  ["layout", "ui tune layout"],
  ["colorize", "ui tune color"],
  ["animate", "ui tune motion"],
  ["adapt", "ui tune responsive"],
  ["optimize", "ui tune performance"],
  ["harden", "ui tune hardening"],
  ["distill", "ui polish"],
  ["bolder", "ui polish"],
  ["quieter", "ui polish"],
  ["delight", "ui polish"],
  ["overdrive", "ui polish"],
  ["clarify", "ui polish"],
]

function run(command, options = {}) {
  return execSync(command, {
    stdio: options.stdio ?? "pipe",
    cwd: options.cwd ?? REPO_ROOT,
    encoding: "utf8",
  }).trim()
}

function rmIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true })
  }
}

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true })
}

function copyRecursive(source, destination) {
  const stat = fs.statSync(source)
  if (stat.isDirectory()) {
    ensureDir(destination)
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(destination, entry))
    }
    return
  }
  ensureDir(path.dirname(destination))
  fs.copyFileSync(source, destination)
}

function hashBuffer(input) {
  return crypto.createHash("sha256").update(input).digest("hex")
}

function hashFile(filePath) {
  return hashBuffer(fs.readFileSync(filePath))
}

function normalizeReferenceMarkdown(content) {
  let normalized = content
  const lines = normalized.split("\n")
  const kept = []
  let skippingPostUpdate = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === "<post-update-cleanup>") {
      skippingPostUpdate = true
      continue
    }
    if (trimmed === "</post-update-cleanup>") {
      skippingPostUpdate = false
      continue
    }
    if (!skippingPostUpdate) {
      kept.push(line)
    }
  }
  normalized = kept.join("\n")
  for (const [from, to] of COMMAND_ALIAS_MAP) {
    normalized = normalized.replace(
      new RegExp(`/${from}(?=[^a-zA-Z0-9_-]|$)`, "g"),
      `/${to}`,
    )
  }
  return normalized
}

function normalizeMarkdownTree(rootDir) {
  const walkQueue = [rootDir]
  while (walkQueue.length > 0) {
    const current = walkQueue.pop()
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        walkQueue.push(entryPath)
        continue
      }
      if (!entry.name.endsWith(".md")) continue
      const content = fs.readFileSync(entryPath, "utf8")
      fs.writeFileSync(entryPath, normalizeReferenceMarkdown(content))
    }
  }
}

function collectSkillDirs(skillsRoot) {
  if (!fs.existsSync(skillsRoot)) {
    throw new Error(`Source skills directory does not exist: ${skillsRoot}`)
  }
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

function loadJsonIfExists(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function removePreviouslyGeneratedSkills(manifest) {
  if (!manifest || !Array.isArray(manifest.generatedSkills)) return
  for (const skillDir of manifest.generatedSkills) {
    const absoluteSkillPath = path.join(REPO_ROOT, skillDir)
    if (fs.existsSync(absoluteSkillPath)) {
      fs.rmSync(absoluteSkillPath, { recursive: true, force: true })
    }
  }
}

function vendorSnapshot(tmpCloneDir, commitSha) {
  rmIfExists(VENDOR_UPSTREAM)
  ensureDir(VENDOR_UPSTREAM)

  const sourceSkills = path.join(tmpCloneDir, ...SOURCE_SKILLS_PATH)
  const sourceLicense = path.join(tmpCloneDir, "LICENSE")
  const sourceNotice = path.join(tmpCloneDir, "NOTICE.md")

  copyRecursive(sourceSkills, path.join(VENDOR_UPSTREAM, ...SOURCE_SKILLS_PATH))
  copyRecursive(sourceLicense, path.join(VENDOR_UPSTREAM, "LICENSE"))
  copyRecursive(sourceNotice, path.join(VENDOR_UPSTREAM, "NOTICE.md"))

  const vendorReadme = [
    "# Vendored impeccable snapshot",
    "",
    `Source: ${UPSTREAM_SLUG}`,
    `Commit: ${commitSha}`,
    "",
    "This directory is managed by `scripts/sync-impeccable.mjs`.",
    "Do not edit files here manually.",
    "",
  ].join("\n")
  fs.writeFileSync(path.join(VENDOR_ROOT, "README.md"), vendorReadme)
}

function createBundleSkillMarkdown() {
  return `---
name: ui
description: Unified design workflow for frontend UI. Handles context setup, planning, implementation, audit, and polish through one command with mode arguments. Use when the user asks for UI or UX design help and avoid multiple design slash commands.
argument-hint: "[teach|shape|build|review|polish|tune] [target]"
user-invocable: true
license: Apache 2.0. Derived from pbakaus/impeccable. See third_party/impeccable/NOTICE.md for attribution.
---

# UI Design Bundle

This is a bundled interface over the impeccable command set so users only need one command.

## Mode Router

Parse the first argument as mode. If no mode is provided, default to \`build\`.

- \`teach\`: gather project design context and update \`.impeccable.md\`
- \`shape\`: run planning/discovery and produce a design brief
- \`build\`: create or refactor UI implementation
- \`review\`: run technical + UX review, prioritized findings, and recommended next actions
- \`polish\`: final refinement pass before shipping
- \`tune\`: targeted pass for one dimension (\`type\`, \`layout\`, \`color\`, \`motion\`, \`responsive\`, \`performance\`, \`hardening\`)

When interpreting old command names:
- \`audit\` + \`critique\` map to \`review\`
- \`typeset\`, \`layout\`, \`colorize\`, \`animate\`, \`adapt\`, \`optimize\`, \`harden\` map to \`tune\`
- \`distill\`, \`bolder\`, \`quieter\`, \`delight\`, \`overdrive\` are style directives inside \`build\` or \`polish\`

## Progressive Disclosure

Load only the reference file needed for the selected mode:

- \`references/commands/impeccable.md\` for \`teach\`, \`build\`, or \`polish\`
- \`references/commands/shape.md\` for \`shape\`
- \`references/commands/audit.md\` + \`references/commands/critique.md\` for \`review\`
- One of:
  - \`references/commands/typeset.md\`
  - \`references/commands/layout.md\`
  - \`references/commands/colorize.md\`
  - \`references/commands/animate.md\`
  - \`references/commands/adapt.md\`
  - \`references/commands/optimize.md\`
  - \`references/commands/harden.md\`
  for \`tune\` based on the requested dimension.

## Default Flow

Use this as the default sequence unless the user asks for a specific mode:

1. If no design context exists, run \`teach\`
2. If requirements are ambiguous, run \`shape\`
3. Run \`build\`
4. Run \`review\`
5. Run \`polish\`

## Output Contract

- Keep recommendations concrete and prioritized
- Include exact files/components when proposing changes
- For \`review\`, separate blocking issues from polish
- End with the next 1-3 best actions
`
}

function generateBundleSkill(commitSha) {
  const upstreamSkillsRoot = path.join(VENDOR_UPSTREAM, ...SOURCE_SKILLS_PATH)
  const upstreamSkillNames = collectSkillDirs(upstreamSkillsRoot)
  const existingManifest = loadJsonIfExists(MANIFEST_PATH, null)
  removePreviouslyGeneratedSkills(existingManifest)

  const bundleRoot = path.join(REPO_ROOT, BUNDLE_SKILL_NAME)
  rmIfExists(bundleRoot)
  ensureDir(bundleRoot)
  ensureDir(path.join(bundleRoot, "references", "commands"))

  const lockSkills = {}
  for (const skillName of upstreamSkillNames) {
    const upstreamDir = path.join(upstreamSkillsRoot, skillName)
    const sourceSkillMd = path.join(upstreamDir, "SKILL.md")
    const refTarget = path.join(bundleRoot, "references", "commands", `${skillName}.md`)
    fs.writeFileSync(
      refTarget,
      normalizeReferenceMarkdown(fs.readFileSync(sourceSkillMd, "utf8")),
    )

    const sourceRefDir = path.join(upstreamDir, "reference")
    if (fs.existsSync(sourceRefDir)) {
      const targetRefDir = path.join(bundleRoot, "references", skillName)
      copyRecursive(sourceRefDir, targetRefDir)
      normalizeMarkdownTree(targetRefDir)
    }

    lockSkills[skillName] = {
      upstreamSkill: skillName,
      upstreamSkillMdHash: hashFile(sourceSkillMd),
      bundledReferenceHash: hashFile(refTarget),
    }
  }

  const bundleSkillPath = path.join(bundleRoot, "SKILL.md")
  fs.writeFileSync(bundleSkillPath, createBundleSkillMarkdown())

  const lockPayload = {
    version: 2,
    upstream: {
      repo: UPSTREAM_SLUG,
      commit: commitSha,
    },
    transform: {
      packageMode: "single-bundle",
      bundleSkill: BUNDLE_SKILL_NAME,
      sourcePath: SOURCE_SKILLS_PATH.join("/"),
    },
    syncedAt: new Date().toISOString(),
    skills: lockSkills,
    bundleSkillMdHash: hashFile(bundleSkillPath),
  }

  ensureDir(path.dirname(LOCK_PATH))
  fs.writeFileSync(LOCK_PATH, `${JSON.stringify(lockPayload, null, 2)}\n`)
  fs.writeFileSync(
    MANIFEST_PATH,
    `${JSON.stringify(
      {
        version: 1,
        generatedSkills: [BUNDLE_SKILL_NAME],
      },
      null,
      2,
    )}\n`,
  )

  return {
    generatedSkills: [BUNDLE_SKILL_NAME],
    upstreamSkillCount: upstreamSkillNames.length,
  }
}

function cloneUpstream() {
  const tmpBase = fs.mkdtempSync(path.join(os.tmpdir(), "impeccable-sync-"))
  const cloneDir = path.join(tmpBase, "upstream")
  run(`git clone --depth 1 ${UPSTREAM_REPO} "${cloneDir}"`)
  const commitSha = run("git rev-parse HEAD", { cwd: cloneDir })
  return { tmpBase, cloneDir, commitSha }
}

function main() {
  ensureDir(path.join(REPO_ROOT, "scripts"))
  ensureDir(VENDOR_ROOT)

  const { tmpBase, cloneDir, commitSha } = cloneUpstream()
  try {
    vendorSnapshot(cloneDir, commitSha)
    const generated = generateBundleSkill(commitSha)
    const licenseSrc = path.join(VENDOR_UPSTREAM, "LICENSE")
    const noticeSrc = path.join(VENDOR_UPSTREAM, "NOTICE.md")
    copyRecursive(licenseSrc, path.join(VENDOR_ROOT, "LICENSE"))
    copyRecursive(noticeSrc, path.join(VENDOR_ROOT, "NOTICE.md"))

    process.stdout.write(
      `Synced ${generated.upstreamSkillCount} upstream skills from ${UPSTREAM_SLUG}@${commitSha.slice(0, 12)}.\n`,
    )
    process.stdout.write(
      `Generated bundled skill: ${generated.generatedSkills.join(", ")}\n`,
    )
  } finally {
    rmIfExists(tmpBase)
  }
}

main()
