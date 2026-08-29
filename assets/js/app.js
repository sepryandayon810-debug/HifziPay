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
// Fallback ini membuat UI tetap berjalan jika GitHub masih menyimpan index.js versi lama.
let serviceCopy = {
  "Pulsa": ["Beli Pulsa", "Masukkan nomor HP dan pilih nominal."],
  "Paket Data": ["Beli Paket Data", "Masukkan nomor HP dan pilih paket."],
  "Token Listrik": ["Beli Token Listrik", "Masukkan nomor meter atau ID pelanggan."],
  "Tagihan": ["Bayar Tagihan", "Masukkan nomor pelanggan untuk mengecek tagihan."],
  "E-Wallet": ["Isi Saldo E-Wallet", "Pilih layanan dan nominal top up."],
  "Voucher Game": ["Voucher Game", "Masukkan user ID dan pilih nominal voucher."],
  "BPJS": ["Bayar BPJS", "Masukkan nomor peserta BPJS Anda."],
  "PDAM": ["Bayar PDAM", "Masukkan nomor pelanggan PDAM Anda."]
};
let productMenus = {};
let selectedProduct = null;
let activeService = null;

const fallbackProducts = {
  "Pulsa": { "Telkomsel": [{ code: "TSEL10", name: "Pulsa Telkomsel 10.000", price: 11000 }] },
  "Paket Data": { "Telkomsel": [{ code: "DATA-TS-5", name: "Paket Data Telkomsel 5 GB", price: 26000 }] },
  "Token Listrik": { "PLN Prabayar": [{ code: "PLN50", name: "Token PLN 50.000", price: 52000 }] },
  "Tagihan": { "PLN Pascabayar": [{ code: "PLN-TAGIHAN", name: "Cek tagihan PLN", price: 2500 }] },
  "E-Wallet": { "DANA": [{ code: "DANA20", name: "Top up DANA 20.000", price: 21500 }] },
  "Voucher Game": { "Mobile Legends": [{ code: "ML86", name: "Mobile Legends 86 Diamonds", price: 23000 }] },
  "BPJS": { "BPJS Kesehatan": [{ code: "BPJS-TAGIHAN", name: "Cek tagihan BPJS", price: 2500 }] },
  "PDAM": { "PDAM": [{ code: "PDAM-TAGIHAN", name: "Cek tagihan PDAM", price: 2500 }] }
};
productMenus = fallbackProducts;

// Jika katalog modular tersedia, gunakan versi tersebut. Jika belum ter-upload,
// fallback di atas tetap membuat semua tombol menu berfungsi.
import("./menus/index.js?v=2")
  .then((menuModule) => {
    if (menuModule.serviceCopy) serviceCopy = menuModule.serviceCopy;
  })
  .catch((error) => {
    console.warn("Katalog menu modular belum tersedia; memakai fallback.", error);
  });
import("./menus/products.js?v=2")
  .then((productModule) => {
    if (productModule.productMenus) productMenus = productModule.productMenus;
  })
  .catch((error) => {
    console.warn("Price list modular belum tersedia; memakai contoh fallback.", error);
  });
import("./firebase.js?v=1")
  .then(({ db }) => {
    // db tersedia untuk modul transaksi berikutnya tanpa menaruh credential di frontend.
    window.hifziFirebase = { db };
  })
  .catch((error) => {
    console.warn("Firebase belum aktif. UI tetap berjalan dalam mode demo.", error);
  });

const serviceModal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");
const providerSelect = document.getElementById("providerSelect");
const productList = document.getElementById("productList");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function openService(service) {
  activeService = service;
  const copy = serviceCopy[service] || serviceCopy["Pulsa"];
  modalTitle.textContent = copy[0];
  modalCaption.textContent = copy[1];
  document.getElementById("customerNumber").value = "";
  selectedProduct = null;
  const providers = Object.keys(productMenus[service] || fallbackProducts[service] || {});
  providerSelect.innerHTML = providers.map((provider) => `<option value="${provider}">${provider}</option>`).join("");
  renderProducts(service, providers[0]);
  serviceModal.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("customerNumber").focus(), 100);
}

function renderProducts(service, provider) {
  const products = (productMenus[service] || fallbackProducts[service] || {})[provider] || [];
  selectedProduct = products[0] || null;
  productList.innerHTML = products.map((product, index) => `
    <button class="product-option${index === 0 ? " selected" : ""}" type="button" data-product-code="${product.code}">
      <span><span class="product-name">${product.name}</span><span class="product-code">Kode: ${product.code}</span></span>
      <span class="product-price">Rp ${product.price.toLocaleString("id-ID")}</span>
    </button>
  `).join("");
  productList.querySelectorAll("[data-product-code]").forEach((button) => {
    button.addEventListener("click", () => {
      productList.querySelectorAll(".product-option").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      selectedProduct = products.find((product) => product.code === button.dataset.productCode);
    });
  });
}

function closeModal() {
  serviceModal.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => openService(button.dataset.service));
});

providerSelect.addEventListener("change", () => {
  if (activeService) renderProducts(activeService, providerSelect.value);
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
          if (!selectedProduct) {
            showToast("Pilih provider dan produk terlebih dahulu.");
            return;
          }
          showToast(`Demo: ${selectedProduct.name} siap dikirim ke backend.`);
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