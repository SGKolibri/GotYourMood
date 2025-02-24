import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import genres from "../utils/genres";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import axios from "axios";

const genreToIdMap: { [key: string]: number } = {
  ALEGRE: 35, // Comedy
  TRISTE: 18, // Drama
  AVENTUREIRO: 12, // Adventure
  PENSATIVO: 9648, // Mystery
  CURIOSO: 878, // Science Fiction
  SONOLENTO: 16, // Animation (for calm/relaxing movies)
  REFLETIVO: 18, // Drama
  ROMÂNTICO: 10749, // Romance
  MELANCÓLICO: 18, // Drama
  ENERGÉTICO: 28, // Action
  NOSTÁLGICO: 10402, // Music (nostalgic vibes)
  ASSUSTADO: 27, // Horror
  INSPIRADO: 99, // Documentary
  DESCONTRAÍDO: 35, // Comedy
  CRIATIVO: 878, // Science Fiction
};

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [movies, setMovies] = useState<any[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const genreNames = searchParams.get("genres");
    if (genreNames) {
      // Map genre names back to full display text (emoji + name)
      const selectedGenresWithEmojis = genreNames.split(",").map((name) => {
        const genre = genres.find((g) => g.name === name);
        return genre ? `${genre.emoji} ${genre.name}` : name;
      });
      setSelectedGenres(selectedGenresWithEmojis);

      getMovies(genreNames.split(","));
    } else {
      navigate("/");
    }
  }, []);

  const getMovies = async (genreNames: string[]) => {
    const genreIds = genreNames.map((name) => genreToIdMap[name]).join(",");

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=6.0&page=1&language=pt-BR`;

    // if nostalgic, get movies from before 2000
    if (genreNames.includes("NOSTÁLGICO")) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=6.0&primary_release_date.lte=2000-01-01&page=1&language=pt-BR`;
    }

    try {
      const response = await axios.get(url);
      const moviesWithTrailers = await Promise.all(
        response.data.results.slice(0, 20).map(async (movie: any) => {
          const trailer = await getTrailer(movie.id);
          return { ...movie, trailerId: trailer };
        })
      );
      setMovies(moviesWithTrailers);
      setLoading(false);
      console.log("Movies:", response.data.results);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching movies:", error);
    }
  };

  const getTrailer = async (movieId: number) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      console.log("Trailer:", response.data.results);
      const trailer = response.data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailer ? trailer.key : null;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return null;
    }
  };

  const currentMovie = movies[currentMovieIndex];

  return (
    <div className="font-poppins w-full min-h-screen flex flex-col p-10 items-center bg-[#1C1C20] text-[#F1F1F5] text-pretty tracking-wide gap-10 md:gap-20 ">
      <Header title={`🍿 ESTOU ${selectedGenres.join(", ")}`} />

      {/* movie container */}
      {loading ? (
        <div className="text-[#F1F1F5] text-center px-4 font-semibold text-lg">
          Carregando filmes...
        </div>
      ) : currentMovie ? (
        <div className="h-1/2 md:w-1/2 bg-[#2C2C34] text-center flex flex-col items-center justify-around md:justify-center gap-2 md:gap-4 rounded-2xl shadow-lg">
          {/* trailer - youtube trailer */}
          <div className="w-full h-1/2 rounded-2xl">
            {currentMovie.trailerId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentMovie.trailerId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl min-h-[200px] md:min-h-[300px]"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-800">
                <h1 className="py-10 text-lg md:text-xl font-semibold px-4">
                  Trailer não encontrado para este filme 😢
                </h1>
              </div>
            )}
          </div>

          {/* title */}
          <h1 className="text-lg md:text-xl font-bold px-2 text-[#F1F1F5 px-2">
            {currentMovie.title}
          </h1>

          {/* subtitle - release year, duration, rate */}
          <span className="text-md md:text-lg text-[#F1F1F5] px-2">
            {new Date(currentMovie.release_date).getFullYear()} - ⭐{" "}
            {currentMovie.vote_average.toFixed(1)}/10
          </span>

          {/* description */}
          <p className="w-[90%] md:w-1/2 text-sm md:text-md text-center text-[#F1F1F5] px-2">
            {currentMovie.overview}
          </p>

          {/* buttons - previous, link to youtube, next */}
          <div className="bottom-0 w-full flex justify-around gap-2 py-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`w-1/4 md:w-1/5 flex gap-1 items-center justify-center py-2.5 px-3 bg-[#2C2C34] hover:bg-[#EF0B73] border-2 border-[#EF0B73] rounded-[15px] font-bold text-sm md:text-md cursor-pointer text-[#F1F1F5]`}
              onClick={() =>
                setCurrentMovieIndex(
                  (prev) => (prev - 1 + movies.length) % movies.length
                )
              }
            >
              ⬅️ <div className="hidden md:flex">ANTERIOR</div>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-1/4 md:w-1/5 flex gap-1 items-center justify-center py-2.5 px-3 bg-[#2C2C34] hover:bg-[#EF0B73] border-2 border-[#EF0B73] rounded-[15px] font-bold text-sm md:text-md cursor-pointer text-[#F1F1F5]"
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${currentMovie.trailerId}`
                )
              }
            >
              📺 <div className="hidden md:flex">ABRIR TRAILER</div>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`w-1/4 md:w-1/5 flex gap-1 items-center justify-center py-2.5 px-3 bg-[#2C2C34] hover:bg-[#EF0B73] border-2 border-[#EF0B73] rounded-[15px] font-bold text-sm md:text-md cursor-pointer text-[#F1F1F5]`}
              onClick={() =>
                setCurrentMovieIndex((prev) => (prev + 1) % movies.length)
              }
            >
              <div className="hidden md:flex">PRÓXIMO</div> ➡️
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="text-[#F1F1F5] text-center px-4 font-bold text-xl">
          Nenhum filme encontrado para esses gêneros 😢
        </div>
      )}
      <Footer />
    </div>
  );
}
