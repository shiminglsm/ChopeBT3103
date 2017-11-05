module.exports = function(app) {
    
        var bodyParser = require('body-parser');
        var urlencodedParser = bodyParser.urlencoded({extended:false});
        
        app.get('/reset-password', function(req, res){
            res.render('reset-password');
        });
    
        app.post('/reset-password', urlencodedParser, function(req,res){
     
             res.redirect('/new-password');
        });
    };