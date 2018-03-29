var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var config = require("./database/config");
var qiniu = require("./routes/qiniu");

var index = require("./routes/index");
var users = require("./routes/users");
var news = require("./routes/news/news");
var project = require("./routes/project");
var images = require("./routes/images");
var register = require("./routes/register");
var changePwd = require("./routes/changePwd");
var login = require("./routes/login");
var userlist = require("./routes/userlist");
var customs = require("./routes/customs");
var outlogin = require("./routes/outlogin");
var cors = require("cors");

var houtailogin = require("./routes/houtailogin");
var adminloginou=require("./routes/adminoutlogin")

var app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true
  })
);

app.use(
  session({
    secret: "yao",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600 * 1000 * 24 * 30 }
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use("/api/news", news);
app.use("/api/images", images);
app.use("/api/project", project);
app.use("/api/customs", customs);
app.use("/api", qiniu);
app.use("/api", register);
app.use("/api", login);
app.use("/api/users", userlist);

app.use("/api/admin", houtailogin);
app.use("/api/admin", adminloginou);
app.use("/api/admin/news", checklogin,news);
app.use("/api/admin/images", checklogin,images);
app.use("/api/admin/project", checklogin,project);
app.use("/api/admin/users",checklogin ,userlist);

 function checklogin(req, res, next){
  console.log(req.session);
  if (!req.session.user) {
    res.json({
      data: "后台用户未登录",
      code: 401,
      msg: "后台用户未登录",
      ret: false
    });
    return;
  }
  next();
};


app.use((req, res, next) => {
  console.log(req.session);
  if (!req.session.user) {
    res.json({
      data: "用户未登录",
      code: 401,
      msg: "你还没有登录，去登陆不吧，亲！",
      ret: false
    });
    return;
  }
  next();
});

app.use("/api", userlist);
app.use("/api", outlogin);
app.use("/api", changePwd);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
