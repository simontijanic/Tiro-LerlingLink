const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
