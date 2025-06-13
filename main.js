const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.static("public"));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile('/public/test.html', { root: __dirname });
});

// Optional: Basic POST for testing
app.post('/', (req, res) => {
  console.log("POST to /");
  res.send("hello post");
});

// ✅ This is your real Together AI route
app.post('/api/get-insight', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const aiOutput = response.data.choices[0].message.content;
    res.json({ insight: aiOutput });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
