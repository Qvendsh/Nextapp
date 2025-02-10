"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "@/service/pokemon";
import ProductCard from "@/elements-page/home-page/product-card";
import { UserAuth } from "@/context/AuthContext";

const PokemonPage = () => {
  const { user } = UserAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 20;
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    };
    checkAuthentication();
  }, [user]);
  const { data: pokemons } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getPokemons(currentPage, limit),
  });

  if (!pokemons || !pokemons.length) {
    return <div>No products available</div>;
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {user ? (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Pokemons
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {pokemons.map((pokemon: { name: string; url: string }) => {
              const id = pokemon.url.split("/").filter(Boolean).pop();
              const pokemonId = id ? parseInt(id) : null;
              const pokeId = pokemonId?.toString() ?? "";

              return (
                pokemonId && (
                  <ProductCard
                    key={pokemonId}
                    name={pokemon.name}
                    id={pokeId}
                    url={pokemon.url}
                  />
                )
              );
            })}
          </div>

          <div className="w-full flex flex-col items-center mt-8">
            <div className="mb-4">
              <Link
                href="/Favourites"
                className="text-lg text-blue-500 hover:text-blue-700 transition"
              >
                Go to favourites
              </Link>
            </div>

            <div className="flex items-center space-x-4 mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition disabled:bg-gray-300"
              >
                Prev
              </button>
              <span className="text-xl font-semibold">{currentPage}</span>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-xl text-gray-700">
            You have to be logged in to view this page.
          </p>
        </div>
      )}
    </>
  );
};

export default PokemonPage;
