require("dotenv").config()

const express = require("express")
const path = require("path");

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", ("views"));

app.use("/auth", require("./routes/userAuth"));
app.use("/organization", require("./routes/organizationAuth"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});