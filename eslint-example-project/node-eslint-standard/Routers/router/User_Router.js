var express = require("express");
var router = express.Router();
var userController = require("../../app/Controllers/user_controller");
const passportConfig = require('../../app/config/passport');
var authorize = require("../../app/Controllers/user_controller");
var display = require("../../app/Controllers/student_schedule_display")

router.get('/logout', userController.logout);
router.get("/findById/:id", userController.findById);
router.get("/getall_user", userController.getall_user);
router.get("/display_studentschedule", display.display_studentschedule);
router.post("/update_user",  userController.update_user);
router.delete("/delete_user/:id", userController.delete_user);
router.post("/getuserbydanceid", userController.getuserbydanceid);
router.put("/changeUserPrivilage",  userController.changeUserPrivilage);


module.exports = router;