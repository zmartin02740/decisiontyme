"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
}

function comparePasswords(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, success) => {
      if (err) reject(`Error comparing passwords: ${err}`);

      if (!success) {
        reject("Password does not match our records");
      }

      resolve(success);
    });
  });
}

const jwtPromised = {
  sign: (payload, secret, options = {}) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);

        resolve(token);
      });
    });
  },
  verify: (token, secret, options = {}) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, authData) => {
        if (err) reject(err);

        resolve(authData);
      });
    });
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
  jwt: jwtPromised
};
