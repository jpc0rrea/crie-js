const { db } = require("../utils/admin.js");

exports.createNotification = (req, res) => {
  let ownerId = req.body.ownerId.trim();
  let origin = req.body.origin.trim();
  let type = req.body.type.trim();
  let actualState = "";
  let lastState = "";

  if (type === "status") {
    actualState = req.body.actualState.trim();
    lastState = req.body.lastState.trim();
  }

  const notificationCredentials = {
    actualState,
    authorFullName: `${req.user.name} ${req.user.lastName}`,
    authorId: req.user.uid,
    createdAt: new Date().toISOString(),
    lastState,
    origin,
    ownerId,
    type,
    viewed: false,
  };
  db.collection("notifications")
    .add(notificationCredentials)
    .then((doc) => {
      return res.json({ message: "Notificação criada com sucesso" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
