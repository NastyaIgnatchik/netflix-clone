import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import {useRecoilState, useRecoilValue} from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import CloseIcon from "@mui/icons-material/Close";
import Element, { Genre, Movie } from "../typings";
import ReactPlayer from "react-player/lazy";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CheckIcon from "@mui/icons-material/Check";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import UseAuth from "../hooks/UseAuth";
import { db } from "../firebase";
import { toast, Toaster } from "react-hot-toast";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const movie = useRecoilValue(movieState);
  const [trailer, setTrailer] = useState<string>("");
  const [genre, setGenre] = useState<Genre[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [addedToList, setAddedToList] = useState<boolean>(false);
  const { user } = UseAuth();
  const [list, setList] = useState<Movie | DocumentData | any>([]);

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  function handleClose() {
    setShowModal(false);
  }

  const listHandler = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user?.uid, "Mylist", movie?.id.toString()!)
      );
      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    } else {
      await setDoc(
        doc(db, "customers", user?.uid, "Mylist", movie?.id.toString()!),
        {
          ...movie,
        }
      );
      toast(
        `${movie?.title || movie?.original_name} has been added to My List.`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    }
  };

  useEffect(() => {
    if (!user) return;
    return onSnapshot(
      collection(db, "customers", user?.uid, "Mylist"),
      (snapshot) => setList(snapshot?.docs)
    );
  }, [db, movie.id]);

  useEffect(() => {
    setAddedToList(
      list.findIndex((result) => result.data().id == movie.id) !== -1
    );
  }, [list]);

  useEffect(() => {
    if (!movie) return;
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element | any) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenre(data.genres);
      }
    }
    fetchMovie();
  }, [movie]);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-4xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="top-center" />
        <button
          className="modalButton absolute top-5 !z-40 right-5 bg-[#181818] hover:bg-[#181818] border-none"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={isMuted}
          />
          <div
            className=" absolute bottom-10 w-full flex justify-between px-10
        items-center"
          >
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-1 rounded bg-white px-8 font-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <PlayArrowRoundedIcon />
                Play
              </button>
              <button className="modalButton" onClick={listHandler}>
                {addedToList ? <CheckIcon /> : <AddIcon />}
              </button>
              <button className="modalButton">
                <ThumbUpAltIcon />
              </button>
            </div>
            <button
              className="modalButton"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-2.5">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center rounded justify-center border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genre.map((g) => g.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
