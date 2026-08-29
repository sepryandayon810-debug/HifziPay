import { serviceCopy } from "./menus/index.js";

/*
  KONFIGURASI PRODUKSI
  Frontend GitHub Pages hanya memanggil backend:

  const API_BASE_URL = "https://api-domain-anda.com";
  fetch(`${API_BASE_URL}/api/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productCode, customerNumber, paymentMethod })
  });

  Jangan pernah menaruh DIGIFLAZZ_USERNAME, DIGIFLAZZ_API_KEY,
  Firebase Admin SDK credential, atau secret payment gateway di file ini.
*/
const serviceModal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function openService(service) {
  const copy = serviceCopy[service] || serviceCopy["Pulsa"];
  modalTitle.textContent = copy[0];
  modalCaption.textContent = copy[1];
  document.getElementById("customerNumber").value = "";
  serviceModal.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("customerNumber").focus(), 100);
}

function closeModal() {
  serviceModal.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => openService(button.dataset.service));
});

document.querySelectorAll(".nominal").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nominal").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "close-modal") closeModal();
    if (action === "topup") showToast("Fitur isi saldo siap dihubungkan ke payment gateway.");
    if (action === "history") showToast("Riwayat transaksi akan tampil setelah Firebase terhubung.");
    if (action === "notification") showToast("Belum ada notifikasi baru.");
    if (action === "promo") showToast("Promo berhasil dipilih. Checkout untuk menggunakannya.");
    if (action === "all-services") showToast("Semua layanan PPOB akan tersedia di versi berikutnya.");
    if (action === "checkout") {
      const number = document.getElementById("customerNumber").value.trim();
      if (!number) {
        showToast("Masukkan nomor tujuan terlebih dahulu.");
        document.getElementById("customerNumber").focus();
        return;
      }
      showToast("Demo berhasil: transaksi siap dikirim ke backend.");
      closeModal();
    }
  });
});

document.querySelectorAll("[data-nav]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    if (button.dataset.nav !== "home") {
      showToast(`${button.textContent.trim()} akan tersedia setelah backend terhubung.`);
    }
  });
});

serviceModal.addEventListener("click", (event) => {
  if (event.target === serviceModal) closeModal();
});
