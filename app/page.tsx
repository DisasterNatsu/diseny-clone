import CarousalBannerWrapper from "@/components/CarousalBannerWrapper";
import MoviesCaurasel from "@/components/MoviesCaurasel";
import { Button } from "@/components/ui/button";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";
import Image from "next/image";

const Home = async () => {
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main>
      <CarousalBannerWrapper />
      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MoviesCaurasel movies={upcomingMovies} title="Upcoming" />
        <MoviesCaurasel movies={topRatedMovies} title="Top Rated" />
        <MoviesCaurasel movies={popularMovies} title="Popular" />
      </div>
    </main>
  );
};

export default Home;
