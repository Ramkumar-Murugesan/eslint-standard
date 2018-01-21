var express = require("express");
var api = express.Router();
var routers = require("./router")
var authorize = require("../app/Controllers/user_controller");

api.use("/user/login", authorize.postLogin);
api.use('/user/signup', authorize.postSignup);
api.use("/business",authorize.loginRequired, routers.Business_Router);
api.use("/asset",authorize.loginRequired, routers.assets_Router);
api.use("/event",authorize.loginRequired, routers.event_Router);
api.use("/user", authorize.loginRequired , routers.User_Router);
api.use("/schedule",authorize.loginRequired, routers.schedule_Router);
api.use("/schedule_detail",authorize.loginRequired, routers.schedule_details_Router);
api.use("/payment", authorize.loginRequired, routers.payment_Router);
api.use("/batch",authorize.loginRequired, routers.Batch_Router);
api.use("/category",authorize.loginRequired, routers.category_Router);
api.use("/message",authorize.loginRequired, routers.messageRouter);
api.use("/audit", authorize.loginRequired, routers.auditRouter);
api.use("/attendance",authorize.loginRequired,routers.attendance_Router);
api.use("/subCategory",authorize.loginRequired,routers.subCategory_Router);


/*api.use("/business", authorize.loginRequired, routers.Business_Router);
api.use("/asset", authorize.loginRequired, routers.assets_Router);
api.use("/event", authorize.loginRequired, routers.event_Router);
api.use("/user", routers.User_Router);
api.use("/schedule", authorize.loginRequired, routers.schedule_Router);
api.use("/schedule_detail", authorize.loginRequired, routers.schedule_details_Router);
api.use("/payment", authorize.loginRequired, routers.payment_Router);
api.use("/batch", authorize.loginRequired, routers.Batch_Router);
api.use("/category", routers.category_Router);
api.use("/message", authorize.loginRequired, routers.messageRouter);
api.use("/audit", authorize.loginRequired, routers.auditRouter);*/
module.exports = api;