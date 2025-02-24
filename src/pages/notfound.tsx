import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function Notfound() {
  return (
    <div className="font-poppins w-full min-h-screen flex flex-col p-10 items-center bg-[#1C1C20] text-[#F1F1F5] text-pretty tracking-wide">
      <div className="w-full md:w-1/2 flex flex-col items-center gap-10 px-2">
        <span className="text-3xl md:text-4xl font-semibold text-center">
          Página não encontrada
        </span>
        <span className="text-xl md:text-2xl text-center">
          A página que você está procurando não existe
        </span>

        <Link
          to="/"
          className="bg-[#EF0B73] hover:bg-[#8c0642] px-4 py-3 rounded-[15px] text-[#F1F1F5] text-lg md:text-xl font-semibold"
        >
          Voltar para a página inicial
        </Link>
      </div>
      <Footer />
    </div>
  );
}
