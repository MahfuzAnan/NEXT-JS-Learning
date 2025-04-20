// Import apiVersion, dataset, projectId synchronously since they're needed for configuration
import { apiVersion, dataset, projectId } from "../env";
import type { SanityClient } from "next-sanity";

// Create client asynchronously
let clientPromise: Promise<SanityClient> | null = null;

// Use a function to get the client instead of exporting it directly
export const getClient = async (): Promise<SanityClient> => {
  if (!clientPromise) {
    // Dynamically import createClient
    const { createClient } = await import("next-sanity");
    
    clientPromise = Promise.resolve(createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    }));
  }
  
  return clientPromise;
};

// For backward compatibility, export a client that awaits the promise
export const client = {
  fetch: async (...args: Parameters<SanityClient['fetch']>) => {
    const actualClient = await getClient();
    return actualClient.fetch(...args);
  }
};
