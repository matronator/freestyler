# Freestyler

Freestyler is a React + TypeScript playground for visually designing CSS layouts and component styles. You can create parent containers, add child elements, tweak style controls in real time, and export generated CSS for a single selected element or the full canvas.

## Features

- **Visual CSS editor** for:
  - Layout (`display`, `flex`, `grid`, alignment, columns)
  - Sizing (`width`, `height`, `box-sizing`)
  - Spacing (`margin`, `padding`) with axis/all sync toggles
  - Borders (`width`, `style`, `radius`, `color`)
  - Colors and shadows (multiple box shadows + text shadow)
- **Multi-element canvas**:
  - Add top-level preview items
  - Add nested children (`div`, `p`, `h2`, `h3`)
  - Reorder box shadow layers via drag-and-drop
  - Select and delete items
- **Export tools**:
  - Export CSS for the active element
  - Export CSS for all elements
  - Copy exported CSS to clipboard
- **Authoring helpers**:
  - Toggle highlight for selected element
  - Edit generated CSS ID
  - Edit text content for typographic elements

## Tech Stack

- **React 18** + **TypeScript**
- **Create React App** (react-scripts)
- **Sass** for styling
- **@hello-pangea/dnd** for drag-and-drop interactions
- **react-modal**, **react-colorful**, **react-switch**, **clipboard**

## Getting Started

### Prerequisites

- **Node.js** 16+
- **pnpm** (lockfile included), or npm/yarn if preferred

### Install dependencies

Using pnpm:

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

### Run in development

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

### Run tests

```bash
npm test -- --watchAll=false
```

### Create production build

```bash
npm run build
```

## Project Structure

```text
src/
  App.tsx                     # Main editor application and state orchestration
  controls/
    Input/                    # Reusable form controls (slider, select, checkbox, color picker)
    InputGroups/              # Composite control groups (e.g., shadow controls)
    MarginPadding/            # Sync controls for spacing
    Modals/                   # CSS export modals
    Button/                   # Button primitives
    Preview.tsx               # Preview models + rendered preview component
    PreviewList.tsx           # Item tree/list for selecting preview elements
  properties/                 # Enums/types for CSS properties and model state
  styles/                     # App, layout, modal, and utility styles
```

## How CSS Export Works

Freestyler serializes the current preview model into CSS declarations (including layout-specific declarations for flex/grid) and emits rules scoped by each element's `#cssId`. Export can be done per-element or across all items in the canvas.

## Scripts

- `npm start` – start development server
- `npm test` – run test runner
- `npm run build` – build production bundle
- `npm run eject` – eject CRA configuration (irreversible)

---

If you want, I can also add a quick **"Usage walkthrough"** section with screenshots and a step-by-step flow for creating/exporting a layout.
