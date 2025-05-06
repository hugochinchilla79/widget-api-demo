// pages/api/checkout.js
import axios from "axios";
import https from "https";
import config from "../../config/widget-config.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { client_id, client_secret, api_base_url } = config;
  const payload = req.body;

  try {
    const axiosInstance = axios.create({
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    const tokenResponse = await axiosInstance.post(
      `${api_base_url}/api/token`,
      {
        client_id,
        client_secret,
      }
    );

    const token = tokenResponse.data.token;

    const setupResponse = await axiosInstance.post(
      `${api_base_url}/api/setup-payer`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Origin: req.headers.origin || "",
        },
      }
    );
    return res.status(200).json(setupResponse.data);
  } catch (err) {
    console.error("Checkout Error:", err.message);
    return res
      .status(500)
      .json({ error: "Checkout failed", details: err.message });
  }
}
