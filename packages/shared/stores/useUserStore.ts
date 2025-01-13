import { create } from "zustand";
import { IUser } from "../models/IUser";
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../services/firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { User } from "../classes/User";

interface UserState {
  user: IUser | null;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    auth?: Auth,
    type?: "mobile" | "web"
  ) => Promise<boolean>;
  login: (
    email: string,
    password: string,
    auth?: Auth,
    type?: "mobile" | "web"
  ) => Promise<boolean>;
  logout: (auth?: Auth) => Promise<boolean>;
  authControl: (auth?: Auth) => Promise<boolean>;
  createUser: (user: IUser) => Promise<void>;
  getUser: (userId: string) => Promise<void>;
  saveUser: (user: IUser) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,

  signUp: async (email, password, fullName, auth = getAuth(), type = "web") => {
    const { createUser } = get();
    try {
      if (type === "web") {
        await setPersistence(auth, browserSessionPersistence);
      }
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          createUser(new User({ email: email, id: userCredential.user.uid }));
        }
      );
      return true;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    }
  },

  login: async (email, password, auth = getAuth(), type = "web") => {
    const { getUser } = get();
    try {
      if (type === "web") {
        await setPersistence(auth, browserSessionPersistence);
      }
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          getUser(userCredential.user.uid);
        }
      );
      return true;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    }
  },

  logout: async (auth = getAuth()) => {
    try {
      await signOut(auth);
      set(() => ({ user: null }));
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  },

  authControl: async (auth = getAuth()) => {
    return new Promise<boolean>((resolve) => {
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },

  createUser: async (user) => {
    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, {
      fullName: user.fullName,
      email: user.email,
      createdAt: new Date(),
    });
    set(() => ({ user: user }));
  },

  getUser: async (userId) => {
    const docSnap = await getDoc(doc(db, "users", userId));
    if (docSnap.exists()) {
      set(() => ({ user: new User({ ...docSnap.data(), id: userId }) }));
    }
  },

  saveUser: async (user) => {
    const docRef = doc(db, "users", user.id);

    await updateDoc(docRef, {
      fullName: user.fullName,
    });

    set(() => ({
      user: user,
    }));
  },
}));
