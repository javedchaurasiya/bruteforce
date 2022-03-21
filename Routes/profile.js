const router = require("express").Router();
const user = require("../models/user");
const problem = require("../models/problem");
const jsTimeDiff = require("js-time-diff");

router.post("/", async (req, res) => {
  try {
    const { userName } = req.body;
    // console.log(userName);
    const response = await user.findOne({ user_name: userName });
    if (!response) return res.status(404).json({ error: "User Not Found" });
    const profileData = {
      user_name: response.user_name,
      general_name: response.general_name,
      imageURL: response.imageURL,
      school: response.school,
      location: response.location,
      socials: { ...response.socials },
    };

    var cpp, java, python;
    cpp = java = python = 0;
    var easy, medium, hard;
    easy = medium = hard = 0;

    var submissionArray = [];
    var st = new Set();

    response.submission.map((sub) => {
      if (!st.has(sub.problem_id)) {
        if (sub.level === "easy") easy++;
        else if (sub.level === "medium") medium++;
        else if (sub.level === "hard") hard++;
      }
      st.add(sub.problem_id)

      if (sub.language === "cpp" || sub.language === "c_cpp") cpp++;
      else if (sub.language === "java") java++;
      else if (sub.language === "python") python++;

      if (sub.status === "accepted") {
        submissionArray.push({
          id: sub.submission_id,
          problemName: sub.problem_name,
          timeline: jsTimeDiff(new Date(sub.timeline)),
        });
      }
    });

    var easyProblems = 0,
      mediumProblems = 0,
      hardProblems = 0,
      totalProblems;
    const prob_response = await problem.find();
    totalProblems = prob_response.length;
    prob_response.map((prob) => {
      if (prob.level == "easy") easyProblems++;
      else if (prob.level == "medium") mediumProblems++;
      else hardProblems++;
    });

    const otherData = {
      submissionStats: {
        total: cpp + java + python,
        cpp,
        java,
        python,
      },
      solvedProblems: {
        solvedPercent: parseInt(((easy + medium + hard) * 100) / totalProblems),
        easy: parseInt((easy * 100) / easyProblems),
        medium: parseInt((medium * 100) / mediumProblems),
        hard: parseInt((hard * 100) / hardProblems),
      },
      recentAC: submissionArray,
    };

    // console.log(profileData);
    // console.log(otherData);

    return res.status(200).json({ profileData, otherData });
  } catch (error) {
    console.log("Error Happened");
    return res.status(404).json({ error });
  }
});

module.exports = router;
