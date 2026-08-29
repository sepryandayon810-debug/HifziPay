import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const hasPlaceholder = Object.values(firebaseConfig).some((value) =>
  String(value).includes("TEMPEL_") || String(value).includes("PROJECT_ID")
);

export let firebaseApp = null;
export let auth = null;
export let db = null;

if (!hasPlaceholder) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  console.info("Firebase Auth dan Firestore siap digunakan.");
} else {
  console.info("Firebase belum dikonfigurasi. Isi assets/js/firebase-config.js.");
}