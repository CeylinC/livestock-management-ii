import { collection, getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";

export const db = getFirestore(app);

//collections
export const col_stocks = collection(db, "stocks");
export const col_sales = collection(db, "sales");
export const col_barns = collection(db, "barns");
export const col_animals = collection(db, "animals");
