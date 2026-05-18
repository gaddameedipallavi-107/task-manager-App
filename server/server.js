const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./db");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});