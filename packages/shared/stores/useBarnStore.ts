import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { IBarn } from "../models/IBarn";
import { create } from "zustand";
import { col_barns, db } from "../services/firebase/firebase";
import { Barn } from "../classes";

interface BarnState {
  barns: IBarn[];
  selectedBarn: IBarn | null;
  getBarns: () => void;
  setBarn: (barn: IBarn) => void;
  updateBarn: (barn: IBarn) => void;
  deleteBarn: (barnId: string) => void;
  selectBarn: (barn: IBarn | null) => void;
}

export const useBarnStore = create<BarnState>((set, get) => ({
  barns: [],
  selectedBarn: null,

  getBarns: async () => {
    const temp: IBarn[] | null = [];

    const qs = await getDocs(col_barns);
    qs.forEach((doc) => {
      temp.push(new Barn({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ barns: temp }));
  },

  setBarn: async (barn) => {
    const { barns } = get();

    const data = await addDoc(col_barns, {
      name: barn.name,
      type: barn.type,
      gender: barn.gender,
    });

    set(() => ({ barns: [...barns, { ...barn, id: data.id }] }));
  },

  updateBarn: async (barn) => {
    const { barns } = get();
    const docRef = doc(db, "barns", barn.id);

    await updateDoc(docRef, {
      name: barn.name,
      type: barn.type,
      gender: barn.gender,
    });

    set(() => ({ barns: barns.map((s) => (s.id === barn.id ? barn : s)) }));
  },

  deleteBarn: async (barnId) => {
    const { barns } = get();
    await deleteDoc(doc(db, "barns", barnId));

    set(() => ({ barns: barns.filter((b) => b.id !== barnId) }));
  },
  
  selectBarn: (barn) => {
    set(() => ({
      selectedBarn: barn,
    }));
  },
}));
