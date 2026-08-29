import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

export function initAuth(auth, elements) {
  const {
    form,
    emailInput,
    passwordInput,
    status,
    signedInPanel,
    loginButton,
    signupButton,
    logoutButton
  } = elements;

  let currentUser = null;

  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    const signedIn = Boolean(user);
    form.hidden = false;
    emailInput.disabled = signedIn;
    passwordInput.disabled = signedIn;
    loginButton.hidden = signedIn;
    signupButton.hidden = signedIn;
    logoutButton.hidden = !signedIn;
    signedInPanel.hidden = !signedIn;
    signedInPanel.textContent = signedIn
      ? `Login sebagai ${user.email}`
      : "";
    if (signedIn) status.textContent = "";
  });

  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    status.textContent = "Memproses login...";
    try {
      await signInWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value);
      status.textContent = "";
    } catch (error) {
      status.textContent = authErrorMessage(error);
    }
  });

  signupButton.addEventListener("click", async () => {
    status.textContent = "Membuat akun...";
    try {
      await createUserWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value);
      status.textContent = "";
    } catch (error) {
      status.textContent = authErrorMessage(error);
    }
  });

  logoutButton.addEventListener("click", async () => {
    await signOut(auth);
    status.textContent = "Anda sudah keluar.";
  });

  return () => currentUser;
}

function authErrorMessage(error) {
  const messages = {
    "auth/invalid-email": "Format email belum benar.",
    "auth/missing-password": "Masukkan password.",
    "auth/weak-password": "Password minimal 6 karakter.",
    "auth/email-already-in-use": "Email ini sudah terdaftar.",
    "auth/invalid-credential": "Email atau password salah.",
    "auth/network-request-failed": "Koneksi internet bermasalah."
  };
  return messages[error.code] || "Login belum berhasil. Periksa pengaturan Firebase Authentication.";
}