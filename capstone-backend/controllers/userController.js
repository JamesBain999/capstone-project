"use strict";
const Models = require("../models");

// finds all users in DB, then sends array as response
const getUsers = (res) => {
  Models.User.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// uses JSON from request body to create new user in DB
const createUser = (data, res) => {
  Models.User.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// uses JSON from request body to update user ID from params
const updateUser = (req, res) => {
  Models.User.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// deletes user matching ID from params
const deleteUser = (req, res) => {
  Models.User.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  Models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.send({ result: 200, message: 'Login successful', user: user });
        } else {
          res.send({ result: 401, error: 'Incorrect password' });
        }
      } else {
        res.send({ result: 404, error: 'User not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const checkEmailExists = (req, res) => {
  const { email } = req.body;
  Models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.send({ result: 409, message: 'Email already exists', user: user });
      } else {
        res.send({ result: 404, error: 'Email not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getIdByEmail = (req, res) => {
  const { email } = req.body;
  Models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.send({ result: 200, userId: user.id });
      } else {
        res.send({ result: 404, error: 'User not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkEmailExists,
  getIdByEmail
};
