const firebase = require("firebase");

const { admin, db } = require("./admin");

const FBAuth = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("Nenhum token encontrado");
    return res.status(403).json({ error: "Não autorizado" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      db.collectionGroup("users")
        .where("id", "==", req.user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            req.user.companyId = doc.data().companyId;
            req.user.companyName = doc.data().companyName;
            req.user.name = doc.data().name;
          });
        })
        .then(() => {
          return next();
        })
        .catch((err) => {
          console.error("Erro ao verificar token, ", err);
          return res.status(403).json(err);
        });
    })
    .catch((err) => {
      console.error("Erro ao verificar token, ", err);
      return res.status(403).json(err);
    });
};

module.exports = { FBAuth };
