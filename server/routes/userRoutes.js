const {
  addUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controller/userController");
const express = require("express");

const router = express.Router();

router.post("/", addUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;
