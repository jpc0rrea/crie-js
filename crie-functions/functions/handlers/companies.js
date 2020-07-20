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
