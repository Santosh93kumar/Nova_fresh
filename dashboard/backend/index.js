const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./App/route/auth");
const { mainRoute } = require("./App/mainRoute");

const dotenv = require("dotenv")
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT)


app.use(
  cors({
    origin: [process.env.FRONTEND_URL_1,process.env.FRONTEND_URL_2,"https://nova-fresh-ecommerice.onrender.com/","https://nava-fresh-admin-frontend.onrender.com" ],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.use(mainRoute);
app.use("/api/auth", userRouter)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`Server started on ${process.env.PORT}:${PORT}`);
});