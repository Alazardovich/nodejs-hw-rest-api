const gravatar = require("gravatar");
const { User } = require("../../models/user");
const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use - ${user}`);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    password: hashPassword,
    email,
    subscription,
    avatarURL,
  });
  res.status(201).json({
    status: "201 Created",
    result: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};
module.exports = signup;
