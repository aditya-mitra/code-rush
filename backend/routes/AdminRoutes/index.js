const sessions = require("client-sessions");
const { Router } = require("express");
const router = Router();

const adminPanel = require("./admin");

//const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//    cookieName: process.env.ADMIN_COOKIE_NAME,
//    cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
//    authenticate: async (email, password) => {
//        if (admin.email === email && admin.password === password) return admin;
//        else return null;
//    }
//})

router.use(
  sessions({
    cookieName: "adminSession",
    secret: process.env.ADMIN_COOKIE_SECRET,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    cookie: {
      path: "/admin",
      ephemeral: false, // expire on browser close set to false
    },
  })
);

router.use(function (req, res, next) {
  if (req.adminSession.authenticated) {
    next();
  } else {
    console.log(
      req.query.credit,
      process.env.ADMIN_CREDIT,
      req.query.credit === process.env.ADMIN_CREDIT
    );
    if (req.query && req.query.credit === process.env.ADMIN_CREDIT) {
      req.adminSession.authenticated = true;
      next();
    } else {
      res.send(
        "try logging using the right way. Contact admin for more details"
      );
    }
  }
});

router.use("/panel", adminPanel);

module.exports = router;
