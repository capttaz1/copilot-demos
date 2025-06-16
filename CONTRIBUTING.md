# Contributing to [Your Project Name]

Thanks for helping improve this project! Please follow these guidelines to ensure consistency and quality.

## Code Style

- **Use camelCase** for variable and function names.
- **Prefer function components** and React Hooks (`useState`, `useEffect`, etc.) for all new components.
- **All UI text** must use the i18n translation function (no hardcoded strings).
- **PropTypes or TypeScript** must be used for all components.
- **No inline styles**—use CSS modules or styled-components.
- **Self-closing tags** for components with no children (`<MyComponent />`).
- **Run `npm run lint` and `npm run format` before committing.**

## Pull Requests

- Create feature branches from `main`.
- Write descriptive commit messages (see below).
- Reference related issues/tickets in your PR description.

## Commit Message Format

- Use present tense (“Add new feature”, not “Added…”)
- Short (50 char or less) summary, blank line, then more detail if needed.

## Example

feat: add user profile page
Implements profile page with editable fields and photo upload.

## Testing

- Add or update tests for all new features and fixes.
- Ensure `npm test` passes before submitting a PR.

## Communication

- For questions, open an issue or use the project Teams channel.
