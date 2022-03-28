const router = require("express").Router();
const user = require("../models/user");

router.post("/", async (req, res) => {
    try {
        const {user_name}=req.body
        const response=await user.findOne({user_name})
        return res.status(200).json({submissions:response.submission})
    } catch (error) {
        console.log(error);
        return res.status(403).json({error})
    }
});

module.exports = router;
