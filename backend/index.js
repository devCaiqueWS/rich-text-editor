const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/rich-text-editor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const RichTextSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const RichText = mongoose.model("RichText", RichTextSchema);

app.post("/save", async (req, res) => {
  try {
    const { content } = req.body;
    const savedContent = new RichText({ content });
    await savedContent.save();
    res.status(200).send("Content saved successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
