const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// matches GET requests sent to /api/gameStates
router.get("/", (req, res) => {
  Controllers.gameStateController.getGameStates(res);
});

// matches POST requests sent to /api/gameStates/create
router.post("/create", (req, res) => {
  Controllers.gameStateController.createGameState(req.body, res);
});

// matches UPDATE requests to /api/gameStates/123 (123 in id param)
router.put("/:id", (req, res) => {
  Controllers.gameStateController.updateGameState(req, res);
});

// matches DELETE requests to /api/gameStates/123 (123 in id param)
router.delete("/:id", (req, res) => {
  Controllers.gameStateController.deleteGameState(req, res);
});

module.exports = router;
