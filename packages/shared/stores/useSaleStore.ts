import { create } from "zustand";
import { ISale } from "../models";
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
  where,
} from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import { Sale } from "../classes";

interface SaleState {
  sales: ISale[];
  selectedSale: ISale | null;
  totalCount: number;
  lastData: any | null;
  getSales: (uid: string) => void;
  fetchInitialData: (pageSize: number, uid: string) => void;
  fetchPage: (pageSize: number, pageNumber: number, uid: string) => void;
  setSale: (sale: ISale, uid: string) => void;
  updateSale: (sale: ISale, uid: string) => void;
  deleteSale: (saleId: string, uid: string) => void;
  selectSale: (sale: ISale | null) => void;
  getTotalCount: (uid: string) => Promise<boolean>;
  getCategorizedDataCount: (uid: string, type: string) => Promise<null | number>;
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: [],
  selectedSale: null,
  totalCount: 0,
  lastData: null,

  getSales: async (uid) => {
    const temp: ISale[] | null = [];

    const qs = await getDocs(collection(doc(db, "users", uid), "sales"));
    qs.forEach((doc) => {
      temp.push(new Sale({ ...doc.data(), id: doc.id }));
    });

    set(() => ({ sales: temp }));
  },

  fetchInitialData: async (pageSize, uid) => {
    const { getTotalCount } = get();
    const temp: ISale[] | null = [];
    let lastDataCreateAt: any;

    await getTotalCount(uid);

    const q = query(
      collection(doc(db, "users", uid), "sales"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      temp.push(new Sale({ ...doc.data(), id: doc.id }));
      lastDataCreateAt = doc.data().createdAt;
    });

    set(() => ({
      sales: temp,
      lastData: lastDataCreateAt,
    }));
  },

  fetchPage: async (pageSize, pageNumber, uid) => {
    const { lastData } = get();
    const temp: ISale[] = [];
    let q: any;
    let lastDataCreateAt: any;

    if (pageNumber === 1) {
      q = query(
        collection(doc(db, "users", uid), "sales"),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    } else {
      q = query(
        collection(doc(db, "users", uid), "sales"),
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

  setSale: async (sale, uid) => {
    const { sales } = get();

    const data = await addDoc(collection(doc(db, "users", uid), "sales"), {
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

  updateSale: async (sale, uid) => {
    const { sales } = get();
    const docRef = doc(db, "users", uid, "sales", sale.id);

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

  deleteSale: async (saleId, uid) => {
    const { sales } = get();
    await deleteDoc(doc(db, "users", uid, "sales", saleId));

    set(() => ({ sales: sales.filter((s) => s.id !== saleId) }));
  },

  selectSale: (sale) => {
    set(() => ({
      selectedSale: sale,
    }));
  },
  
    getTotalCount: async (uid) => {
      try {
        const ss = await getDocs(collection(doc(db, "users", uid), "sales"));
        set(() => ({ totalCount: ss.size }));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  
    getCategorizedDataCount: async (uid, type) => {
      const ss = collection(doc(db, "users", uid), "sales");
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
