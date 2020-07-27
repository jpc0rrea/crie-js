const { db } = require("../utils/admin.js");

exports.createComment = (req, res) => {
  let body = req.body.body.trim();

  const commentCredentials = {
    body,
    ideaId: req.params.ideaId,
    authorName: `${req.user.name} ${req.user.lastName}`,
    authorId: req.user.uid,
    createdAt: new Date(),
  };

  if (body !== "") {
    db.collection("comments")
      .add(commentCredentials)
      .then((doc) => {
        return res.json({
          message: `Comentário com Id ${doc.id} criado com sucesso`,
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  } else {
    return res.status(403).json({ body: `Preencha o comentário` });
  }
};

exports.editComment = (req, res) => {
  const userId = req.user.uid;

  db.doc(`/comments/${req.params.commentId}`)
    .get()
    .then((documentSnapshot) => {
      const authorId = documentSnapshot.data().authorId;
      const oldBody = documentSnapshot.data().body;

      if (userId === authorId) {
        let newBody = req.body.body.trim();

        if (newBody === "") {
          return res
            .status(403)
            .json({ message: "O comentário não pode ficar vazio" });
        } else if (oldBody !== newBody) {
          db.doc(`/comments/${req.params.commentId}`)
            .update({
              body: newBody,
            })
            .then(() => {
              return res.json({
                message: `Comentário com Id ${documentSnapshot.id} editado com sucesso `,
              });
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: err.code });
            });
        } else {
          return res.json({
            body: "O novo comentário deve ser diferente do antigo.",
          });
        }
      } else {
        return res
          .status(403)
          .json({ message: "Apenas o autor do comentário pode editá-lo." });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteComment = (req, res) => {
  const userId = req.user.uid;
  db.doc(`/comments/${req.params.commentId}`)
    .get()
    .then((documentSnapshot) => {
      const authorId = documentSnapshot.data().authorId;
      if (userId === authorId) {
        db.doc(`/comments/${req.params.commentId}`)
          .delete()
          .then(() => {
            return res.json({
              message: "O comentário foi deletado com sucesso.",
            });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
      } else {
        return res.json({
          message: "Você não possui autorização para deletar o comentário.",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
