import MoviesCaurasel from "@/components/MoviesCaurasel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  params: {
    term: string;
  };
};

const SearchParams = async ({ params: { term } }: Props) => {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  const movies = await getSearchedMovies(termToUse);
  const popularMovues = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 lg:mt-42">
        <MoviesCaurasel title="Movies" movies={movies} isVertical />
        <MoviesCaurasel title="You may also like" movies={popularMovues} />
      </div>
    </div>
  );
};

export default SearchParams;
