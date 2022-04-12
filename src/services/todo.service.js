import { db, auth } from "../utils";
import { collection, addDoc } from "firebase/firestore";

export const addTodoService = (title, description, time) => {
  return addDoc(collection(db, `users/${auth.currentUser.uid}/todos`), {
    title,
    description,
    time,
  });
};
