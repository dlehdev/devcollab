require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
  })
  .catch((error) => {
    console.log("MongoDB connection error ❌", error);
  });

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("DevCollab Server is running 🚀");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "DevCollab API is working 🚀"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
