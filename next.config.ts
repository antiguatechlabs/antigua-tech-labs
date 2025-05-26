import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config: Configuration) => {
    // Optimize webpack cache serialization for large strings
    if (config.cache) {
      // Add webpack cache configuration
      if (typeof config.cache === 'object' && config.cache.type === 'filesystem') {
        // Set build dependencies
        config.cache.buildDependencies = {
          config: [__filename],
          ...(config.cache.buildDependencies || {})
        };

        // Set unique cache name
        config.cache.name = `${config.cache.name || 'webpack'}-${process.env.NODE_ENV}`;

        // Apply custom serialization for large strings
        // We need to use the internal webpack configuration that's not fully typed
        // We need to use a more specific type but webpack's internal types aren't exposed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const webpackConfig = config as any;

        // Configure PackFileCacheStrategy to use Buffer for large strings
        if (webpackConfig.cache) {
          // Set a hook to modify the serialization behavior
          const originalHooks = webpackConfig.cache.hooks;
          if (originalHooks) {
            // Store the original serializer
            const originalSerialize = originalHooks.serialize;
            const originalDeserialize = originalHooks.deserialize;

            // Override with our custom implementation
            webpackConfig.cache.hooks = {
              ...originalHooks,
              serialize: {
                tap: (name: string, fn: (data: unknown) => unknown) => {
                  return originalSerialize.tap(name, (data: unknown) => {
                    // Process the data before the original serializer
                    if (typeof data === 'string' && data.length > 100 * 1024) {
                      return Buffer.from(data);
                    }
                    return fn(data);
                  });
                }
              },
              deserialize: {
                tap: (name: string, fn: (data: unknown) => unknown) => {
                  return originalDeserialize.tap(name, (data: unknown) => {
                    // Process the data before the original deserializer
                    if (Buffer.isBuffer(data)) {
                      return fn(data.toString());
                    }
                    return fn(data);
                  });
                }
              }
            };
          }
        }
      }
    }

    return config;
  },
};

export default nextConfig;
