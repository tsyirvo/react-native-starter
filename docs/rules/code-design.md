# Code design

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists.

Build **deep modules**: much behavior behind a small interface. A module is any function, file, folder or package with an interface. Its **interface** is all that a caller must know: the signature, the invariants, the error modes and the order of calls. When the `codebase-design` skill is installed, it holds the full vocabulary.

## Interfaces

- Write the interface before the body. Give it the smallest shape that its current callers need.
- When callers repeat the same sequence of calls, move that sequence inside the module.
- When callers must know an order, an invariant or an error mode, let the module own it.
- A function takes two parameters at most. Three or more inputs go in one object parameter, so each input has a name at the call site.
- A signature that a library or framework sets stays as the library wants it.
- Return values. Do not mutate the caller's data.
- Accept dependencies as inputs. Do not construct clients inside the logic that uses them.

## Seams and adapters

- A **seam** is a place where behavior changes without an edit there: a port, an injected dependency, a factory.
- Add a seam only when two adapters exist today. A test fake counts as an adapter.
- A port is a TypeScript `interface`. Its adapter implements it and is typed as it.
- An SDK, a backend or a device API has one adapter module. Only that module imports the vendor package. Callers use the small, app-shaped interface that the adapter exports.
- When an adapter lacks what you need, add it to the adapter. Do not import the vendor package beside it.

## Placement

- Extend the module that owns the concept. Start a new module only when no owner exists.
- Use the deletion test on each new module. Delete it in your head: when its complexity spreads to its callers, it earns its place. When the complexity vanishes, it only forwards: inline it.
- Code that only forwards, renames or re-wraps is not a layer. Remove it.
- Keep one source of truth for each fact, type and constant. Search for the existing one before you add a new one.

## Public surface

- A folder that other folders import exposes its public interface through its `index.ts`.
- Callers import that `index.ts`, never a file behind it.
- Inside a module, use relative imports. A module never imports its own `index.ts`.
- Export only what a caller outside the folder uses. Knip fails on an unused export.
- A context or a module that is sensitive to load order may skip the barrel. Its import names the file.

## Scope of a change

- Make the smallest change that delivers the capability.
- Handle the cases that a real caller, a user action or outside data can reach. A case that nothing can reach gets no guard, no fallback and no option.
- Add no option that no caller varies, and no extension point that nothing uses.
- Leave unrelated code as it is. Note an improvement you see as a proposal in the pull request.
- Fix a departure only when the task asks for it, or when the change rewrites that code anyway. Then remove its row from `docs/rules/README.md`, or update its count.

## Enforcement

- Biome `useMaxParams` (`max: 2`) enforces the parameter count.
- Knip enforces the unused exports. dependency-cruiser rejects import cycles.
- The repo's `biome.jsonc` boundary overrides reject a vendor import outside its adapter.
- Depth, seams and placement are review only.
