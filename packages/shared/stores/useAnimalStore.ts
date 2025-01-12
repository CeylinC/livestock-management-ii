import { create } from "zustand";
import { IAnimal } from "../models";
import { db } from "../services/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { Animal } from "../classes";

interface AnimalState {
  animals: IAnimal[];
  selectedAnimal: IAnimal | null;
  totalCount: number;
  lastData: any | null;
  getAnimals: (uid: string) => void;
  fetchInitialData: (pageSize: number, uid: string) => void;
  fetchPage: (pageSize: number, pageNumber: number, uid: string) => void;
  setAnimal: (animal: IAnimal, uid: string) => void;
  updateAnimal: (animal: IAnimal, uid: string) => void;
  deleteAnimal: (animalId: string, uid: string) => void;
  selectAnimal: (animal: IAnimal | null) => void;
}

export const useAnimalStore = create<AnimalState>((set, get) => ({
  animals: [],
  selectedAnimal: null,
  totalCount: 0,
  lastData: null,

  getAnimals: async (uid) => {
    const temp: IAnimal[] | null = [];

    const qs = await getDocs(collection(doc(db, "users", uid), "animals"));
    qs.forEach((doc) => {
      temp.push(new Animal({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ animals: temp }));
  },

  fetchInitialData: async (pageSize, uid) => {
    const temp: IAnimal[] | null = [];
    const ss = await getDocs(collection(doc(db, "users", uid), "animals"));
    let lastDataCreateAt: any;

    const q = query(
      collection(doc(db, "users", uid), "animals"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      temp.push(new Animal({ ...doc.data(), id: doc.id }));
      lastDataCreateAt = doc.data().createdAt;
    });

    set(() => ({
      totalCount: ss.size,
      animals: temp,
      lastData: lastDataCreateAt,
    }));
  },

  fetchPage: async (pageSize, pageNumber, uid) => {
    const { lastData } = get();
    const temp: IAnimal[] = [];
    let q: any;
    let lastDataCreateAt: any;

    if (pageNumber === 1) {
      q = query(
        collection(doc(db, "users", uid), "animals"),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    } else {
      q = query(
        collection(doc(db, "users", uid), "animals"),
        orderBy("createdAt", "desc"),
        startAfter(lastData),
        limit(pageSize)
      );
    }
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      const data = doc.data() as IAnimal;
      temp.push(new Animal({ ...data, id: doc.id }));
      lastDataCreateAt = data.createdAt;
    });

    set(() => ({ animals: temp, lastData: lastDataCreateAt }));
  },

  setAnimal: async (animal, uid) => {
    const { animals } = get();

    const data = await addDoc(collection(doc(db, "users", uid), "animals"), {
      name: animal.name,
      earring: animal.earring,
      type: animal.type,
      genus: animal.genus,
      gender: animal.gender,
      birthday: animal.birthday.toString(),
      barnName: animal.barnName,
      createdAt: new Date(),
    });

    set(() => ({ animals: [{ ...animal, id: data.id }, ...animals] }));
  },

  updateAnimal: async (animal, uid) => {
    const { animals } = get();
    const docRef = doc(db, "users", uid, "animals", animal.id);

    await updateDoc(docRef, {
      name: animal.name,
      earring: animal.earring,
      type: animal.type,
      genus: animal.genus,
      gender: animal.gender,
      birthday: animal.birthday.toString(),
      barnName: animal.barnName,
    });

    set(() => ({
      animals: animals.map((s) => (s.id === animal.id ? animal : s)),
    }));
  },

  deleteAnimal: async (animalId, uid) => {
    const { animals } = get();
    await deleteDoc(doc(db, "users", uid, "animals", animalId));

    set(() => ({ animals: animals.filter((b) => b.id !== animalId) }));
  },

  selectAnimal: (animal) => {
    set(() => ({
      selectedAnimal: animal,
    }));
  },
}));
