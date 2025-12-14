import express from "express";

const app = express();
app.use(express.json());

// 1) Verification (Meta will call this once)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // 🔴 ضع هنا نفس verify token الذي ستكتبه في Meta
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "gemini_verify_2025";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// 2) Incoming messages (Meta sends events here)
app.post("/webhook", (req, res) => {
  console.log("Webhook event received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});


// Health check
app.get("/", (req, res) => {
  res.status(200).send("OK - WhatsApp Webhook is running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
