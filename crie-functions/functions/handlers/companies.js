const { db } = require("../utils/admin.js");

exports.getAreas = (req, res) => {
  let areaList = [];
  db.collection(`/companies/${req.user.companyId}/areas`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        areaList.push(doc.data());
      });
      return res.json({ areas: areaList });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.createArea = (req, res) => {
  let name = req.body.name.trim();

  const areaInfo = {
    name,
    employesQuantity: 0,
    ideasQuantity: 0,
  };

  db.collection(`/companies/${req.user.companyId}/areas/`)
    .where("name", "==", name)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        return res.status(400).json({ area: "Já existe este setor." });
      } else {
        db.collection(`/companies/${req.user.companyId}/areas/`)
          .add(areaInfo)
          .then((doc) => {
            let docId = doc.id;
            return res.json({
              sucess: `O setor com ID ${docId} foi criado com sucesso`,
            });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({
              error: `O setor não pode ser criado devido ao erro ${err.code}`,
            });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: `O setor não pode ser criado devido ao erro ${err.code}`,
      });
    });
};

exports.rankUsersByScore = (req, res) => {
  let rankUsers = [];
  let companyId = req.user.companyId;

  db.collection("users")
    .where("companyId", "==", companyId)
    .orderBy("score", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rankUsers.push(doc.data());
      });
      return res.json({ users: rankUsers });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.rankUsersByIdeas = (req, res) => {
  let rankUsersByIdeas = [];
  let companyId = req.user.companyId;

  db.collection("users")
    .where("companyId", "==", companyId)
    .orderBy("ideasQuantity", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rankUsersByIdeas.push(doc.data());
      });
      return res.json({ users: rankUsersByIdeas });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
