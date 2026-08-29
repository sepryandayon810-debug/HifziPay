// Contoh price list untuk UI. Pada produksi, ganti dengan data dari backend/Digiflazz.
export const productMenus = {
  "Pulsa": {
    "Telkomsel": [
      { code: "TSEL10", name: "Pulsa Telkomsel 10.000", price: 11000 },
      { code: "TSEL25", name: "Pulsa Telkomsel 25.000", price: 26000 },
      { code: "TSEL50", name: "Pulsa Telkomsel 50.000", price: 51000 }
    ],
    "Indosat": [
      { code: "ISAT10", name: "Pulsa Indosat 10.000", price: 11000 },
      { code: "ISAT25", name: "Pulsa Indosat 25.000", price: 26000 },
      { code: "ISAT50", name: "Pulsa Indosat 50.000", price: 51000 }
    ],
    "XL": [
      { code: "XL10", name: "Pulsa XL 10.000", price: 11000 },
      { code: "XL25", name: "Pulsa XL 25.000", price: 26000 },
      { code: "XL50", name: "Pulsa XL 50.000", price: 51000 }
    ],
    "Tri": [
      { code: "TRI10", name: "Pulsa Tri 10.000", price: 11000 },
      { code: "TRI25", name: "Pulsa Tri 25.000", price: 26000 },
      { code: "TRI50", name: "Pulsa Tri 50.000", price: 51000 }
    ],
    "Smartfren": [
      { code: "SF10", name: "Pulsa Smartfren 10.000", price: 11000 },
      { code: "SF25", name: "Pulsa Smartfren 25.000", price: 26000 },
      { code: "SF50", name: "Pulsa Smartfren 50.000", price: 51000 }
    ]
  },
  "Paket Data": {
    "Telkomsel": [
      { code: "DATA-TS-5", name: "Paket Data Telkomsel 5 GB", price: 26000 },
      { code: "DATA-TS-10", name: "Paket Data Telkomsel 10 GB", price: 46000 }
    ],
    "Indosat": [
      { code: "DATA-IS-5", name: "Paket Data Indosat 5 GB", price: 24000 },
      { code: "DATA-IS-10", name: "Paket Data Indosat 10 GB", price: 44000 }
    ],
    "XL": [
      { code: "DATA-XL-5", name: "Paket Data XL 5 GB", price: 25000 },
      { code: "DATA-XL-10", name: "Paket Data XL 10 GB", price: 45000 }
    ]
  },
  "Token Listrik": {
    "PLN Prabayar": [
      { code: "PLN20", name: "Token PLN 20.000", price: 22000 },
      { code: "PLN50", name: "Token PLN 50.000", price: 52000 },
      { code: "PLN100", name: "Token PLN 100.000", price: 102000 }
    ]
  },
  "Tagihan": {
    "PLN Pascabayar": [{ code: "PLN-TAGIHAN", name: "Cek tagihan PLN", price: 2500 }],
    "Telkom": [{ code: "TELKOM-TAGIHAN", name: "Cek tagihan Telkom", price: 2500 }]
  },
  "E-Wallet": {
    "DANA": [
      { code: "DANA20", name: "Top up DANA 20.000", price: 21500 },
      { code: "DANA50", name: "Top up DANA 50.000", price: 51500 }
    ],
    "OVO": [
      { code: "OVO20", name: "Top up OVO 20.000", price: 21500 },
      { code: "OVO50", name: "Top up OVO 50.000", price: 51500 }
    ],
    "GoPay": [
      { code: "GOPAY20", name: "Top up GoPay 20.000", price: 21500 },
      { code: "GOPAY50", name: "Top up GoPay 50.000", price: 51500 }
    ],
    "ShopeePay": [
      { code: "SHOPEE20", name: "Top up ShopeePay 20.000", price: 21500 },
      { code: "SHOPEE50", name: "Top up ShopeePay 50.000", price: 51500 }
    ]
  },
  "Voucher Game": {
    "Mobile Legends": [
      { code: "ML86", name: "Mobile Legends 86 Diamonds", price: 23000 },
      { code: "ML172", name: "Mobile Legends 172 Diamonds", price: 45000 }
    ],
    "Free Fire": [
      { code: "FF70", name: "Free Fire 70 Diamonds", price: 12000 },
      { code: "FF140", name: "Free Fire 140 Diamonds", price: 23000 }
    ],
    "PUBG Mobile": [
      { code: "PUBG60", name: "PUBG Mobile 60 UC", price: 18000 },
      { code: "PUBG325", name: "PUBG Mobile 325 UC", price: 80000 }
    ]
  },
  "BPJS": {
    "BPJS Kesehatan": [{ code: "BPJS-TAGIHAN", name: "Cek tagihan BPJS", price: 2500 }]
  },
  "PDAM": {
    "PDAM": [{ code: "PDAM-TAGIHAN", name: "Cek tagihan PDAM", price: 2500 }]
  }
};