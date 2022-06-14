const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== mockUser.username || password !== mockUser.password) {
    return res.status(401).json({ error: "Invalid username or passowrd" });
  }

  const token = jwt.sign({ username }, "averysecretsecret");

  res.json({ token });
});

router.get("/profile", (req, res) => {
  const [bearer, token] = req.headers.authorization.split(" ");

  try {
    const payload = jwt.verify(token, "averysecretsecret");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  res.json({ data: mockUser.profile });
});

module.exports = router;
