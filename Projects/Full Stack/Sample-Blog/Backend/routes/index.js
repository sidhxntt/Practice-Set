const latestBlogsRouter = require("../routes/latest_blogs");
const HomeRouter = require("../routes/home");
const AllBlogsRouter = require("../routes/All_blogs");
const signupRouter = require('../routes/signup')
const LoginRouter= require('../routes/Login')
const UserBlogsRouter = require('./user_blogs')
const UserRouter = require('./users')
const UserBlogsContentRouter = require('./user_blog_content')
const OAuthRouter = require('./OAuth')
const ForgetPasswordRouter = require("./ForgetPasswordRouter")
const VerifyOTP_Router = require("./VerifyOTP_Router")
const ResetPasswordRouter = require("./ResetPasswordRouter")
const RazorPayRouter = require("./RazorPayRouter")
const PublishRouter = require("./PublishRouter")

// Use the routers
const allRoutes = (app) => {
  app.use("/", HomeRouter);
  app.use("/latest-blogs", latestBlogsRouter);
  app.use("/all-blogs", AllBlogsRouter);
  app.use("/sign-up", signupRouter);
  app.use("/users", UserRouter);
  app.use("/login", LoginRouter);
  app.use("/user-blogs", UserBlogsRouter)
  app.use("/user-blogs-content", UserBlogsContentRouter)
  app.use("/publish-blogs", PublishRouter)
  app.use("/Oauth",OAuthRouter )
  app.use("/forget-password", ForgetPasswordRouter)
  app.use("/verify-otp", VerifyOTP_Router)
  app.use("/reset-password", ResetPasswordRouter)
  app.use("/payment-gateway", RazorPayRouter)
};



module.exports = allRoutes;
