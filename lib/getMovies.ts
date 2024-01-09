import { SearchResults } from "@/typings";

const fetchFromTMDB = async (url: URL, cacheTime?: number) => {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24, // default of 24 hour
    },
  };

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as SearchResults;
  return data;
};

// getUpcomingMovies

export const getUpcomingMovies = async () => {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming"); // api url
  const data = await fetchFromTMDB(url);

  return data.results;
};

// getTopRatedMovies

export const getTopRatedMovies = async () => {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated"); // api url
  const data = await fetchFromTMDB(url);

  return data.results;
};

// getPopularMovies

export const getPopularMovies = async () => {
  const url = new URL("https://api.themoviedb.org/3/movie/popular"); // api url
  const data = await fetchFromTMDB(url);

  return data.results;
};

// getDiscoverMovies gets the Genre Specific movies

export const getDiscoverMovies = async (id?: string, keywords?: string) => {
  const url = new URL(`https://api.themoviedb.org/3/discover/movie`);

  // check if a id or keyword was passed

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  const data = await fetchFromTMDB(url);
  return data.results;
};

// getSearchedMovies

export const getSearchedMovies = async (term: string) => {
  const url = new URL("https://api.themoviedb.org/3/search/movie");

  url.searchParams.set("query", term);

  const data = await fetchFromTMDB(url);
  return data.results;
};
