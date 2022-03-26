require("dotenv").config();
require("./config/passport");

const db = require("./models/index");
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const real_estateRoutes = require("./routes/real_estate");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static("public/images"));

app.use("/user", userRoutes);
app.use("/real_estate", real_estateRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "resource not found on this server" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

//force: true  =  DROP TABLE IF EXISTS
db.sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
  });
});
