const { NotFound } = require("http-errors");
const { User } = require("../../models/user");
const verifyTokenMail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  console.log(user);
  if (!user) {
    throw NotFound("User not found");
  }
  const result = await User.findByIdAndUpdate(
    user._id,
    { verify: true, verificationToken: null },
    user
  );
  res.status(200).json({ message: "Verification successful", result });
};
module.exports = verifyTokenMail;
