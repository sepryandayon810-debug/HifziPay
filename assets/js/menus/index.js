import { pulsaMenus } from "./pulsa.js";
import { listrikMenus } from "./listrik.js";
import { tagihanMenus } from "./tagihan.js";
import { digitalMenus } from "./digital.js";

// Satu katalog agar tombol di index.html tetap punya nama menu yang konsisten.
export const serviceCopy = {
  ...pulsaMenus,
  ...listrikMenus,
  ...tagihanMenus,
  ...digitalMenus
};