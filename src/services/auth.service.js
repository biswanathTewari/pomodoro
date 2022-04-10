import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { Storage } from "../utils";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signInGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    await Storage.store("user", res.user);
    return res.user;
  } catch (err) {
    console.log(err);
  }
};

export const signOutGoogle = async () => {
  try {
    await signOut(auth);
    await Storage.store("user", null);
  } catch (err) {
    console.log(err);
  }
};
