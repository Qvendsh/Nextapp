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
        <div className="">
          <h1 className={"flex justify-center"}>Products</h1>
          <div className="grid grid-cols-4 gap-10">
            {pokemons.map((pokemon: { name: string; url: string }) => {
              const id = pokemon.url.split("/").filter(Boolean).pop();
              const pokemonId = id ? parseInt(id) : null;

              return (
                pokemonId && (
                  <ProductCard
                    key={pokemonId}
                    name={pokemon.name}
                    id={pokemonId}
                    url={pokemon.url}
                  />
                )
              );
            })}
          </div>

          <div className="w-full">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
          <div>
            <Link href="/Favourites">Go to favourites</Link>
          </div>
        </div>
      ) : (
        <div> you have to be logged in to view this page</div>
      )}
    </>
  );
};

export default PokemonPage;

// <div className="">
//   <h1 className={"flex justify-center"}>Products</h1>
//   <div className="grid grid-cols-4 gap-10">
//     {pokemons.map((pokemon: { name: string; url: string }) => {
//       const id = pokemon.url.split("/").filter(Boolean).pop();
//       const pokemonId = id ? parseInt(id) : null;
//
//       return (
//         pokemonId && (
//           <ProductCard
//             key={pokemonId}
//             name={pokemon.name}
//             id={pokemonId}
//             url={pokemon.url}
//           />
//         )
//       );
//     })}
//   </div>
//
//   <div className="w-full">
//     <button onClick={handlePrevPage} disabled={currentPage === 1}>
//       Prev
//     </button>
//     <span>Page {currentPage}</span>
//     <button onClick={handleNextPage}>Next</button>
//   </div>
//   <div>
//     <Link href="/favourites">Go to favourites</Link>
//   </div>
// </div>
// <div> you have to be logged in to view this page</div>
