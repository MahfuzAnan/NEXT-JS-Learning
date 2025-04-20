import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { getClient } from "@/sanity/lib/client";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  try {
    const client = await getClient();
    const rawPosts = await client.fetch(STARTUPS_QUERY, params);
    const posts = (rawPosts as unknown) as StartupTypeCard[];

    return (
      <>
        <section className="pink_container">
          <h1 className="heading">
            Pitch Your Startup <br />
            Connect With Entrepreneurs
          </h1>
          <p className="sub-heading !max-w-3xl">
            Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
            Competitions.
          </p>
          <SearchForm query={query} />
        </section>

        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : "All Startups"}
          </p>
          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (
              <p className="no-results">No startups found</p>
            )}
          </ul>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching startups:", error);
    return (
      <>
        <section className="pink_container">
          <h1 className="heading">
            Pitch Your Startup <br />
            Connect With Entrepreneurs
          </h1>
          <p className="sub-heading !max-w-3xl">
            Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
            Competitions.
          </p>
          <SearchForm query={query} />
        </section>

        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : "All Startups"}
          </p>
          <p className="no-results">Error loading startups</p>
        </section>
      </>
    );
  }
}
