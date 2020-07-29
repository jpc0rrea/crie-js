const firebase = require("firebase");

const { admin, db } = require("./admin");

const FBAuthAdmin = (req, res, next) => {
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
      db.collection("users")
        .where("id", "==", req.user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            req.user.companyId = doc.data().companyId;
            req.user.companyName = doc.data().companyName;
            req.user.name = doc.data().name;
            req.user.lastName = doc.data().lastName;
            req.user.score = doc.data().score;
            req.user.role = doc.data().role;
            req.user.ideasQuantity = doc.data().ideasQuantity;
            req.user.areaId = doc.data().areaId;
            req.user.area = doc.data().area;
          });
          if (req.user.role !== "admin") {
            console.error("Permissão de administrador necessária.");
            return res.status(403).json({
              error: "Não autorizado - permissão de administrador necessária",
            });
          }
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

module.exports = { FBAuthAdmin };
