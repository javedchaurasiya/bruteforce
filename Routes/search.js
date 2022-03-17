const router = require("express").Router();
const user = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    // console.log(name);
    const regEx = new RegExp(name.split('').join('\\s*'));
    // console.log(regEx);
    const response = await user.find({
      general_name: { $regex: regEx, $options: "xi" },
    });
    // console.log(response);
    var result=[]
    response.map((x)=>{
        result.push({
            name:x.general_name,
            user_name:x.user_name,
            location:x.location,
            imageURL:x.imageURL
        })
    })
    return res.status(200).json({result})
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
});

module.exports = router;
