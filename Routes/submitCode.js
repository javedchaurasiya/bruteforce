const router = require("express").Router();
const axios = require("axios");
const user = require("../models/user");
const submission = require("../models/submission");
require("dotenv").config();

function LanguageId(lang) {
  if (lang == "python" || lang == "python3") return 5;
  else if (lang == "Java" || lang == "java") return 4;
  else if (
    lang == "C++ (gcc)" ||
    lang == "C++" ||
    lang == "c++" ||
    lang == "cpp17" ||
    lang == "c_cpp"
  )
    return 7;
  else if (lang == "c" || lang == "C") return 6;
  return 1;
}

router.post("/", async (req, res) => {
  try {
    const { problem, user_name, language, src_code } = req.body;
    const Data = {
      LanguageChoice: LanguageId(language),
      Input: problem.test_input,
      Program: src_code,
    };
    console.log(Data);
    const finalResponse = await axios.post(
      "https://code-compiler.p.rapidapi.com/v2",
      Data,
      {
        headers: {
          "content-type": "application/json",
          "x-rapidapi-host": "code-compiler.p.rapidapi.com",
          "x-rapidapi-key": process.env.CODE_COMPILER_API,
        },
      }
    );
    console.log(finalResponse);
    console.log(problem);
    // console.log("Separate");
    var output = {
      submission_id: "sub" + Date.now().toString(),
      problem_name: problem.title,
      problem_id: problem.problem_id,
      level: problem.level,
      language,
      status: "",
      timeline: Date.now(),
    };
    if (finalResponse.data.Errors) output.status = "compilation error";
    else {
      if (finalResponse.data.Result == problem.test_output)
        output.status = "accepted";
      else output.status = "wrong answer";
    }
    // console.log(output);
    const sub = new submission({
      submission_id: output.submission_id,
      problem_id: output.problem_id,
      user_name,
      status: output.status,
      src_code,
      language,
      user_output: finalResponse.data.Errors
        ? finalResponse.data.Errors
        : finalResponse.data.Result,
      expected_output: problem.test_output,
    });
    const subResponse = await sub.save();
    // console.log(subResponse);
    const userResponse = await user.updateOne(
      { user_name },
      { $push: { submission: output } }
    );
    // console.log(userResponse);
    return res.status(200).json({ submission_id: output.submission_id ,
    status:output.status,
    timeline:output.timeline,
    language:output.language,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

module.exports = router;
