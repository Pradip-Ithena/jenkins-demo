var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()
var corsOptions = {
  origin: ["http://localhost:3000","http://localhost:4200"]
};

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', indexRouter);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
    Role.create({
    id: 1,
    name: "admin"
  });
}

module.exports = app;