const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const menuRoutes = require("./routes/menuRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());

app.use("/api/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});