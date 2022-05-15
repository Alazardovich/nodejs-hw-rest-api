const express = require("express");
const { ctrlWrapper, auth, upload } = require("../../middleware");
const ctrl = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/", auth, ctrlWrapper(ctrl.changeSubscription));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.changeAvatar)
);
module.exports = router;
