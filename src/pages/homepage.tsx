import React, { useState } from "react";
import Header from "../components/header";
import GenreButton from "../components/genrebutton";
import genres from "../utils/genres";
import SubmitButton from "../components/submitbutton";

function Homepage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // type of selectedGenres is string[]

  const handleSelectGenre = (genre: string) => {
    setSelectedGenres((prevSelectedGenre) =>
      prevSelectedGenre.includes(genre)
        ? prevSelectedGenre.filter((g) => g !== genre)
        : [...prevSelectedGenre, genre]
    );
  };

  return (
    <>
      <div className="font-poppins w-full min-h-screen flex flex-col p-10 items-center bg-[#1C1C20] text-[#F1F1F5] text-pretty tracking-wide gap-10 md:gap-20 ">
        {/* header and slogan container */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-3">
          <Header title="🍿 MOODFLIX" />
          <span className="text-3xl md:text-4xl font-semibold text-center">
            Encontre o filme perfeito para seu mood
          </span>
          <span className="text-xl md:text-2xl text-center">
            Então, como está se sentindo agora?
          </span>
        </div>

        {/* genre buttons container */}
        <div className="full md:w-3/4 flex flex-wrap justify-around md:justify-center gap-1 md:gap-7 px-[0px] md:px-[8px]">
          {genres.map((genre) => (
            <GenreButton
              key={genre.name}
              onClick={() => handleSelectGenre(genre.name)}
              selected={selectedGenres.includes(genre.name)}
            >
              {genre.emoji} {genre.name}{" "}
              {/* Display both emoji and name in the UI */}
            </GenreButton>
          ))}
        </div>

        {/* submit button container */}
        <div className="w-full md:w-1/5">
          <SubmitButton selectedGenres={selectedGenres} />
        </div>

        {/* footer container */}
      </div>
    </>
  );
}

export default Homepage;
