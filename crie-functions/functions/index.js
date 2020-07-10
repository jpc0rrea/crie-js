const functions = require("firebase-functions");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());

const { db } = require("./utils/admin");

const { signup, login } = require("./handlers/users");
const { ideas } = require("./handlers/ideas");

const { FBAuth } = require("./utils/fbAuth");

// user routes
app.post("/signup", signup);
app.post("/login", login);

// ideas routes
app.get("/ideas", FBAuth, ideas);

exports.api = functions.https.onRequest(app);
