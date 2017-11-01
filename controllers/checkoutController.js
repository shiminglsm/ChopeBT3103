module.exports = function(app) {
    
    var firebase = require('firebase');
    var database = firebase.database(); 
    
    app.get('/checkout', function(req,res){
        res.render('checkout');
    });
};