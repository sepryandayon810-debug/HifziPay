/*
  TEMPEL FIREBASE WEB CONFIG DI FILE INI.

  Ambil dari:
  Firebase Console
  -> Project settings
  -> General
  -> Your apps
  -> Firebase SDK snippet
  -> Config

  Ini adalah Web Config, bukan Service Account JSON.
  Web Config boleh berada di GitHub, tetapi Firestore Security Rules
  tetap wajib dikunci dengan benar.
*/
export const firebaseConfig = {
  apiKey: "TEMPEL_API_KEY_DI_SINI",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.firebasestorage.app",
  messagingSenderId: "TEMPEL_MESSAGING_SENDER_ID",
  appId: "TEMPEL_APP_ID"
};