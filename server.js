const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

require("./config/db");
const User = require("./models/user");

const PORT = process.env.PORT || 2000;

const corsoptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
};

app.use(cors(corsoptions));

app.use(express.json());

//checking server
app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello from home" });
});

app.use("/signup", require("./Routes/signUp"));
app.use("/login", require("./Routes/login"));
app.use("/verifyToken", require("./Routes/verifyToken"));
app.use("/checkUsername", require("./Routes/checkUsername"));
app.use("/compile", require("./Routes/compile"));
app.use("/profile", require("./Routes/profile"));
app.use("/updateProfile", require("./Routes/updateProfile"));
app.use("/imageUpload", require("./Routes/imageUpload.js"));
app.use("/addProblem", require("./Routes/addProblem.js"));
app.use("/getProblem", require("./Routes/getProblem.js"));
app.use("/submitCode", require("./Routes/submitCode.js"));
app.use("/search", require("./Routes/search.js"));
app.use("/getProblemSet", require("./Routes/getProblemSet.js"));
app.use("/getSubDetails", require("./Routes/getSubDetails.js"));
app.use("/like", require("./Routes/like.js"));
app.use("/homePage", require("./Routes/homePage.js"));
app.use("/mySubmissions", require("./Routes/mySubmissions.js"));


//checking mongodb : inserting dummy data
app.post("/checkdb", async (req, res) => {
  try {
    const { user_name, mail, password, general_name } = req.body;
    console.log(`${user_name}, ${mail}, ${password}, ${general_name}`);

    const user = new User({
      user_name: user_name,
      mail: mail,
      password: password,
      general_name: general_name,
    });

    const response = await user.save();
    // console.log(response);
    

    return res.status(200).json({ message: "successfully inserted data" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
