import React, { useEffect, useState } from "react";
import { Movie } from "../typings";
import Image from "next/image";
import { baseUrl } from "../constans/movie";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0   h-[95vh] -z-10 w-full">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
          alt="movie"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className=" text-shadow-md max-w-xs text-xs md:max-w-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">Play</button>
        <button
          className="bannerButton bg-[grey]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          More Info
          <InfoOutlinedIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
