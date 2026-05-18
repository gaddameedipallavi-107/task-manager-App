
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db");

router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users(name,email,password) VALUES(?,?,?)";

  db.query(
    sql,
    [name, email, hashedPassword],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json("Registration Failed");
      }

      res.json("User Registered Successfully");
    }
  );
});


router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], async (err, result) => {

    if (err) {
      return res.status(500).json("Server Error");
    }

    if (result.length === 0) {
      return res.status(404).json("User Not Found");
    }

    const user = result[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json("Invalid Password");
    }

    const token = jwt.sign(
      { id: user.id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token
    });
  });
});


module.exports = router;