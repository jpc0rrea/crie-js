const firebase = require("firebase");

const { db, admin } = require("../utils/admin.js");

exports.ideas = (req, res) => {
  console.log(req.user);
  return res.json({ userId: req.user.uid, userName: req.user.name });
};
