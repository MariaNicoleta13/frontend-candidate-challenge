# Main Changes

- Decided to expand the initial project structure instead of starting from scratch to focus on the frontend aspecs.
- Created all the components in their own separate directory. Each directory follows the same structure: `styles` with SCSS file(s), a unit test, the component itself, and an index file for export.
- Additionally, all icons are in a dedicated `icons` folder.
- Created a hook (`src/components/Item/hooks/useItemError.ts`) to encapsulate a piece of functionality.
- Used React Context (`src/components/context/TodoContext.tsx`) for data management.
- Added data persistence with local storage to ensure data remains available between sessions.
- Test coverage: Unit tests are found in each component folder, and E2E tests are found in `tests/app.spec.tsx`.
- Added two more scripts in `package.json`: `test:unit` and `test:e2e` for a better developer experience.

# Suggestions for future improvements

- Support for multiple languages and associated tooltips.
- Add support for color theme (light, dark etc).
- Backed communication: link each user via `userId` to their todo list and support `add`, `edit`, `remove`, `done` functionality.
- Improve UI/UX experience with focus on mobile devices. Right now, support for mobile devices works decently, but it can be improved.
