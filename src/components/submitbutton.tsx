import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SubmitButtonProps {
  selectedGenres?: string[];
}

export default function SubmitButton({ selectedGenres }: SubmitButtonProps) {
  const navigate = useNavigate();

  const submit = () => {
    navigate(`/movies?genres=${selectedGenres?.join(",")}`);
  };

  return (
    <motion.button
      onClick={submit}
      className="w-full py-3.5 bg-[#FF5136] hover:bg-[#973324] text-[#F1F1F5] font-bold text-lg rounded-[15px] cursor-pointer"
    >
      PROCURAR FILMES
    </motion.button>
  );
}
