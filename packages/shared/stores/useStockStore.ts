import { create } from "zustand";
import { IStock } from "../models";
import {
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import { Stock } from "../classes";

interface StockState {
  stocks: IStock[];
  selectedStock: IStock | null;
  totalCount: number;
  lastData: any | null;
  getStocks: (uid: string) => void;
  fetchInitialData: (pageSize: number, uid: string) => void;
  fetchPage: (pageSize: number, pageNumber: number, uid: string) => void;
  setStock: (stock: IStock, uid: string) => void;
  updateStock: (stock: IStock, uid: string) => void;
  deleteStock: (stockId: string, uid: string) => void;
  selectStock: (stock: IStock | null) => void;
  getTotalCount: (uid: string) => Promise<boolean>;
  getCategorizedDataCount: (uid: string, type: string) => Promise<null | number>;
}

export const useStockStore = create<StockState>((set, get) => ({
  stocks: [],
  selectedStock: null,
  totalCount: 0,
  lastData: null,

  getStocks: async (uid) => {
    const temp: IStock[] | null = [];

    const qs = await getDocs(collection(doc(db, "users", uid), "stocks"));
    qs.forEach((doc) => {
      temp.push(new Stock({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ stocks: temp }));
  },

  fetchInitialData: async (pageSize, uid) => {
    const { getTotalCount } = get();
    const temp: IStock[] | null = [];
    let lastDataCreateAt: any;

    await getTotalCount(uid);

    const q = query(
      collection(doc(db, "users", uid), "stocks"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      temp.push(new Stock({ ...doc.data(), id: doc.id }));
      lastDataCreateAt = doc.data().createdAt;
    });

    set(() => ({
      stocks: temp,
      lastData: lastDataCreateAt,
    }));
  },

  fetchPage: async (pageSize, pageNumber, uid) => {
    const { lastData } = get();
    const temp: IStock[] = [];
    let q: any;
    let lastDataCreateAt: any;

    if (pageNumber === 1) {
      q = query(
        collection(doc(db, "users", uid), "stocks"),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    } else {
      q = query(
        collection(doc(db, "users", uid), "stocks"),
        orderBy("createdAt", "desc"),
        startAfter(lastData),
        limit(pageSize)
      );
    }
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      const data = doc.data() as IStock;
      temp.push(new Stock({ ...data, id: doc.id }));
      lastDataCreateAt = data.createdAt;
    });

    set(() => ({ stocks: temp, lastData: lastDataCreateAt }));
  },

  setStock: async (stock, uid) => {
    const { stocks } = get();

    const data = await addDoc(collection(doc(db, "users", uid), "stocks"), {
      name: stock.name,
      category: stock.category,
      amount: stock.amount,
      dealer: stock.dealer,
      storage: stock.storage,
      createdAt: new Date(),
    });

    set(() => ({ stocks: [{ ...stock, id: data.id }, ...stocks] }));
  },

  updateStock: async (stock, uid) => {
    const { stocks } = get();
    const docRef = doc(db, "users", uid, "stocks", stock.id);

    await updateDoc(docRef, {
      name: stock.name,
      category: stock.category,
      amount: stock.amount,
      dealer: stock.dealer,
      storage: stock.storage,
    });

    set(() => ({ stocks: stocks.map((s) => (s.id === stock.id ? stock : s)) }));
  },

  deleteStock: async (stockId, uid) => {
    const { stocks } = get();
    await deleteDoc(doc(db, "users", uid, "stocks", stockId));

    set(() => ({ stocks: stocks.filter((s) => s.id !== stockId) }));
  },

  selectStock: (stock) => {
    set(() => ({
      selectedStock: stock,
    }));
  },
  
    getTotalCount: async (uid) => {
      try {
        const ss = await getDocs(collection(doc(db, "users", uid), "stocks"));
        set(() => ({ totalCount: ss.size }));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  
    getCategorizedDataCount: async (uid, type) => {
      const ss = collection(doc(db, "users", uid), "stocks");
      const q = query(ss, where("category", "==", type));
  
      try{
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
}));
