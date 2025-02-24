import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import genres from "../utils/genres";
import { motion } from "framer-motion";

export default function Header({ title }: { title: string }) {
  const location = useLocation();
  const genreEmojis = genres.map((genre) => genre.emoji);

  const [emojiIndex, setEmojiIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiIndex((prevIndex) => (prevIndex + 1) % genreEmojis.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [genreEmojis.length]);

  return (
    <div className="w-full md:w-1/2 flex flex-col px-6 py-2.5 items-center bg-[#2C2C34] rounded-[15px] text-center shadow-lg">
      <span className="w-full text-xl md:text-2xl font-bold">{title}</span>
      {location.pathname !== "/" && (
        <Link
          to="/"
          className="bg-[#FF5136] hover:bg-[#973324] flex gap-2 px-4 py-2 rounded-[15px] text-[#F1F1F5] text-md md:text-lg font-bold mt-4"
        >
          <motion.div
            key={emojiIndex}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {genreEmojis[emojiIndex]}{" "}
          </motion.div>{" "}
          PENSANDO BEM...
        </Link>
      )}
    </div>
  );
}
