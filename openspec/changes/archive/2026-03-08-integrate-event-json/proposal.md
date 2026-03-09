# Proposal: Integrate evento.json with Video.tsx

## Intent

Currently, the Remotion video project has all event data hardcoded in `Video.tsx` while a structured `evento.json` file exists but is not being used. This creates maintenance overhead and a single source of truth problem. Any changes to event details require modifying TypeScript code instead of updating a simple JSON configuration file.

This change aims to:
1. **Eliminate data duplication** by using `evento.json` as the single source of truth
2. **Simplify maintenance** allowing non-technical users to update event details by editing JSON
3. **Improve data consistency** ensuring all components use the same data structure
4. **Enable future extensibility** for multi-event support or dynamic data loading

## Scope

### In Scope
- Create TypeScript interfaces/types for the `evento.json` structure
- Replace hardcoded constants in `Video.tsx` with data loaded from `evento.json`
- Maintain backward compatibility with current video rendering output
- Implement JSON loading at runtime (development) and build time (production)
- Update component props to use the structured data model
- Add basic error handling for missing or malformed JSON data

### Out of Scope
- Creating a UI for editing `evento.json` (remains a manual edit file)
- Dynamic loading from external APIs or databases
- Real-time data updates during video rendering
- Support for multiple JSON files or template systems
- Changes to visual design or animation timings

## Approach

The technical approach will be:

1. **Type Definition**: Create TypeScript interfaces in `src/types/evento.ts` that mirror the `evento.json` structure
2. **Data Loading**: Implement a utility function `loadEventoData()` that:
   - Loads and parses `evento.json` at runtime in development
   - Potentially bundles the data at build time for production
   - Provides default/fallback values for missing data
3. **Component Refactoring**: Update `Video.tsx` components to:
   - Accept `EventoData` as props or context
   - Replace hardcoded arrays (`DETAIL_ROWS`, `JUEVES`, `VIERNES`, `MODS`) with data from JSON
   - Maintain all existing animations and visual styles
4. **Progressive Migration**: Start with simple data replacement, then refactor more complex structures

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/Video.tsx` | Modified | Replace hardcoded data with JSON-loaded values |
| `src/types/evento.ts` | New | TypeScript interfaces for JSON structure |
| `src/utils/eventoLoader.ts` | New | JSON loading and validation utility |
| `evento.json` | Modified | May need minor structure adjustments for TypeScript compatibility |
| `src/Root.tsx` | Potentially Modified | May need to pass data as composition props |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| JSON parsing errors at runtime | Medium | Implement robust error handling with fallback to hardcoded defaults |
| Type mismatches between JSON and TypeScript | High | Create comprehensive TypeScript interfaces and validation |
| Performance impact on video rendering | Low | Load JSON once and cache; minimal runtime overhead |
| Breaking existing video output | Medium | Thorough testing with current `evento.json` values |
| Missing data fields causing rendering errors | Medium | Provide sensible defaults for all optional fields |

## Rollback Plan

1. **Immediate rollback**: Revert `Video.tsx` to previous version from git
2. **Partial rollback**: Keep TypeScript interfaces but revert component changes
3. **Fallback mechanism**: Implement dual data loading (JSON + hardcoded) with feature flag
4. **Verification**: Compare rendered video output with original to ensure visual parity

## Dependencies

- **Remotion 4.0+**: Already satisfied by current `package.json`
- **TypeScript 5.4+**: Already satisfied by current dev dependencies
- **Node.js file system API**: For reading `evento.json` file

## Success Criteria

- [ ] `evento.json` becomes the single source of truth for all event data
- [ ] Video renders identically to current version using JSON data
- [ ] TypeScript compilation passes without errors
- [ ] JSON structure is fully typed with TypeScript interfaces
- [ ] Error handling provides sensible defaults for missing data
- [ ] No performance regression in video rendering time
- [ ] All existing animations and visual styles are preserved