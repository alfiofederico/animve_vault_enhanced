"use server";

import { AnimeProp } from "../components/AnimeCard";
import AnimeCard from "../components/AnimeCard";

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );

  const data = await response.json();

  return data.map((item: AnimeProp, index: number, id: number) => (
    <AnimeCard key={item.id} anime={item} index={index} id={id} />
  ));
};

export const fetchSingleAnime = async (id: number) => {
  const response = await fetch(`https://shikimori.one/api/animes/${id}`);

  const data = await response.json();

  /*   return data.map((item: AnimeProp, index: number, id: number) => (
    <AnimeCard key={item.id} anime={item} index={index} id={id} />
  )); */
};
