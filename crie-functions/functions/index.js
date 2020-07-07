const functions = require("firebase-functions");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());

const { db } = require("./utils/admin");

const { signup } = require("./handlers/users");

// user routes
app.post("/signup", signup);

exports.api = functions.https.onRequest(app);
