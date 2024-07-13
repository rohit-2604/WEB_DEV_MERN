const express = require('express')
const studentModel = require('../models/crud')

exports.rupdate= async (req, res) => {
    const id = req.params.id;
    await studentModel.findById({ _id: id })
      .then(users => res.json(users))
      .catch(err => res.json(err));
  };
  
  exports.update=async (req, res) => {
    const id = req.params.id;
    try {
      await studentModel.findByIdAndUpdate(
        { _id: id },
        { name:req.body.name,
           gender:req.body.Gen,
           city:req.body.city,
           DOB:req.body.DOB,
           Ph:req.body.Ph
        },
        { new: true }
      );
      return res.status(200).json({ message: 'Student updated successfully' });
    } catch (err) {
      return res.json({ error: 'Server error' });
    }
  };