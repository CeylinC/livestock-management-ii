import { create } from "zustand";
import { IAnimal } from "../models";
import { col_animals, db } from "../services/firebase/firebase";
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Animal } from "../classes";

interface AnimalState {
  animals: IAnimal[];
  selectedAnimal: IAnimal | null;
  getAnimals: () => void;
  setAnimal: (animal: IAnimal) => void;
  updateAnimal: (animal: IAnimal) => void;
  deleteAnimal: (animalId: string) => void;
  selectAnimal: (animal: IAnimal | null) => void;
}

export const useAnimalStore = create<AnimalState>((set, get) => ({
  animals: [],
  selectedAnimal: null,

  getAnimals: async () => {
    const temp: IAnimal[] | null = [];

    const qs = await getDocs(col_animals);
    qs.forEach((doc) => {
      temp.push(new Animal({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ animals: temp }));
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
    });

    set(() => ({ animals: [...animals, { ...animal, id: data.id }] }));
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
