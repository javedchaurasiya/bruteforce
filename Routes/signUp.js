const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

router.post("/", async (req, res) => {
  //   return res.json({ message: "hello signup" });
  try {
    const { user_name, mail, password, general_name, bio, affiliation, city } =
      req.body;
    console.log(user_name + " " + mail);
    const user = new User({
      user_name,
      mail,
      password,
      general_name,
      bio,
      affiliation,
      city,
    });
    const response = await user.save();

    // console.log(response);

    const user_id = response._id.toString();
    // console.log(response._id.toString());

    jwt.sign({ user_id: user_id }, process.env.SECRET, (err, token) => {
      if (err) return res.status(403).json({ eroor: err });
      // console.log(token);
      return res.status(200).json({
        token,
        user_name: response.user_name,
        general_name: response.general_name,
        imageURL: response.imageURL,
      });
    });

    return res.status(200);
  } catch (error) {
    return res.status(403).json({ error: error });
  }
});

module.exports = router;
