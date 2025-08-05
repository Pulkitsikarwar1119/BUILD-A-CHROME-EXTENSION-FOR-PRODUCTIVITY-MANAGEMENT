const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://<USERNAME:<Password>@productivityapp.omh63du.mongodb.net/productivity', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Mongoose Log model
const LogSchema = new mongoose.Schema({
  domain: String,
  start: Number,
  end: Number,
  duration: Number,
  userId: String,
  date: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', LogSchema);

// POST: Save a log
app.post('/api/log', async (req, res) => {
  const { domain, start, end, duration, userId } = req.body;
  try {
    const newLog = await Log.create({ domain, start, end, duration, userId });
    res.status(201).send({ success: true, log: newLog });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: "Failed to save log" });
  }
});

// GET: Get all logs
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await Log.find({});
    res.send(logs);
  } catch (err) {
    res.status(500).send({ error: "Failed to retrieve logs" });
  }
});

// GET: Productivity report by user
app.get('/api/report/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const logs = await Log.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$domain",
          totalTime: { $sum: "$duration" },
          visits: { $sum: 1 }
        }
      },
      { $sort: { totalTime: -1 } }
    ]);

    res.json({
      userId,
      generatedAt: new Date(),
      summary: logs
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

// Start server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
