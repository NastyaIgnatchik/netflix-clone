import React, { useRef, useState } from "react";
import { Movie } from "../typings";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import Thumbnail from "./Thumbnail";
import { DocumentData } from "firebase/firestore";


interface Props {
  title: string;
  movies: Movie[] | DocumentData[];
  id: string;
}
const Row = ({ title, movies, id }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState<boolean>(false);

  function handelClick(direction: string) {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2" id={id}>
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className=" relative group md:-ml-2">
        <ChevronLeftOutlinedIcon
          className={`absolute left-1 top-9 h-12 w-12 z-40 opacity-0 cursor-pointer transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handelClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide"
        >
          {movies.map((movie: Movie) => {
            return <Thumbnail key={movie.id} movie={movie} />;
          })}
        </div>
        <ChevronRightOutlinedIcon
          className=" absolute right-1  top-9  h-12 w-12 z-40 opacity-0 cursor-pointer transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handelClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
