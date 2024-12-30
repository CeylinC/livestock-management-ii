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
import { IBarn } from "../models/IBarn";
import { create } from "zustand";
import { col_barns, db } from "../services/firebase/firebase";
import { Barn } from "../classes";

interface BarnState {
  barns: IBarn[];
  selectedBarn: IBarn | null;
  totalCount: number;
  lastData: any | null;
  getBarns: () => void;
  fetchInitialData: (pageSize: number) => void;
  fetchPage: (pageSize: number, pageNumber: number) => void;
  setBarn: (barn: IBarn) => void;
  updateBarn: (barn: IBarn) => void;
  deleteBarn: (barnId: string) => void;
  selectBarn: (barn: IBarn | null) => void;
}

export const useBarnStore = create<BarnState>((set, get) => ({
  barns: [],
  selectedBarn: null,
  totalCount: 0,
  lastData: null,

  getBarns: async () => {
    const temp: IBarn[] | null = [];

    const qs = await getDocs(col_barns);
    qs.forEach((doc) => {
      temp.push(new Barn({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ barns: temp }));
  },

  fetchInitialData: async (pageSize: number) => {
    const temp: IBarn[] | null = [];
    const ss = await getDocs(col_barns);
    let lastDataCreateAt: any;

    const q = query(col_barns, orderBy("createdAt", "desc"), limit(pageSize));
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      temp.push(new Barn({ ...doc.data(), id: doc.id }));
      lastDataCreateAt = doc.data().createdAt;
    });

    set(() => ({
      totalCount: ss.size,
      barns: temp,
      lastData: lastDataCreateAt,
    }));
  },

  fetchPage: async (pageSize: number, pageNumber: number) => {
    const { lastData } = get();
    const temp: IBarn[] = [];
    let q: any;
    let lastDataCreateAt: any;

    if (pageNumber === 1) {
      q = query(col_barns, orderBy("createdAt", "desc"), limit(pageSize));
    } else {
      q = query(
        col_barns,
        orderBy("createdAt", "desc"),
        startAfter(lastData),
        limit(pageSize)
      );
    }
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      const data = doc.data() as IBarn;
      temp.push(new Barn({ ...data, id: doc.id }));
      lastDataCreateAt = data.createdAt;
    });

    set(() => ({ barns: temp, lastData: lastDataCreateAt }));
  },

  setBarn: async (barn) => {
    const { barns } = get();

    const data = await addDoc(col_barns, {
      name: barn.name,
      type: barn.type,
      gender: barn.gender,
      createdAt: new Date(),
    });

    set(() => ({ barns: [{ ...barn, id: data.id }, ...barns] }));
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
