import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyAfr7GmqwbBVhhM2TYAOpx1fxsOfo0WipI",
  authDomain: "cartoontime-18b7a.firebaseapp.com",
  projectId: "cartoontime-18b7a",
  storageBucket: "cartoontime-18b7a.appspot.com",
  messagingSenderId: "248594654107",
  appId: "1:248594654107:web:885725f2341333ee02f73e",
  measurementId: "G-MEG2BP83XS",
};

// Firebase 초기화
const firebaseapp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseapp);

export { firestore };
