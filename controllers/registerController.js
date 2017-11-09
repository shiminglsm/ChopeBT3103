module.exports = function(app) {
    
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    var firebase = require('firebase');
    var database = firebase.database(); 

    app.register = function() {
        var email = req.body.email;
        var password = req.body.password;
        if (!email || !password) {
          return console.log('email and password required');
        }
        // Register user
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch(function(error) {
            console.log('register error', error);
            if (error.code === 'auth/email-already-in-use') {
              var credential = firebase.auth.EmailAuthProvider.credential(email, password);
              app.signInWithGoogle()
                .then(function() {
                  firebase.auth().currentUser.link(credential)
                    .then(function(user) {
                      console.log("Account linking success", user);
                    }, function(error) {
                      console.log("Account linking error", error);
                    });
                });
            }
        });
    };
    
    app.get('/register', function(req, res){
        res.render('register');
    });
    
    app.post('/register', urlencodedParser, function(req, res){
        var email = req.body.email;
        var password = req.body.password;
        
        var auth = firebase.auth();
        var promise = auth.createUserWithEmailAndPassword(email, password);
		promise.catch(e => console.log(e.message));
        
        var date = new Date();
        var d = date.toISOString().slice(0,10);

        var usersRef = database.ref('Users');

        var newUser = usersRef.push({
            Name : req.body.name,
            EmailAddr : email,
            Gender : req.body.gender,
            Race : req.body.race,
            DOB : req.body.DOB,
            CarplateNumber : req.body.carplate,
            DateCreated : d,
            Credit : 0, 
            Role : 'User',
            Password : password
        });
        var key = newUser.key;
        newUser.update({UserID : key});
        res.redirect('/carpark');
        
    });


};