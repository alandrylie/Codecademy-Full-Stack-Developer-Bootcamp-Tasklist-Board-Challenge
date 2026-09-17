# Sticky Task Board

A sticky-note style task board built with Angular (standalone components + signals) and Firebase Firestore, created for Codecademy's Full Stack Developer Bootcamp Contest #1.

Create, view, edit, and delete notes on a corkboard-style layout, each backed by a live Firestore document. Notes can be marked complete (with an undo option), and a colour-coded progress bar tracks how many notes are done.

**Live demo:** https://codecademy-tasklist-board.web.app

## Tech Stack

| Tool | Version |
|---|---|
| Angular | ^22.0.0 |
| Angular CLI | ^22.0.8 |
| @angular/fire | ^21.0.0-rc.0 |
| firebase | ^12.4.0 |
| Node.js | v24.18.0 (tested) |
| npm | 12.0.1 |
| TypeScript | 6.0.2 |

Firestore is accessed exclusively through `@angular/fire`, with a single `tasks` collection. Firestore observables are converted to signals via `toSignal()`; there is no manual `.subscribe()` anywhere in the app. Forms use Angular Reactive Forms (`FormGroup`/`FormControl`), not `ngModel`.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- npm (bundled with Node.js)
- [Angular CLI](https://angular.dev/tools/cli) - optional globally, but useful for running `ng` commands directly:
  ```bash
  npm install -g @angular/cli
  ```

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/alandrylie/Codecademy-Full-Stack-Developer-Bootcamp-Tasklist-Board-Challenge.git
   cd taskListBoard
```

2. Install dependencies:

```bash
   npm install
```

3. Firebase configuration is already included in `src/environments/environment.ts` and `environment.development.ts`, pointed at this project's own Firestore database (Firestore security is enforced by Firestore rules, not by keeping the web API key secret, so it's safe to commit). No additional setup is required to run the app as-is.

   To point the app at your own Firebase project instead, replace the `firebase` config object in both environment files with your own project's config from the [Firebase console](https://console.firebase.google.com/), and make sure Firestore is enabled with a collection named `tasks`.

- To get the correct version of angular fire run
  use

```bash
  npm install @angular/fire@21.0.0-rc.0 firebase@12.4.0 --legacy-peer-deps
```

## Running the app locally

Start the development server:

```bash
npm start
```

or

```bash
ng serve
```

Then open `http://localhost:4200/` in your browser. The app reloads automatically on file changes.

## Building for production

```bash
ng build
```

Build output is written to `dist/taskListBoard`.

## Running unit tests

```bash
ng test
```

Runs the component/unit test suite via [Vitest](https://vitest.dev/).

## Deploying to Firebase Hosting

This project is already configured for Firebase Hosting (`firebase.json`, `.firebaserc`). To deploy your own copy:

```bash
npm install -g firebase-tools
firebase login
ng build
firebase deploy
```

## Project Structure

```
src/app/
  navigation/       # Top nav bar (Note Board / + New Note links)
  note-create/      # Create note form
  note-list/        # Board view - reads all notes, delete/complete/undo actions
  note-update/      # Edit note form - loads one note by route id, save/cancel/delete
  sticky-service.ts # All Firestore reads/writes live here
  sticky-note-interface.ts # Task/note TypeScript interface
  app.routes.ts     # /notes, /notes/new, /notes/:id/update
```

## Features

- **Create** - validated form (title 3-20 characters, details up to 200), writes to Firestore.
- **Read** - live board view via `toSignal`, with an open/completed counter and a colour-coded progress bar.
- **Update** - edit route loads the correct note pre-filled, with Save, Cancel, and Delete options.
- **Delete** - removes the note from Firestore, with a confirmation prompt.
- **Mark complete / Undo** - toggle a note's completed state without leaving the board.
- Six note colours, each with matching hover, thumbtack, and background styling.
- Fully responsive layout, tested down to sub-320px screen widths.