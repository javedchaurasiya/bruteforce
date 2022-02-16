const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

require("./config/db");
const User = require("./models/user");

const PORT = process.env.PORT || 3000;

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
    console.log(response);

    return res.status(200).json({ message: "successfully inserted data" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
