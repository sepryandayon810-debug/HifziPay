
const crypto = require("crypto");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const digiflazzUsername = defineSecret("DIGIFLAZZ_USERNAME");
const digiflazzApiKey = defineSecret("DIGIFLAZZ_API_KEY");

const DIGIFLAZZ_TOPUP_URL = "https://api.digiflazz.com/v1/transaction";

exports.digiflazzTopup = onRequest(
  {
    region: "asia-southeast2",
    cors: true,
    secrets: [digiflazzUsername, digiflazzApiKey]
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Gunakan method POST."
      });
    }

    const { buyer_sku_code, customer_no, ref_id, testing = true } = req.body || {};

    if (!buyer_sku_code || !customer_no || !ref_id) {
      return res.status(400).json({
        success: false,
        message: "buyer_sku_code, customer_no, dan ref_id wajib diisi."
      });
    }

    const username = digiflazzUsername.value();
    const apiKey = digiflazzApiKey.value();
    const sign = crypto
      .createHash("md5")
      .update(`${username}${apiKey}${ref_id}`)
      .digest("hex");

    try {
      const digiflazzResponse = await fetch(DIGIFLAZZ_TOPUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          buyer_sku_code,
          customer_no,
          ref_id,
          sign,
          testing: Boolean(testing)
        })
      });

      const result = await digiflazzResponse.json();
      return res.status(digiflazzResponse.ok ? 200 : 502).json({
        success: digiflazzResponse.ok,
        data: result.data || null,
        message: result.data?.message || "Respons diterima dari Digiflazz."
      });
    } catch (error) {
      console.error("Digiflazz request failed:", error);
      return res.status(502).json({
        success: false,
        message: "Backend tidak dapat terhubung ke Digiflazz."
      });
    }
  }
);
