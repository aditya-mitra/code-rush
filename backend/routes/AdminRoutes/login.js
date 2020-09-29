const { Router } = require("express");
const router = Router();

router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/login.html"));
});

router.post("/login", function (req, res) {
  res.send(req.body);
});

module.exports = router;
