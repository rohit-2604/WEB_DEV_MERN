const express = require('express')
const studentModel = require('../models/crud')

const router = express.Router();

exports.crudcreate=async (req, res) => {
  // console.log("createStudent Called:");
  const {name,Gen,Ph,DOB,city} = req.body;

  try {
    const student = new studentModel({
      name:name,
      gender:Gen,
      DOB:DOB,
      city:city,
      Ph:Ph
    });
    await student.save();
    // console.log("Data Saved");
    return res.status(200).json({ student ,success:'Successfull Data Entry'});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
};