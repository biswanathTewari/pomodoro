import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { Storage, auth } from "../utils";

const provider = new GoogleAuthProvider();

export const signInGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (err) {
    throw err;
  }
};

export const signOutGoogle = async () => {
  try {
    await signOut(auth);
    await Storage.store("user", null);
  } catch (err) {
    throw err;
  }
};
