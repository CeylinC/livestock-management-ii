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
} from "firebase/firestore";
import { col_stocks, db } from "../services/firebase/firebase";
import { Stock } from "../classes";

interface StockState {
  stocks: IStock[];
  selectedStock: IStock | null;
  totalCount: number;
  lastData: any | null;
  getStocks: () => void;
  fetchInitialData: (pageSize: number) => void;
  fetchPage: (pageSize: number, pageNumber: number) => void;
  setStock: (stock: IStock) => void;
  updateStock: (stock: IStock) => void;
  deleteStock: (stockId: string) => void;
  selectStock: (stock: IStock | null) => void;
}

export const useStockStore = create<StockState>((set, get) => ({
  stocks: [],
  selectedStock: null,
  totalCount: 0,
  lastData: null,

  getStocks: async () => {
    const temp: IStock[] | null = [];

    const qs = await getDocs(col_stocks);
    qs.forEach((doc) => {
      temp.push(new Stock({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ stocks: temp }));
  },

  fetchInitialData: async (pageSize: number) => {
    const temp: IStock[] | null = [];
    const ss = await getDocs(col_stocks);
    let lastDataCreateAt: any;

    const q = query(col_stocks, orderBy("createdAt", "desc"), limit(pageSize));
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      temp.push(new Stock({ ...doc.data(), id: doc.id }));
      lastDataCreateAt = doc.data().createdAt;
    });

    set(() => ({
      totalCount: ss.size,
      stocks: temp,
      lastData: lastDataCreateAt,
    }));
  },

  fetchPage: async (pageSize: number, pageNumber: number) => {
    const { lastData } = get();
    const temp: IStock[] = [];
    let q: any;
    let lastDataCreateAt: any;

    if (pageNumber === 1) {
      q = query(col_stocks, orderBy("createdAt", "desc"), limit(pageSize));
    } else {
      q = query(
        col_stocks,
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

  setStock: async (stock) => {
    const { stocks } = get();

    const data = await addDoc(col_stocks, {
      name: stock.name,
      category: stock.category,
      amount: stock.amount,
      dealer: stock.dealer,
      storage: stock.storage,
      createdAt: new Date(),
    });

    set(() => ({ stocks: [{ ...stock, id: data.id }, ...stocks] }));
  },

  updateStock: async (stock) => {
    const { stocks } = get();
    const docRef = doc(db, "stocks", stock.id);

    await updateDoc(docRef, {
      name: stock.name,
      category: stock.category,
      amount: stock.amount,
      dealer: stock.dealer,
      storage: stock.storage,
    });

    set(() => ({ stocks: stocks.map((s) => (s.id === stock.id ? stock : s)) }));
  },

  deleteStock: async (stockId) => {
    const { stocks } = get();
    await deleteDoc(doc(db, "stocks", stockId));

    set(() => ({ stocks: stocks.filter((s) => s.id !== stockId) }));
  },

  selectStock: (stock) => {
    set(() => ({
      selectedStock: stock,
    }));
  },
}));
