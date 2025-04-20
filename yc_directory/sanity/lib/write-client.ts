import "server-only";
import { apiVersion, dataset, projectId, token } from "../env";
import type { SanityClient } from "next-sanity";

// Create dynamic import for createClient
let writeClientPromise: Promise<SanityClient> | null = null;

export const getWriteClient = async (): Promise<SanityClient> => {
  if (!writeClientPromise) {
    const { createClient } = await import("next-sanity");
    
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
      token,
    });
    
    if (!client.config().token) {
      throw new Error("Write token not found.");
    }
    
    writeClientPromise = Promise.resolve(client);
  }
  
  return writeClientPromise;
};

// For backward compatibility
export const writeClient = {
  patch: async (id: string) => {
    const actualClient = await getWriteClient();
    return actualClient.patch(id);
  },
  // Add other methods as needed
};
