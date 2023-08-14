import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
const serviceAccount = require("./serviceAccountKey.json");

const firebase = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(firebase);

export default db;
