var firebase = require('firebase');
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDtBoo-27PXwuWAkTIS4XRgLbCI0kk4_a8",
    authDomain: "chope-a-lot.firebaseapp.com",
    databaseURL: "https://chope-a-lot.firebaseio.com",
    projectId: "chope-a-lot",
    storageBucket: "chope-a-lot.appspot.com",
    messagingSenderId: "900805005925"
  };
  firebase.initializeApp(config);

var express = require('express');

//create instance of express app
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: 'test', saveUninitialized: true, resave: true}));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set up template engine
app.set('view engine', 'ejs'); //nodejs and express know to look inside views folder for any template we render

//static files, css, images
app.use(express.static('./public'));

//get whatever is on the module exports stored in here
var loginController = require('./controllers/loginController'); //specify path to controller
var registerController = require('./controllers/registerController');
var mainController = require('./controllers/mainController');
var checkinController = require('./controllers/checkinController');
var checkoutController = require('./controllers/checkoutController');
var adminController = require('./controllers/adminController');
var resetpwController = require('./controllers/resetpwController');
var newpwController = require('./controllers/newpwController');

//fire controllers
//fire function
loginController(app);
registerController(app);
mainController(app);
checkinController(app);
checkoutController(app);
adminController(app);
resetpwController(app);
newpwController(app);

//listen to port
//app.listen(3000);
//console.log('listening to port 3000');

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
