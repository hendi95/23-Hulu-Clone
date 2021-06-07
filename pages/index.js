import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
 
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Nav */}
      <Nav />

      {/* Results */}
      <Results results={results} />
    </div>
  );
}

// This is what gets rendered on the server
// It gets rendered first (before what gets rendered on the client)
export async function getServerSideProps(context) {
  const genre = context.query.genre; // Get the genre from the url

  // This is where we make a request to the database (TMDB)
  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  // After rendering on the server we return the data as a PROP
  // to our component

  return {
    props: {
      results: request.results,
    },
  };
}
