module.exports = function(app) {

    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    var firebase = require('firebase');
    //how to call the login button here? 
    app.submit = function() {
        var email = app.email;
        var password = app.password;
        if (!email || !password) {
          return console.log('email and password required');
        }
        // Sign in user
        firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('signIn error', error);
            // ...
        });
    };

    // Listen to auth state changes
    firebase.auth().onAuthStateChanged(function(user) {
        app.user = user;
        console.log('user', user);
    });

    app.get('/', function(req,res){
        res.render('login');
    });

    app.post('/', urlencodedParser, function(req,res){
 
         res.redirect('/carpark');
    });
};