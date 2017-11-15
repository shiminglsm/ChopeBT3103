module.exports = function(app) {

    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    var firebase = require('firebase');
    var database = firebase.database();
    var usersRef = database.ref('Users');

    //how to call the login button here? 
    app.login = function() {
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
        req.session.email = req.body.email;
        usersRef.on('value', function(snapshot){
            for (var key in snapshot.val()) {
                if (snapshot.val()[key]['EmailAddr'] == req.session.email){
                    req.session.userID = String(snapshot.val()[key]['UserID']);
                    req.session.role = snapshot.val()[key]['Role'];
                    if (req.session.role == 'User') {
                        //console.log(req.session);
                        res.redirect('/carpark');
                    } else {
                        res.redirect('admin/userloyalty');
                    }
                    break;
                }
            }
        });
        
    });
};