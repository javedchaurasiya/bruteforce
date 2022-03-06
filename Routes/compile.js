const router = require("express").Router();
const axios = require("axios");
const request = require("request");

require("dotenv").config();

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
    return res.status(200).json({ output: response.data.output });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

module.exports = router;
