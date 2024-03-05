const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// matches GET requests sent to /api/users
router.get("/", (req, res) => {
  Controllers.userController.getUsers(res);
});

// matches POST requests sent to /api/users/create
router.post("/create", (req, res) => {
  Controllers.userController.createUser(req.body, res);
});

// matches PUT requests to /api/users/123 (stores 123 in id param)
router.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});

// matches DELETE requests to /api/users/123 (123 in id param)
router.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});

// matches LOGIN requests to /api/users/123 (123 in id param)
router.post("/login", (req, res) => {
  Controllers.userController.login(req, res);
});

// matches checkEmailExists requests to /api/users/123 (123 in id param)
router.post("/checkEmailExists", (req, res) => {
  Controllers.userController.checkEmailExists(req, res);
});

// matches checkEmailExists requests to /api/users/123 (123 in id param)
router.post("/getIdbyEmail", (req, res) => {
  Controllers.userController.getIdByEmail(req, res);
});

module.exports = router;