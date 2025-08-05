const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<Username>:<Password>@productivityapp.omh63du.mongodb.net/productivity', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const Log = mongoose.model('Logs', new mongoose.Schema({
  domain: String,
  start: Number,
  end: Number,
  duration: Number,
  userId: String,
}));

(async () => {
  const logs = await Log.find();
  console.log("📝 Logs:\n", logs);
  mongoose.disconnect();
})();
