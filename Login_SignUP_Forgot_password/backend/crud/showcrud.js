const express = require('express')
const studentModel = require('../models/crud')

const router = express.Router();


exports.crudshow =async(req, res) => {
    studentModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err));
  };