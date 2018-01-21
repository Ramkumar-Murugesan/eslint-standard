const User = require('../Models/user_model');
const Batch = require('../Models/Batch_model');
const Schedule = require('../Models/schedule_model');
const Schedule_details = require('../Models/Schedule_details_model');

const service = require("../Services/user_Service");
var wrapper = require('../../app/constants/wrapper');
var jsonwebtoken = require("jsonwebtoken");


exports.display_studentschedule = function (req, res) {
  if (req.user){
    var user_id = req.user._id;
  Schedule_details.findOne({hosts : user_id}).then(function(linkdata){

   Schedule.find({ _id: linkdata.schedule_id}) .then(function(scheduledata){
     
        res.send(scheduledata)
      }
      	 )
     });
}}


