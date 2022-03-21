const router = require("express").Router();
const problem = require("../models/problem");
const user = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { problem_id, user_name } = req.body;
    // console.log(problem_id);
    const response = await problem.findOne({ problem_id });
    const response1 = await user.findOne({ user_name });
    var liked=false;
    liked=response1.likes.includes(problem_id)
    // console.log(response1);
    var subArray = [];
    response1.submission.map((sub) => {
      if (sub.problem_id === problem_id) subArray.push(sub);
    });
    console.log(subArray);
    // console.log(response);
    if (!response) return res.status(404).json({ error: "Not Found" });
    else return res.status(200).json({ problem: response, submissions:subArray,liked });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
});

module.exports = router;
