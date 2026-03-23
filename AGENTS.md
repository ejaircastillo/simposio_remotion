# AGENTS.md - Agente Coding Guidelines for simposio_remotion

## Project Overview
This is a Remotion video project that generates a promotional video for the Primer Simposio Americano y Europeo de Victimología Penal. The project uses TypeScript, React, and Jest.

---

## Commands

### Development
```bash
npm start          # Start Remotion Studio (development server)
```

### Rendering
```bash
npm run render     # Render video to out/promo.mp4
```

### Testing
```bash
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

**Run a single test file:**
```bash
npx jest src/utils/evento-loader.test.ts
```

**Run a single test by name:**
```bash
npx jest -t "should extract unique speaker filenames"
```

### Type Checking
```bash
npx tsc --noEmit   # Check TypeScript compilation without emitting files
```

### Validation
```bash
node scripts/validate-evento.js  # Validate evento.json structure
```

---

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** in `tsconfig.json` - all strict checks are on
- Always use explicit types for function parameters and return values
- Use `interface` for object shapes, `type` for unions/aliases
- Prefer `import type` for type-only imports to enable tree shaking

### Naming Conventions

- **Files**: PascalCase for components (e.g., `Video.tsx`, `OradorProfile.tsx`), camelCase for utilities (e.g., `evento-loader.ts`)
- **Components**: PascalCase (e.g., `Intro`, `DayGrid`)
- **Functions/variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE for config values (e.g., `FPS`, `WIDTH`, `HEIGHT`)
- **Interfaces**: PascalCase with descriptive names (e.g., `EventoData`, `SpeakerInfo`)

### Imports

- Group imports in this order:
  1. External libraries (React, Remotion)
  2. Internal project imports (from `./utils/`, `./types/`)
  3. Type imports (`import type`)
- Use absolute paths relative to project root (e.g., `src/utils/evento-loader`)
- Avoid relative paths with many levels (`../../..`); prefer aliased imports

### React/Remotion Patterns

- Use functional components with explicit `React.FC` typing
- Use `React.useMemo` for expensive calculations (data transformations, array operations)
- Use `React.useEffect` sparingly; prefer `useMemo` where possible
- Use `staticFile()` for assets that need to be bundled with the video
- Leverage Remotion hooks: `useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring`

### Error Handling

- Always wrap JSON data loading in try/catch blocks
- Provide fallback data (e.g., `DEFAULT_EVENTO_DATA`) when external data fails
- Log errors to console with descriptive messages
- Never let data loading failures crash the video - always return valid fallback

### Formatting

- Use 2-space indentation
- Use semicolons at end of statements
- Use single quotes for strings (consistent with Remotion conventions)
- Add spaces around operators (`const x = 1 + 2`)
- Use trailing commas in multi-line objects/arrays
- Max line length: ~100 characters (soft limit)

### Component Structure

- Define component at top level or as inner function based on reuse
- Keep related constants (timings, colors) grouped near their usage
- Use JSDoc comments for exported functions that are used across modules
- Comment complex animations or timing logic

### Testing

- Use `describe` blocks to group related tests
- Use `it` with descriptive test names ("should extract...", "should handle...")
- Test both success and failure paths
- Use meaningful test data that matches production structure
- Place test files adjacent to the code they test (e.g., `evento-loader.ts` and `evento-loader.test.ts`)

### Feature Flags

- Use `feature-flags.ts` to control data source (JSON vs fallback)
- Environment variable: `USE_EVENTO_JSON=true|false`
- Default is `true` - uses evento.json from project root
- Set to `false` for emergency fallback to hardcoded data

---

## Project Structure

```
simposio_remotion/
├── src/
│   ├── Video.tsx         # Main video composition (FPS, WIDTH, scenes)
│   ├── Root.tsx          # Entry point
│   ├── types/
│   │   └── evento.ts     # TypeScript interfaces for evento.json
│   ├── utils/
│   │   ├── evento-loader.ts      # Data loading & transformation
│   │   ├── evento-loader.test.ts # Unit tests
│   │   ├── evento-schema.ts      # Zod validation schema
│   │   └── feature-flags.ts      # Environment configuration
│   └── components/        # Reusable components
├── evento.json            # Event configuration data
├── public/Oradores/       # Speaker images (.webp)
├── scripts/               # Build/validation scripts
└── out/                   # Rendered video output
```

---

## Key Design Patterns

1. **Data Loading**: Centralized in `evento-loader.ts` with caching (`getCachedEventoData`)
2. **Transformation**: Functions like `createDetailRows`, `createThursdaySpeakers` transform JSON to component-ready data
3. **Fallback Chain**: JSON load → validation → fallback to defaults
4. **Image Handling**: Speaker names mapped via `SPEAKER_NAME_MAP` + fuzzy matching algorithm
5. **Timing System**: Frame-based timing with `Sequence` components and `T` object for scene durations