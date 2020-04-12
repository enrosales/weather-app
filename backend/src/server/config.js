const express = require("express");
const path = require("path");
const morgan = require("morgan");
const routes = require("../routes/index");
const cors = require('cors');

module.exports = app => {
  //Puerto de mi app
  app.set("port", process.env.PORT || 4000);
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  //cargando las rutas de mi app
  routes(app);
  app.use("/public", express.static(path.join(__dirname,'../', "./public")));

  return app;
};
