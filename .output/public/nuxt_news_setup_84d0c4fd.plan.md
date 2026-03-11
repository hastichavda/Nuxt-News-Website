---
name: nuxt news setup
overview: Initialize a fresh Nuxt 3 project in the empty `news-website` folder using `npm`, with TypeScript, Tailwind CSS, Pinia, and a reusable utility-first structure prepared for a news website.
todos:
  - id: scaffold-nuxt
    content: Scaffold a fresh Nuxt 3 TypeScript app in the current folder using npm
    status: pending
  - id: install-modules
    content: Add and configure Pinia and Tailwind CSS for Nuxt
    status: pending
  - id: structure-base-app
    content: Create a reusable starter structure for layouts, components, stores, composables, and types
    status: pending
  - id: add-theme-responsive-ui
    content: Implement dark/light-ready responsive utility-first starter UI
    status: pending
  - id: validate-setup
    content: Check config and edited files for setup issues
    status: pending
isProject: false
---

# Nuxt 3 News Website Setup

## Goal

Create a fresh `Nuxt 3` project in this folder with:

- TypeScript-first app structure
- `Tailwind CSS` configured for utility-only styling and responsive layouts
- `Pinia` for state management
- dark/light theme support from the initial scaffold
- reusable, production-style folder organization suitable for a news website

## Implementation Plan

1. Scaffold a fresh Nuxt 3 app in the current folder using `nuxi` and `npm`, keeping the setup TypeScript-native.
2. Add and configure `@pinia/nuxt` and the Nuxt Tailwind integration so the project is ready for state management and utility-first styling out of the box.
3. Establish a reusable Nuxt structure focused on maintainability, including likely starter paths such as:

- `[package.json](/Users/shivamvarma/projects/web/news-website/package.json)`
- `[nuxt.config.ts](/Users/shivamvarma/projects/web/news-website/nuxt.config.ts)`
- `[tsconfig.json](/Users/shivamvarma/projects/web/news-website/tsconfig.json)`
- `[app.vue](/Users/shivamvarma/projects/web/news-website/app.vue)`
- `[assets/css/main.css](/Users/shivamvarma/projects/web/news-website/assets/css/main.css)`
- `[pages/index.vue](/Users/shivamvarma/projects/web/news-website/pages/index.vue)`
- `[components/](/Users/shivamvarma/projects/web/news-website/components)`
- `[layouts/](/Users/shivamvarma/projects/web/news-website/layouts)`
- `[stores/](/Users/shivamvarma/projects/web/news-website/stores)`
- `[composables/](/Users/shivamvarma/projects/web/news-website/composables)`
- `[types/](/Users/shivamvarma/projects/web/news-website/types)`

1. Configure theme handling so dark and light mode are both supported from the base app, with the UI using Tailwind utilities rather than custom component CSS.
2. Add a reusable starter homepage and shared layout/components that demonstrate:

- responsive utility classes for mobile, tablet, laptop, desktop, and large screens
- globally reusable spacing/container patterns
- accessible color usage for light/dark themes
- Pinia wired into the app through a small example store

1. Keep styling utility-first by limiting CSS to Tailwind layer entry/setup and avoiding custom visual component CSS unless technically necessary.
2. Validate the scaffold by checking the generated config and recently edited files for lint or type issues after setup.

## Architecture Notes

- Use Nuxt conventions instead of a custom framework wrapper so the code stays idiomatic and reusable.
- Treat “legacy standards” as stable, production-style engineering conventions: clear directories, typed state, composable reuse, low coupling, and minimal bespoke CSS.
- Prefer reusable Tailwind utility composition in templates and shared layout primitives over one-off page-specific styling.

## Expected Outcome

You will have a clean Nuxt 3 starter for a news website that is ready for continued feature work, with TypeScript, Pinia, Tailwind, responsive utility-based UI, and dark/light support already in place.
