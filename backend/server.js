// main server

const express = require("express");
const cors = require("cors");

const { getDiskUsage } = require("./disk");
const { predictStorage } = require("./predict");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.variables||8000;

app.get("/", (req, res) => {
    res.json({ message: "StorageSense AI Backend Running" });
});


app.get("/api/storage/current", async (req, res) => {
    const data = await getDiskUsage();
    res.json(data);
});

app.get("/api/storage/predict", async (req, res) => {
    const data = await predictStorage();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
