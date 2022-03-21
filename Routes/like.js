const router = require("express").Router();
const user = require("../models/user");
const problem = require("../models/problem");

router.post("/", async (req, res) => {
  try {
    const { status, id, user_name } = req.body;
    var response;
    var response1;
    var response2 = await user.findOne({ user_name, likes: id });
    if (!status) {
      response = await user.findOneAndUpdate(
        { user_name },
        { $pull: { likes: id } }
      );
      if (response2)
        response1 = await problem.findOneAndUpdate(
          { problem_id: id },
          { $inc: { likes: -1 } }
        );
    } else {
      response = await user.findOneAndUpdate(
        { user_name },
        { $addToSet: { likes: id } }
      );
      if (!response2)
        response1 = await problem.findOneAndUpdate(
          { problem_id: id },
          { $inc: { likes: 1 } }
        );
    }
    // console.log(response);
    // console.log(response1);
    // console.log(response2);
    response1=await problem.findOne({problem_id:id})
    return res.status(200).json({ success: true, likes:response1.likes });
  } catch (error) {
    console.log(error);
    return res.status(403).json(error);
  }
});

module.exports = router;
