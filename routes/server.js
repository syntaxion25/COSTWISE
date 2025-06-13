// server.js
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

app.post("/api/ai-insights", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.together.xyz/inference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "No insights found.";
    res.json({ insights: message });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch AI insights" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
