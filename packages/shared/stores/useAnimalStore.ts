import { create } from "zustand";
import { IAnimal } from "../models";
import { col_animals, db } from "../services/firebase/firebase";
import {
  addDoc,
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
  getAnimals: () => void;
  fetchInitialData: (pageSize: number) => void;
  fetchPage: (pageSize: number, pageNumber: number) => void;
  setAnimal: (animal: IAnimal) => void;
  updateAnimal: (animal: IAnimal) => void;
  deleteAnimal: (animalId: string) => void;
  selectAnimal: (animal: IAnimal | null) => void;
}

export const useAnimalStore = create<AnimalState>((set, get) => ({
  animals: [],
  selectedAnimal: null,
  totalCount: 0,
  lastData: null,

  getAnimals: async () => {
    const temp: IAnimal[] | null = [];

    const qs = await getDocs(col_animals);
    qs.forEach((doc) => {
      temp.push(new Animal({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ animals: temp }));
  },

  fetchInitialData: async (pageSize: number) => {
    const temp: IAnimal[] | null = [];
    const ss = await getDocs(col_animals);
    let lastDataCreateAt: any;

    const q = query(col_animals, orderBy("createdAt", "desc"), limit(pageSize));
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

  fetchPage: async (pageSize: number, pageNumber: number) => {
    const { lastData } = get();
    const temp: IAnimal[] = [];
    let q: any;
    let lastDataCreateAt: any;

    if (pageNumber === 1) {
      q = query(col_animals, orderBy("createdAt", "desc"), limit(pageSize));
    } else {
      q = query(
        col_animals,
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

  setAnimal: async (animal) => {
    const { animals } = get();

    const data = await addDoc(col_animals, {
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

  updateAnimal: async (animal) => {
    const { animals } = get();
    const docRef = doc(db, "animals", animal.id);

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

  deleteAnimal: async (animalId) => {
    const { animals } = get();
    await deleteDoc(doc(db, "animals", animalId));

    set(() => ({ animals: animals.filter((b) => b.id !== animalId) }));
  },

  selectAnimal: (animal) => {
    set(() => ({
      selectedAnimal: animal,
    }));
  },
}));
