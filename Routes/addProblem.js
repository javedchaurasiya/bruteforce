const router = require("express").Router();
const problem = require("../models/problem");

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      level,
      tags,
      example_input,
      example_output,
      test_input,
      test_output,
    } = req.body;
    const problem_id = Date.now().toString();
    const problem_res = new problem({
      problem_id,
      title,
      description,
      level,
      tags,
      example_input,
      example_output,
      test_input,
      test_output,
    });
    const response = await problem_res.save();
    // console.log(response);
    if (!response)
      return res.status(400).json({ error: "All fields are req." });
    else return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

module.exports = router;
