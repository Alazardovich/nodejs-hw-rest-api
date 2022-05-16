const { User } = require("../../models/user");
const createError = require("http-errors");

const changeSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  if (
    subscription === "starter" ||
    subscription === "pro" ||
    subscription === "business"
  ) {
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: "starter" || "pro" || "business" }
    );
    res.json({ result });
  }
  throw createError(404, { message: "Subscription wrong" });
};
module.exports = changeSubscription;
