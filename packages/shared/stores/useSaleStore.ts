import { create } from "zustand";
import { ISale } from "../models";
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { col_sales, db } from "../services/firebase/firebase";
import { Sale } from "../classes";

interface SaleState {
  sales: ISale[];
  selectedSale: ISale | null;
  getSales: () => void;
  setSale: (sale: ISale) => void;
  updateSale: (sale: ISale) => void;
  deleteSale: (saleId: string) => void;
  selectSale: (sale: ISale | null) => void;
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: [],
  selectedSale: null,

  getSales: async () => {
    const temp: ISale[] | null = [];

    const qs = await getDocs(col_sales);
    qs.forEach((doc) => {
      temp.push(new Sale({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ sales: temp }));
  },

  setSale: async (sale) => {
    const { sales } = get();

    const data = await addDoc(col_sales, {
      name: sale.name,
      type: sale.type,
      category: sale.category,
      amount: sale.amount,
      price: sale.price,
      saleDate: sale.saleDate.toString(),
      recipientName: sale.recipientName,
      contact: sale.contact,
      paymentState: sale.paymentState,
      paymentDate: sale.paymentDate.toString(),
    });

    set(() => ({ sales: [...sales, { ...sale, id: data.id }] }));
  },

  updateSale: async (sale) => {
    const { sales } = get();
    const docRef = doc(db, "sales", sale.id);

    await updateDoc(docRef, {
      name: sale.name,
      type: sale.type,
      category: sale.category,
      amount: sale.amount,
      price: sale.price,
      saleDate: sale.saleDate.toString(),
      recipientName: sale.recipientName,
      contact: sale.contact,
      paymentState: sale.paymentState,
      paymentDate: sale.paymentDate.toString(),
    });

    set(() => ({ sales: sales.map((s) => (s.id === sale.id ? sale : s)) }));
  },

  deleteSale: async (saleId) => {
    const { sales } = get();
    await deleteDoc(doc(db, "sales", saleId));

    set(() => ({ sales: sales.filter((s) => s.id !== saleId) }));
  },

  selectSale: (sale) => {
    set(() => ({
      selectedSale: sale,
    }));
  },
}));
