const { db } = require("../utils/admin.js");

const scoreTable = require("../utils/scoreTable");

exports.getIdeas = (req, res) => {
  let ideas = [];
  db.collection(`ideas`)
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        ideas.push(doc.data());
      });
      return res.json({ ideas });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.createIdea = (req, res) => {
  // To Do: Mudar a quantidade de ideias do setor do usuário
  let name = req.body.name.trim();
  let description = req.body.description.trim();
  let anonymous = req.body.anonymous;
  let area = req.body.area.trim();

  const ideaCredentials = {
    name,
    description,
    area,
    anonymous,
    author: `${req.user.name} ${req.user.lastName}`,
    authorId: req.user.uid,
    companyId: req.user.companyId,
    score: scoreTable["Em análise"],
    createdAt: new Date().toISOString(),
    status: "Em análise",
  };

  db.collection("ideas")
    .add(ideaCredentials)
    .then((doc) => {
      let docId = doc.id;
      // Adicionar o score da nova ideia ao usuário que criou a mesma
      db.doc(`/users/${req.user.uid}`)
        .update({
          score: req.user.score + ideaCredentials.score,
          ideasQuantity: req.user.ideasQuantity + 1,
        })
        .then(() => {
          db.collection(`companies/${req.user.companyId}/areas`)
            .where("name", "==", area)
            .get()
            .then((querySnapshot) => {
              const areaId = querySnapshot[0].id;
              const oldIdeasQuantity = querySnapshot[0].data().ideasQuantity;
              db.doc(`companies/${req.user.companyId}/areas/${areaId}`)
                .update({ ideasQuantity: oldIdeasQuantity + 1 })
                .then(() => {
                  return res
                    .status(201)
                    .json({ message: `Ideia com id ${docId} com sucesso` });
                })
                .catch((err) => {
                  console.error(err);
                  return res.status(500).json({ error: err.code });
                });
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: err.code });
            });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.code });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getIdeaDetail = (req, res) => {
  let commentList = [];
  db.doc(`/ideas/${req.params.ideaId}`)
    .get()
    .then((querySnapshot) => {
      const ideaInformation = {
        ideaId: querySnapshot.id,
        name: querySnapshot.data().name,
        description: querySnapshot.data().description,
        area: querySnapshot.data().area,
        companyId: querySnapshot.data().companyId,
        author: querySnapshot.data().author,
        authorId: querySnapshot.data().authorId,
        score: querySnapshot.data().score,
        status: querySnapshot.data().status,
        createdAt: querySnapshot.data().createdAt,
        anonymous: querySnapshot.data().anonymous,
      };
      if (ideaInformation.anonymous) {
        ideaInformation.author = "Anônimo";
        ideaInformation.authorId = 0;
      }

      db.collection("comments")
        .where("ideaId", "==", req.params.ideaId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((commentDoc) => {
            commentList.push(commentDoc.data());
          });
          ideaInformation.comments = commentList;
          return res.json({
            ideaInformation,
          });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.code });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getLastIdeas = (req, res) => {
  let ideaList = [];
  let companyId = req.user.companyId;

  db.collection("ideas")
    .where("companyId", "==", companyId)
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        ideaList.push(doc.data());
      });
      ideaList.forEach((idea) => {
        if (idea.anonymous) {
          (idea.author = "Anônimo"), (idea.authorId = 0);
        }
      });
      return res.json({ ideaList });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.changeIdeaStatus = (req, res) => {
  const newStatus = req.body.status;
  const newIdeaScore = scoreTable[newStatus];
  let oldIdeaScore = 0;

  let ideaOwnerId = "";
  let ideaOwnerOldScore = 0;

  db.doc(`/ideas/${req.params.ideaId}`)
    .get()
    .then((documentSnapshot) => {
      ideaOwnerId = documentSnapshot.data().authorId;
      oldIdeaScore = documentSnapshot.data().score;

      db.doc(`/ideas/${req.params.ideaId}`)
        .update({
          status: req.body.status,
          score: newIdeaScore,
        })
        .then(() => {
          db.doc(`/users/${ideaOwnerId}`)
            .get()
            .then((documentSnapshot) => {
              ideaOwnerOldScore = documentSnapshot.data().score;
              db.doc(`/users/${ideaOwnerId}`)
                .update({
                  score: ideaOwnerOldScore + newIdeaScore - oldIdeaScore,
                })
                .then(() => {
                  return res.json({
                    message: "Status da ideia alterado com sucesso",
                  });
                })
                .catch((err) => {
                  console.error(err);
                  return res.status(500).json({ error: err.code });
                });
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: err.code });
            });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.code });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
