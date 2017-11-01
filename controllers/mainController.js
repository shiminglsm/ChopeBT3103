module.exports = function(app) {
    
    var firebase = require('firebase');
    var database = firebase.database(); 
    
    app.get('/carpark', function(req,res){
        var carparkRef = database.ref('Carparks');
        carparkRef.on('value', function(snapshot){
            res.render('main', {carparks: snapshot.val()} );
        });
    });

    app.post('/carpark', function(req,res){
        res.redirect('checkin');
    });
};