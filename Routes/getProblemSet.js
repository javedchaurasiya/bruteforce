const router = require("express").Router();
const problem = require("../models/problem");

router.post("/", async (req, res) => {
  try {
    const { level, tags } = req.body;
    // console.log(level);
    var response;
    if(level!='all')response = await problem.find({ level: level, tags: { $in: tags } });
    else response = await problem.find({tags: { $in: tags } });
    // console.log(response);
    var result = [];
    response.map((x) => {
      result.push({
        problem_id: x.problem_id,
        title: x.title,
        level: x.level,
        likes: x.likes,
      });
    });
    // console.log(result);
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
});

module.exports = router;
