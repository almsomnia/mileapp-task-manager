# Task List

A mock task list app built using Vue.js & Express.js

## Design Architecture

This project is using a monorepo structure powered by pnpm workspace, containing two main apps:

- **Backend**: REST API built with Express.js + TypeScript, following a modular repository pattern.

- **Frontend**: UI built with Vue 3 + TailwindCSS, using modular component structure.

Shared **type definitions** are declared in the root `/types` directory and extended by both frontend and backend.

## Design Decisions

### Monorepo with pnpm Workspace

- Chosen to centralize dependency management and simplify development flow between FE and BE.

- Enables shared configurations and shared types between FE/BE.

- Improves maintainability — especially when scaling to multiple services or layers.

This structure encourages reusability and consistency, allowing both apps to evolve in sync without dependency drift.

### Backend Modular Repository Pattern

Each module is fully self-contained and follows a clear separation of concerns:

- `*.controller.ts`: handles HTTP request and responses

- `*. service.ts`: holds business logic

- `*.repository.ts`: data access layer

- `*.validation.ts`: input validation schema

- `*.route.ts`: route definition and binding

This pattern keeps the codebase clean, testable, and scalable. It allows easy refactoring without breaking controller or services.

### Frontend Modular Architecture

The structure is built around reusability and separation of concerns:

- `components/core`: generic UI components

- `components/forms`: form-related elements

- `layouts`: layout templates

- `pages`: route-level pages

- `stores`: store collection for global state

- `composables`: custom hooks

- `utils`: stateless helpers

This encourages atomic design and high reusability, reducing duplication and simplifying maintenance.

### Shared Type Definitions

All API and Model types (interfaces, DTO, etc.) are defined here and referenced by both apps.

This encourages contract consistency between client and server.
When a model changes, both layers update automatically via TypeScript inference, minimizing integration bugs.

### Testing Setup

- Uses Jest for backend unit testing.

- Mock tests simulate repository logic for predictable behavior without external dependencias.

This ensures that modules behave correctly and isolates logic to improve reliability.

## Strengths

1. Scalable & Maintainable

   - Each module is independent. New features can be added without touching existing logic.

   - Ideal foundation for future microservice integration.

2. Strong Type Safety

   - End-to-end typing eliminates many runtime bugs.

   - Shared interfaces provides single source of truth for data models.

3. Consistent DX

   - Unified tooling, linting, and config across FE/BE.

   - Consistent shared dependencies via pnpm catalog.

4. Testability

   - Repository pattern makes it easy to mock dependencies.

   - Encourages clean unit and integration tests.

5. Reusability

   - Core components and composables can be easily extended.

   - Encourages DRY principles in both UI and backend logic.

6. Future-Ready

   - Clear module boundaries make it easy to integrate real databases.

   - Monorepo allows effortless addition of new packages.