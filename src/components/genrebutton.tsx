import React from "react";
import { motion } from "framer-motion";

interface GenreButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
}

const GenreButton: React.FC<GenreButtonProps> = ({
  children,
  onClick,
  selected,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex w-[45%] md:w-1/5 py-3 items-center text-center my-2 md:my-0 ${selected ? "bg-[#EF0B73]" : "bg-[#2C2C34]"
        } hover:bg-[#EF0B73] border-2 border-[#EF0B73] text-[#F1F1F5] rounded-[15px] cursor-pointer`}
    >
      <span className="w-full text-sm md:text-lg font-semibold">
        {children}
      </span>
    </motion.button>
  );
};

export default GenreButton;
