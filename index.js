const express = require("express");
require("dotenv").config();
const { sequelize } = require("./src/models");

const app = express();
app.use(express.json());

const authorRoutes = require("./src/routes/authorRoutes");
const postRoutes = require("./src/routes/postRoutes");

app.use("/authors", authorRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database error:", error);
  }
})();
