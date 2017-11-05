module.exports = function(app) {
    
        var bodyParser = require('body-parser');
        var urlencodedParser = bodyParser.urlencoded({extended:false});
        
        app.get('/new-password', function(req, res){
            res.render('new-password');
        });
    
        app.post('/', urlencodedParser, function(req,res){
     
             res.redirect('/');
        });
    };