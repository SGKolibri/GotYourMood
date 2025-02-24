import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import genres from "../utils/genres";
import Header from "../components/header";
import { motion } from "framer-motion";

const genreToIdMap: { [key: string]: number } = {
  ALEGRE: 35, // Comedy
  TRISTE: 18, // Drama
  AVENTUREIRO: 12, // Adventure
  PENSATIVO: 9648, // Mystery
  CURIOSO: 99, // Documentary
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

  const navigate = useNavigate();

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
    // get 20 movies based on selected genres
  };

  return (
    <div className="font-poppins w-full min-h-screen flex flex-col p-10 items-center bg-[#1C1C20] text-[#F1F1F5] text-pretty tracking-wide gap-10 md:gap-20 ">
      <Header title={`🍿 ESTOU - ${selectedGenres.join(", ")}`} />

      {/* movie container */}
      <div className="h-1/2 md:w-1/2 bg-[#2C2C34] text-center flex flex-col items-center justify-around md:justify-center gap-2 md:gap-4 rounded-2xl shadow-lg">
        {/* trailer - youtube trailer */}
        <div className="w-full h-1/2 rounded-t-2xl">Trailer</div>
        {/* title */}
        <h1 className="text-lg md:text-xl font-bold px-2">
          2001: Uma Odisseia no Espaço
        </h1>
        {/* subtitle - release year, duration, rate */}
        <span className="text-md md:text-lg px-2">
          1968 - 2h 29m - ⭐ 8.3/10
        </span>
        {/* description */}
        <p className="w-[90%] md:w-1/2 text-sm md:text-md text-center">
          A bordo de uma nave espacial, astronautas americanos e russos viajam
          para o planeta Júpiter, governado por um computador que pretende
          destruir a humanidade.
        </p>
        {/* buttons - previous, link to youtube, next */}
        <div className="bottom-0 w-full flex justify-around gap-2 py-4">
          <motion.button
            className={`w-1/5 py-2 px-3 bg-[#2C2C34] hover:bg-[#EF0B73] border-2 border-[#EF0B73] rounded-[15px] font-bold text-sm md:text-md cursor-pointer`}
          >
            ⬅️ ANTERIOR
          </motion.button>
          <motion.button className="w-1/5 py-2 px-3 bg-[#2C2C34] hover:bg-[#EF0B73] border-2 border-[#EF0B73] rounded-[15px] font-bold text-sm md:text-md cursor-pointer">
            📺 ABRIR TRAILER
          </motion.button>
          <motion.button
            className={`w-1/5 py-2 px-3 bg-[#2C2C34] hover:bg-[#EF0B73] border-2 border-[#EF0B73] rounded-[15px] font-bold text-sm md:text-md cursor-pointer`}
          >
            PRÓXIMO ➡️
          </motion.button>
        </div>
      </div>
    </div>
  );
}
