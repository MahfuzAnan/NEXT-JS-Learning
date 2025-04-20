import Ping from "@/components/Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  let totalViews = 0;
  
  try {
    // Use dynamic import to get the sanity client at runtime
    const { createClient } = await import("next-sanity");
    const { apiVersion, dataset, projectId } = await import("@/sanity/env");
    
    // Create a client directly in this component
    const sanityClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    });
    
    // Fetch the data
    const result = await sanityClient.fetch(
      `*[_type == "startup" && _id == $id][0]{ _id, views }`,
      { id }
    );
    
    if (result && typeof result.views === 'number') {
      totalViews = result.views;
      
      // Update views
      after(async () => {
        try {
          // Get the token for write operations
          const { token } = await import("@/sanity/env");
          
          // Create a write client
          const writeClient = createClient({
            projectId,
            dataset,
            apiVersion,
            token,
            useCdn: false,
          });
          
          // Update the view count
          await writeClient
            .patch(id)
            .set({ views: totalViews + 1 })
            .commit();
        } catch (error) {
          console.error("Error updating view count:", error);
        }
      });
    }
  } catch (error) {
    console.error("Error in View component:", error);
  }
  
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;