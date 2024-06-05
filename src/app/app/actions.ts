import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { Idea } from "@/types";

export const getIdeasDataFromFirebase = async () => {
  const ideaQuerySnapshot = await getDocs(collection(db, "ideas"));

  return ideaQuerySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Idea[];
};

export const updateIdeaDataFromFirebase = async ({
  id,
  newData,
}: {
  id: string;
  newData: {};
}) => {
  await setDoc(doc(db, "ideas", id), newData, { merge: true });
};
