/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const express = require("express");
const path = require('path');
const morgan = require("morgan");
const router = require("../../config/routes");
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser'); 

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//use kuki
app.use(cookieParser());

//setting public untuk static asset
app.use(express.static('app/public'));
// setting folder ejs nya
app.set('views', path.join(__dirname, '../views'));
app.set('view engine','ejs');
/** Install Router */
app.use(router);
module.exports = app;
