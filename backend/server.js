// const express = require("express");
// const app = express();
// const mysql = require("mysql");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "signup",
// });

// const verivyJwt = (req, res, next) => {
//   const token = req.headers["acces token"];
//   if (!token) {
//     return res.json("We need provide it for next time");
//   } else {
//     jwt.verify(token, "jwtSecretKey", (err, decoded) => {
//       if (err) {
//         res.json("Not Authenticated");
//       } else {
//         req.userId = decoded.id;
//         next();
//       }
//     });
//   }
// };

// app.get("/checkauth", verivyJwt, (req, res) => {
//   return res.json("Authenticated");
// });

// app.post("/signup", (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;

//   db.query(
//     "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
//     [name, email, password],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send({ error: "Failed to sign up" });
//       } else {
//         res.status(200).send({ username: name, email: email });
//       }
//     }
//   );
// });

// app.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   db.query("SELECT * FROM login WHERE email = ?", [email], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send({ Error: "Failed to log in" });
//     } else {
//       if (result.length > 0) {
//         if (password === result[0].password) {
//           const id = result[0].id;
//           const token = jwt.sign({ id }, "jwtSecretKey", {
//             expiresIn: 300,
//           });
//           res.json({ login: true, token, data: result });
//         } else {
//           res.status(401).json({ message: "Wrong email or password" });
//         }
//       } else {
//         res.status(401).json({ message: "Wrong email or password" });
//       }
//     }
//   });
// });

// app.listen(4000, () => {
//   console.log("Server is listening on port 4000");
// });

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.json("Please provide a token for authentication");
  } else {
    jwt.verify(token, "jwtSecretKey", (err, decoded) => {
      if (err) {
        res.json("Not Authenticated");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/checkauth", verifyJwt, (req, res) => {
  return res.json("Authenticated");
});

app.post("/signup", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to sign up" });
      } else {
        res.status(200).send({ username: name, email: email });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM login WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ Error: "Failed to log in" });
    } else {
      if (result.length > 0) {
        if (password === result[0].password) {
          const id = result[0].id;
          const token = jwt.sign({ id }, "jwtSecretKey", {
            expiresIn: 300,
          });
          res.json({ login: true, token, data: result });
        } else {
          res.status(401).json({ message: "Wrong email or password" });
        }
      } else {
        res.status(401).json({ message: "Wrong email or password" });
      }
    }
  });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
``;
