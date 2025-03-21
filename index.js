require("dotenv").config()

const express = require("express")
const path = require("path");
const expressLayouts = require('express-ejs-layouts');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout", "./layouts/main");

app.use("/", require("./routes/default"));
app.use("/auth", require("./routes/userAuth"));
app.use("/organization", require("./routes/organizationAuth"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});