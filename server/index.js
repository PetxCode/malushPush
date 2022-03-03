const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3899;

const url = "mongodb://localhost/ElectionServer";

mongoose.connect(url).then(() => {
  console.log("Database is now connected");
});

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to this election App" });
});

app.use("/api", require("./router/userRoute"));
app.use("/api/president", require("./router/presidentRoute"));

app.listen(port, () => {
  console.log(`server is ready: ${port}`);
});
