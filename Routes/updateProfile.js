const router = require("express").Router();
const user = require("../models/user");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const {
      user_name,
      imageURL,
      general_name,
      school,
      location,
      linkedin,
      github,
      twitter,
    } = req.body;

    const response = await user.updateOne(
      { user_name },
      {
        $set: {
          imageURL,
          general_name,
          school,
          location,
          "socials.linkedin": linkedin,
          "socials.github": github,
          "socials.twitter": twitter,
        },
      }
    );
    console.log(response);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
});

module.exports = router;
