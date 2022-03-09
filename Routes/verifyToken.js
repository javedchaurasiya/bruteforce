const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);

    jwt.verify(token, process.env.SECRET, async (err, payload) => {
      if (err) return res.status(403).json({ error: "Invalid Token" });
      const user_id = payload.user_id;
      const response = await User.findById(user_id);
      console.log(response);
      return res.status(200).json({
        user_name: response.user_name,
        general_name: response.general_name,
        imageURL:response.imageURL,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Invalid Token" });
  }
});

module.exports = router;
