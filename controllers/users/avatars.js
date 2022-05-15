const path = require("path");
const { User } = require("../../models/user");
const fs = require("fs/promises");
const Jimp = require("jimp");

const toPublic = path.join(__dirname, "../../", "public", "avatars");

const changeAvatar = async (req, res) => {
  const { path: fromTmp, originalname } = req.file;
  const nameImg = `${req.user._id}_${originalname}`;
  const resultUpload = path.join(toPublic, nameImg);
  try {
    const image = await Jimp.read(fromTmp);
    await image.resize(250, 250).writeAsync(fromTmp);
    await fs.rename(fromTmp, resultUpload);
    const avatarURL = path.join("public", "avatars", nameImg);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(fromTmp);
    throw error;
  }
};
module.exports = changeAvatar;
