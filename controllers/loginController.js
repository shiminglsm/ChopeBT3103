module.exports = function(app) {

    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    
    app.get('/', function(req,res){
        res.render('login');
    });

    app.post('/', urlencodedParser, function(req,res){
 
         res.redirect('/carpark');
    });
};