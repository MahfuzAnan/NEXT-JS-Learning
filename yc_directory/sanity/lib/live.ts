'use server';

// This file was attempting to use defineLive which only works in React Server Components
// We're disabling it and providing basic stubs since it's causing errors

// Export stub functions that won't cause errors
export const sanityFetch = null;
export const SanityLive = () => null;

// Later, when you want to re-enable live queries:
// 1. Make sure this file has 'use server' directive at the top
// 2. Import defineLive using dynamic import
// 3. Use a proper server component context for initialization
