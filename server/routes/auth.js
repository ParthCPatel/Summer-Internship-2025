const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getAvatar,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.get("/avatar/:id", getAvatar); // ✅ New route to fetch avatar

module.exports = router;
