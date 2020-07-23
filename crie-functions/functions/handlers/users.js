const firebase = require("firebase");

const { db } = require("../utils/admin.js");

const firebaseConfig = require("../utils/firebaseConfig");
firebase.initializeApp(firebaseConfig);

exports.signup = (req, res) => {
  let email = req.body.email.trim();
  let password = req.body.password.trim();
  let confirmPassword = req.body.confirmPassword.trim();
  let cpf = req.body.cpf.trim();
  let name = req.body.name.trim();
  let lastName = req.body.lastName.trim();
  let accessCode = req.body.accessCode.trim();

  let token, userId;

  // Conferir se o CPF já não está sendo usado no banco de dados
  db.collection("users")
    .where("cpf", "==", cpf)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        return res.status(400).json({ cpf: "CPF já está sendo usado." });
      } else {
        let companyId;
        let companyName;
        // Vamos saber qual a empresa desse usuário através do código dele (accessCode)
        db.collection("companies")
          .where("accessCode", "==", accessCode)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              console.log("Não tem nenhuma empresa com esse código");
              return res.status(400).json({
                message:
                  "Nenhuma empresa encontrada com esse código de acesso.",
              });
            } else {
              snapshot.forEach((doc) => {
                companyId = doc.id;
                companyName = doc.data().name;
              });
            }
          })
          .then(() => {
            // Conferir se o e-mail já está sendo usado
            // Conferir se a senha é valida
            // Adicionar o usuário na autenticação do firebase
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((data) => {
                userId = data.user.uid;
                return data.user.getIdToken();
              })
              .then((idToken) => {
                token = idToken;
                const userCredentials = {
                  createdAt: new Date().toISOString(),
                  email,
                  name,
                  lastName,
                  cpf,
                  score: 0,
                  companyId,
                  companyName,
                  role: "",
                  area: "",
                  id: userId,
                };
                // Cadastrar o usuário no nosso banco de dados
                return db.doc(`/users/${userId}`).set(userCredentials);
              })
              .then(() => {
                return res.status(201).json({ token });
              })
              .catch((err) => {
                console.error(err);
                if (err.code === "auth/email-already-in-use") {
                  return res
                    .status(400)
                    .json({ message: "E-mail já está em uso." });
                } else if (err.code === "auth/invalid-email") {
                  return res.status(400).json({ message: "E-mail inválid" });
                } else if (err.code === "auth/weak-password") {
                  return res
                    .status(400)
                    .json({ message: "A senha deve conter 6 ou mais digitos" });
                }
                return res.status(500).json({ error: err.code });
              });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.login = (req, res) => {
  let email = req.body.email.trim();
  let password = req.body.password.trim();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res.status(403).json({ message: "Senha incorreta." });
      } else if (err.code === "auth/user-not-found") {
        return res.status(403).json({ message: "Usuário não encontrado." });
      }
      return res.status(500).json({ error: err.code });
    });
};

// const numbers = [1, 2, 3, 4]
// numbers.forEach((number) => {
//   console.log(number * 2)
// })

exports.getUsersList = (req, res) => {
  let users = [];
  db.collection(`users`)
    .orderBy("score", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      return res.json({ users });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.changeUserArea = (req, res) => {
  let area = req.body.area.trim();
  let userId = req.body.userId.trim();

  db.doc(`/users/${userId}`)
    .update({
      area,
    })
    .then(() => {
      return res.json({ message: "Setor atualizado com sucesso." });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.changeUserRole = (req, res) => {
  let newRole = req.body.newRole.trim();
  let userId = req.body.userId.trim();

  db.doc(`/users/${userId}`)
    .update({ role: newRole })
    .then(() => {
      return res.json({ message: "Cargo alterado com sucesso." });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
