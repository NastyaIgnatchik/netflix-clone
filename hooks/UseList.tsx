import React, { useEffect, useState } from "react";
import { Movie } from "../typings";
import { collection, onSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "../firebase";

const UseList = (uid: string) => {
  const [list, setList] = useState<Movie[] | DocumentData[]>([]);
  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      collection(db, "customers", uid, "Mylist"),
      (snapshot) => {
        setList(
          snapshot?.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, uid]);
  return list;
};

export default UseList;
