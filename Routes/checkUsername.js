const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { user_name } = req.body;
    if(user_name=='')return res.status(200).json({ success: true });
    const response =await User.findOne({ user_name });
    // console.log(response)
    if (response) return res.status(200).json({ success: true });
    else return res.status(200).json({ error: true });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
