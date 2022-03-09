const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const response = await User.findOne({ user_name });
    console.log(response);
    if (!response || response.password != password)
      return res.status(403).json({ error: "Invalid UserName or Password" });
    jwt.sign(
      { user_id: response._id.toString() },
      process.env.SECRET,
      (err, token) => {
        if (err) return res.status(403).json({ error: "Internal Error" });
        // console.log(token);
        return res.status(200).json({
          token,
          user_name: response.user_name,
          general_name: response.general_name,
          imageURL: response.imageURL,
        });
      }
    );
    // return res.status(403).json({ error: "Internal Error" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Invalid UserName or Password" });
  }
});

module.exports = router;
