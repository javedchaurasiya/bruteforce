const router = require("express").Router();
const { response } = require("express");
const user = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const response1 = await user.aggregate([
      {
        $project: {
          sub_count: { $size: { $ifNull: ["$submission", []] } },
          user_name: "$user_name",
          name: "$general_name",
        },
      },
      {
        $sort: { sub_count: -1 },
      },
    ]).limit(10);
    // console.log(response);
    const response2 = await user
      .aggregate([
        {
          $project: {
            post_count: { $size: { $ifNull: ["$post", []] } },
            user_name: "$user_name",
            name: "$general_name",
          },
        },
        {
          $sort: { post_count: -1 },
        },
      ])
      .limit(10);
    // console.log(response2);
    const result={
        most_subs:response1,
        most_contri:response2
    }
    return res.status(200).json({result})
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
});


module.exports = router;
