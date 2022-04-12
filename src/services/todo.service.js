import { db, auth } from "../utils";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const addTodoService = (title, description, time) => {
  return addDoc(collection(db, `users/${auth.currentUser.uid}/todos`), {
    title,
    description,
    time,
  });
};

export const getTodosService = (setTodos) => {
  try {
    const qureySnapshot = query(
      collection(db, `users/${auth.currentUser.uid}/todos`)
    );
    const unsubscribe = onSnapshot(qureySnapshot, (snapshot) => {
      const todos = [];
      snapshot.forEach((doc) => {
        todos.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTodos(todos);
    });
    return unsubscribe;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodoService = (id) => {
  try {
    const collectionRef = collection(db, `users/${auth.currentUser.uid}/todos`);
    const docRef = doc(collectionRef, id);
    deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
};
