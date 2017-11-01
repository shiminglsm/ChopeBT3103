module.exports = function(app) {
    
    var firebase = require('firebase');
    var database = firebase.database(); 
    
    app.get('/admin/demographics', function(req,res){
        res.render('admin-demo');
    });
    app.get('/admin/carpark', function(req,res){
        res.render('admin-carpark');
    });
    app.get('/admin/complaint', function(req,res){
        res.render('admin-complaint');
    });
    app.get('/admin/resolvecomplaint', function(req,res){
        res.render('resolvecomplaint');
    });
};