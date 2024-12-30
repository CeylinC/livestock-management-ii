import { create } from "zustand";
import { ISale } from "../models";
import { addDoc, deleteDoc, doc, getDocs, limit, orderBy, query, startAfter, updateDoc } from "firebase/firestore";
import { col_sales, db } from "../services/firebase/firebase";
import { Sale } from "../classes";

interface SaleState {
  sales: ISale[];
  selectedSale: ISale | null;
  totalCount: number;
  lastData: any | null;
  getSales: () => void;
  fetchInitialData: (pageSize: number) => void;
  fetchPage: (pageSize: number, pageNumber: number) => void;
  setSale: (sale: ISale) => void;
  updateSale: (sale: ISale) => void;
  deleteSale: (saleId: string) => void;
  selectSale: (sale: ISale | null) => void;
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: [],
  selectedSale: null,
  totalCount: 0,
  lastData: null,

  getSales: async () => {
    const temp: ISale[] | null = [];

    const qs = await getDocs(col_sales);
    qs.forEach((doc) => {
      temp.push(new Sale({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ sales: temp }));
  },

  fetchInitialData: async (pageSize: number) => {
    const temp: ISale[] | null = [];
    const ss = await getDocs(col_sales);
    let lastDataCreateAt: any;

    const q = query(col_sales, orderBy("createdAt", "desc"), limit(pageSize));
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      temp.push(new Sale({ ...doc.data(), id: doc.id }));
      lastDataCreateAt = doc.data().createdAt;
    });

    set(() => ({
      totalCount: ss.size,
      sales: temp,
      lastData: lastDataCreateAt,
    }));
  },

  fetchPage: async (pageSize: number, pageNumber: number) => {
    const { lastData } = get();
    const temp: ISale[] = [];
    let q: any;
    let lastDataCreateAt: any;

    if (pageNumber === 1) {
      q = query(col_sales, orderBy("createdAt", "desc"), limit(pageSize));
    } else {
      q = query(
        col_sales,
        orderBy("createdAt", "desc"),
        startAfter(lastData),
        limit(pageSize)
      );
    }
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      const data = doc.data() as ISale;
      temp.push(new Sale({ ...data, id: doc.id }));
      lastDataCreateAt = data.createdAt;
    });

    set(() => ({ sales: temp, lastData: lastDataCreateAt }));
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
      createdAt: new Date(),
    });

    set(() => ({ sales: [{ ...sale, id: data.id }, ...sales] }));
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
