"use strict";
const Models = require("../models");

// finds all gameStates in DB, then sends array as response
const getGameStates = (res) => {
  Models.GameState.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// uses JSON from request body to create new GameState in DB
const createGameState = (data, res) => {
  Models.GameState.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// deletes GameState matching ID from params
const deleteGameState = (req, res) => {
  Models.GameState.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getGameStates,
  createGameState,
  deleteGameState,
};
