import { create } from "zustand";
import { IStock } from "../models";
import { getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { col_stocks, db } from "../services/firebase/firebase";
import { Stock } from "../classes";

interface StockState {
  stocks: IStock[];
  selectedStock: IStock | null;
  getStocks: () => void;
  setStock: (stock: IStock) => void;
  updateStock: (stock: IStock) => void;
  deleteStock: (stockId: string) => void;
  selectStock: (stock: IStock | null) => void;
}

export const useStockStore = create<StockState>((set, get) => ({
  stocks: [],
  selectedStock: null,

  getStocks: async () => {
    const temp: IStock[] | null = [];

    const qs = await getDocs(col_stocks);
    qs.forEach((doc) => {
      temp.push(new Stock({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ stocks: temp }));
  },

  setStock: async (stock) => {
    const { stocks } = get();

    const data = await addDoc(col_stocks, {
      name: stock.name,
      category: stock.category,
      amount: stock.amount,
      dealer: stock.dealer,
      storage: stock.storage,
    });

    set(() => ({ stocks: [...stocks, { ...stock, id: data.id }] }));
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
