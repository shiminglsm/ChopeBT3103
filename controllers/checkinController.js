module.exports = function(app) {
    
    var firebase = require('firebase');
    var database = firebase.database(); 
    
    app.get('/checkin', function(req,res){
        res.render('checkin');
    });
    app.post('/checkin', function(req, res){
        res.render('checkout');
    })
};
