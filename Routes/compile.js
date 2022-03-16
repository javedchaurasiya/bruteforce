const router = require("express").Router();
const axios = require("axios");

require("dotenv").config();

function LanguageId(lang) {
  if (lang == "python" || lang == "python3") return 5;
  else if (lang == "Java" || lang == "java") return 4;
  else if (
    lang == "C++ (gcc)" ||
    lang == "C++" ||
    lang == "c++" ||
    lang == "cpp17"
  )
    return 7;
  else if (lang == "c" || lang == "C") return 6;
  return 1;
}

router.post("/", async (req, res) => {
  try {
    const { language, src_code, input, version } = req.body;
    console.log({ language, src_code, input });
    var payload = {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      script: src_code,
      language: language,
      versionIndex: version,
    };
    if (input != "") payload = { ...payload, stdIn: input };
    console.log(payload);

    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      payload
    );
    console.log(response.data);
    if (response.data.memory === null) {
      console.log("returning");
      return res.status(200).json({ output: response.data.output });
    } else {
      const Data = {
        LanguageChoice: LanguageId(language),
        Input: input,
        Program: src_code,
      };
      const finalResponse = await axios.post(
        "https://code-compiler.p.rapidapi.com/v2",
        Data,
        {
          headers: {
            "content-type": "application/json",
            "x-rapidapi-host": "code-compiler.p.rapidapi.com",
            "x-rapidapi-key":process.env.CODE_COMPILER_API
              ,
          },
        }
      );
      return res.status(200).json({ output: finalResponse.data.Result });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

module.exports = router;
