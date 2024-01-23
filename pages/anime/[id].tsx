// pages/anime/[id].tsx
import "../../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import spinner from "/public/spinner.svg";
import star from "/public/star.svg";
import episodes from "/public/episodes.svg";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

interface AnimeDetails {
  id: number;
  name: string;
  image: {
    original: string;
  };
  aired_on: string;
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
}
// Add other properties based on your API response

const AnimeDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(`https://shikimori.one/api/animes/${id}`);
        const data: AnimeDetails = await response.json();
        setAnimeDetails(data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      }
    };

    if (id) {
      fetchAnimeDetails();
    }
  }, [id]);

  if (!animeDetails) {
    return (
      <div>
        <Image
          src={spinner}
          alt="spinner"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
    );
  }

  // Render your anime details using the `animeDetails` state

  return (
    <>
      <main className="max-w-2xl mx-auto bg-[#0F1117] px-2">
        {/*  <Hero /> */}

        <div className="relative w-[25vh] h-[37vh] mt-20">
          <Image
            src={`https://shikimori.one${animeDetails.image.original}`}
            alt={animeDetails.name}
            fill
            className="rounded-xl mt-1"
          />
        </div>

        <div className="py-4 flex flex-col gap-3">
          <div className="flex-col justify-center items-center gap-1">
            <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
              {animeDetails.name}
            </h2>
            <div className="py-1 px-2 rounded-sm">
              <p className="text-white text-sm font-bold capitalize">
                {animeDetails.kind}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src={episodes}
                alt="episodes"
                width={20}
                height={20}
                className="object-contain"
              />
              <p className="text-base text-white font-bold">
                {animeDetails.episodes || animeDetails.episodes_aired}
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image
                src={star}
                alt="star"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-base font-bold text-[#FFAD49]">
                {animeDetails.score}
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-base font-bold text-[#beda5a]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <p className="text-base font-bold text-[#beda5a]">
                {animeDetails.aired_on}
              </p>
            </div>
          </div>
        </div>
        {/* "Back to Home" link */}
        <button className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-1 px-2 mb-5 rounded-full">
          <a href="/">Back</a>
        </button>
      </main>

      {/*     <Footer /> */}
    </>
  );
};

export default AnimeDetailsPage;
