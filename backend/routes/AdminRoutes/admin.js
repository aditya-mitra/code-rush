const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

const mongoose = require("mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const admin = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin/panel",
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
