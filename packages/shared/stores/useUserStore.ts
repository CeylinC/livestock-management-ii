import { create } from "zustand";
import { IUser } from "../models/IUser";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { mobileAuth } from "../services/firebase/firebaseConfig";

interface UserState {
  user: IUser | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  authControl: () => Promise<boolean>;
  signUpMobile: (email: string, password: string) => Promise<boolean>;
  loginMobile: (email: string, password: string) => Promise<boolean>;
  logoutMobile: () => Promise<boolean>;
  authControlMobile: () => Promise<boolean>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,

  signUp: async (email: string, password: string) => {
    const auth = getAuth();
    try {
      await setPersistence(auth, browserSessionPersistence);
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    }
  },

  login: async (email: string, password: string) => {
    const auth = getAuth();
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    }
  },

  logout: async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  },

  authControl: async () => {
    const auth = getAuth();
    return new Promise<boolean>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },

  signUpMobile: async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(mobileAuth, email, password);
      return true;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    }
  },

  loginMobile: async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(mobileAuth, email, password);
      return true;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    }
  },

  logoutMobile: async () => {
    try {
      await signOut(mobileAuth);
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  },

  authControlMobile: async () => {
    return new Promise<boolean>((resolve) => {
      onAuthStateChanged(mobileAuth, (user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
}));
