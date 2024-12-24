import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "e-commerce-project-404923.firebaseapp.com",
  projectId: "e-commerce-project-404923",
  storageBucket: "e-commerce-project-404923.appspot.com",
  messagingSenderId: "724711248779",
  appId: "1:724711248779:web:b6f83bee20466ef091158e",
};

export const firebaseApp = initializeApp(firebaseConfig);
