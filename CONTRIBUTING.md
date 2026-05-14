# Contributing to KESU

Thank you for your interest in contributing to KESU. This document outlines the process for contributing to this project and provides guidelines to help maintain code quality and consistency.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Branch Naming](#branch-naming)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Questions and Discussions](#questions-and-discussions)

---

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## How to Contribute

There are several ways to contribute:

1. **Report bugs** -- Open an issue using the Bug Report template.
2. **Suggest features** -- Open an issue using the Feature Request template.
3. **Fix bugs** -- Fork the repository, fix the issue, and submit a pull request.
4. **Implement features** -- Discuss the feature in an issue first, then implement and submit a pull request.
5. **Improve documentation** -- Fix typos, clarify instructions, or add missing documentation.
6. **Review pull requests** -- Help review open pull requests and provide constructive feedback.

---

## Development Setup

### Prerequisites

- Node.js v18 or later (LTS recommended)
- npm v9 or later
- Git

### Setup

1. Fork the repository on GitHub.

2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/KESU.git
   cd KESU
   ```

3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/prsstt/KESU.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the application in development mode:
   ```bash
   npm start
   ```

### Staying Up to Date

Before starting new work, sync your fork with the upstream repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## Branch Naming

Use descriptive branch names with the following prefixes:

| Prefix | Usage |
|---|---|
| `feature/` | New features (e.g., `feature/export-audit-log`) |
| `fix/` | Bug fixes (e.g., `fix/rate-limit-retry`) |
| `docs/` | Documentation changes (e.g., `docs/update-readme`) |
| `refactor/` | Code refactoring without functional changes |
| `chore/` | Build, dependency, or tooling changes |

---

## Commit Messages

Write clear and descriptive commit messages. Follow these conventions:

- Use the imperative mood in the subject line (e.g., "Add export feature" not "Added export feature").
- Keep the subject line under 72 characters.
- Separate the subject from the body with a blank line if a body is needed.
- Reference relevant issue numbers where applicable (e.g., "Fix token persistence bug (#42)").

Examples:

```
Add keyboard shortcut for channel selection

Implement Ctrl+A shortcut to toggle selection of all visible channels
in the current server view. This mirrors the existing "Select All"
button behavior.

Closes #15
```

```
Fix rate limit handling for batch deletion
```

---

## Pull Request Process

1. **Create a focused PR.** Each pull request should address a single concern -- one bug fix, one feature, or one refactor. Avoid mixing unrelated changes.

2. **Update documentation.** If your change affects user-facing behavior, update the relevant documentation (README, inline comments, etc.).

3. **Test your changes.** Run the application locally and verify that your changes work as expected. Test edge cases where applicable.

4. **Fill out the PR template.** Describe what your PR does, why it is needed, and how to test it.

5. **Be responsive.** Address review feedback promptly. If you disagree with a suggestion, explain your reasoning.

### Review Criteria

Pull requests are evaluated on:

- **Correctness** -- Does the code work as intended?
- **Code quality** -- Is the code clean, readable, and maintainable?
- **Consistency** -- Does the code follow the existing style and patterns?
- **Scope** -- Is the change minimal and focused?
- **Testing** -- Has the change been manually verified?

---

## Coding Standards

### General

- Use consistent indentation (4 spaces for HTML/CSS/JS).
- Keep functions small and focused on a single responsibility.
- Use descriptive variable and function names.
- Avoid unnecessary comments -- prefer self-documenting code. Use comments for non-obvious logic.

### JavaScript

- Use `const` by default; use `let` only when reassignment is necessary. Never use `var`.
- Use template literals for string interpolation.
- Use `async/await` for asynchronous operations instead of raw Promises where possible.
- Handle errors explicitly -- never silently swallow exceptions.
- Follow the existing pattern of context isolation and IPC communication.

### CSS

- Use CSS custom properties (variables) defined in `:root` for all colors, sizes, and spacing.
- Follow the existing naming conventions for class names (lowercase, hyphen-separated).
- Keep selectors specific but not overly nested.

### Electron / Security

- Never enable `nodeIntegration` in renderer processes.
- Always use `contextBridge` and `contextIsolation` for IPC communication.
- Never expose sensitive data (tokens, credentials) through IPC channels beyond what is strictly necessary.
- Validate all input received from the renderer process in the main process.

---

## Reporting Bugs

When reporting a bug, please include:

1. **Environment** -- Operating system, Node.js version, Electron version, and KESU version.
2. **Steps to reproduce** -- A minimal sequence of actions that triggers the bug.
3. **Expected behavior** -- What you expected to happen.
4. **Actual behavior** -- What actually happened.
5. **Logs** -- If Developer Mode is enabled, include relevant console output.
6. **Screenshots** -- If the issue is visual, include a screenshot.

Use the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) issue template when available.

---

## Requesting Features

When suggesting a feature:

1. **Check existing issues** first to avoid duplicates.
2. **Describe the problem** the feature would solve.
3. **Propose a solution** if you have one in mind.
4. **Consider scope** -- is this a change that benefits the broader user base?

Use the [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md) issue template when available.

---

## Questions and Discussions

For general questions about the project, open a Discussion on the GitHub repository (if Discussions are enabled) or create an issue with the "question" label.

---

Thank you for helping improve KESU.
