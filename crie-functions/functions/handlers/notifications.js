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

exports.changeNotificationStatus = (req, res) => {
  const userId = req.user.uid;

  db.doc(`/notifications/${req.params.notificationId}`)
    .get()
    .then((documentSnapshot) => {
      const ownerId = documentSnapshot.data().ownerId;

      if (ownerId === userId) {
        db.doc(`/notifications/${req.params.notificationId}`)
          .update({ viewed: true })
          .then(() => {
            return res.json({ message: "A notificação foi visualizada." });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
      } else {
        return res
          .status(403)
          .json({ message: "Você não é o dono da notificação" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getNotifications = (req, res) => {
  let notificationsViewed = [];
  let notificationsNotViewed = [];
  const userId = req.user.uid;

  db.collection("notifications")
    .where("ownerId", "==", userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let viewed = doc.data().viewed;

        if (viewed === false) {
          notificationsNotViewed.push(doc.data());
        } else {
          notificationsViewed.push(doc.data());
        }
      });
      return res.json({ notificationsViewed, notificationsNotViewed });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
