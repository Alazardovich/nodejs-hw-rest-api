const gravatar = require("gravatar");
const { User } = require("../../models/user");
const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const sendMail = require("../../helpers/sendMail");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use - ${user}`);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();
  const linkForHttp = `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Go to link for enters</a>`;

  await User.create({
    password: hashPassword,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "mail confirmation",
    html: linkForHttp,
  };

  await sendMail(mail);

  res.status(201).json({
    status: "201 Created",
    result: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};
module.exports = signup;
