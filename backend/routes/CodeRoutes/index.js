const { Router } = require("express");
const router = Router();

const submitRoute = require("./submit");
const runRoute = require("./run");

router.use((req, res, next) => {
  // check for login of the user
  console.log("log in required");
  next();
});

router.use("/submit", submitRoute);
router.use("/run", runRoute);

module.exports = router;
