/**
 * Feature flags utility for controlled rollout of new features
 * 
 * Provides environment-based feature toggles and configuration management
 * for the evento.json migration and other feature rollouts.
 */

/**
 * Environment configuration for data source selection
 * @property useEventoJson - Whether to load data from evento.json file (true) or use hardcoded defaults (false)
 * @property environment - Environment mode (development, production, test)
 */
export interface DataSourceConfig {
  useEventoJson: boolean;
  environment: 'development' | 'production' | 'test';
}

/**
 * Get data source configuration from environment variables
 * Defaults: useEventoJson = true, environment = development
 */
export function getDataSourceConfig(): DataSourceConfig {
  // Check environment variable for JSON data source
  // In browser environment, use globalThis.__USE_EVENTO_JSON__
  // In Node.js environment, use process.env.USE_EVENTO_JSON
  const useEventoJson = (() => {
    if (typeof process !== 'undefined' && process.env) {
      // Node.js environment
      const envValue = process.env.USE_EVENTO_JSON;
      // Default to true if not specified
      if (envValue === undefined) return true;
      return envValue?.toLowerCase() === 'true' || envValue === '1';
    } else if (typeof globalThis !== 'undefined') {
      // Browser environment (for Remotion preview)
      const globalValue = (globalThis as any).__USE_EVENTO_JSON__;
      // Default to true if not specified
      if (globalValue === undefined) return true;
      return globalValue === true || globalValue === 'true' || globalValue === '1';
    }
    return true; // Default to true - JSON is now the primary data source
  })();

  // Determine environment
  const environment = (() => {
    if (typeof process !== 'undefined' && process.env) {
      const nodeEnv = process.env.NODE_ENV;
      if (nodeEnv === 'production') return 'production';
      if (nodeEnv === 'test') return 'test';
    }
    return 'development'; // Default
  })();

  return {
    useEventoJson,
    environment
  };
}

/**
 * Check if JSON data source is enabled
 * Shortcut function for convenience
 */
export function isEventoJsonEnabled(): boolean {
  return getDataSourceConfig().useEventoJson;
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return getDataSourceConfig().environment === 'development';
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return getDataSourceConfig().environment === 'production';
}

/**
 * Feature flag registry for future expansion
 */
export const FeatureFlags = {
  EVENTO_JSON: 'evento_json',
  // Add more feature flags here as needed
} as const;

export type FeatureFlag = typeof FeatureFlags[keyof typeof FeatureFlags];