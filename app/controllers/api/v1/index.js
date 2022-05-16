/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const postController = require("./postController");
const homeController = require("./homeController");
const authController = require("./authController");
const adminController = require("./adminController");
const docsController = require("./docsController");

module.exports = {
  postController,
  homeController,
  authController,
  adminController,
  docsController,
};
