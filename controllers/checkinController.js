module.exports = function(app) {
    
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});

    var firebase = require('firebase');
    var database = firebase.database(); 
    
    app.get('/checkin', function(req,res){
        var carpark = req.session.carpark;
        var allocatedtime = req.session.AllocatedTime;
        var lotID = req.session.LotID;
        res.render('checkin', { AllocatedTime: allocatedtime, Carpark: carpark, LotID: lotID});
    });

    app.post('/checkin', urlencodedParser, function(req, res){
        if (req.body.serialnumber == req.session.SerialNum) {
            if ((new Date().getHours()+8) > 23) {
                var hour = new Date().getHours() + 8 -24;
            } else {
                var hour = new Date().getHours() + 8;
            }
            req.session.CheckInTime = (hour <10 ? '0' : '') + hour + ':' + (new Date().getMinutes() <10 ? '0' : '') + new Date().getMinutes() + ':' + (new Date().getSeconds() <10 ?'0' : '') + new Date().getSeconds();
            res.redirect('checkout');
            console.log(req.session);
        }
    })
};
