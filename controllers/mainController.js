module.exports = function(app) {
    
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    
    var firebase = require('firebase');
    var database = firebase.database(); 
    var carparkRef = database.ref('Carparks');
    var lotsRef = database.ref('Lots');


    app.get('/carpark', function(req,res){

        carparkRef.on('value', function(snapshot){
            res.render('main', {carparks: snapshot.val(), email: req.session.email} );
        });
    });

    app.post('/carpark', urlencodedParser, function(req,res){
        req.session.carpark = req.body.carpark;
        lotsRef.orderByChild('CarparkName').equalTo(req.session.carpark).on('value', function(snapshot){
            for (var key in snapshot.val()) {
                if (snapshot.val()[key]['Availability'] == true) {
                    if ((new Date().getHours()+8) > 23) {
                        var hour = new Date().getHours() + 8 -24;
                    } else {
                        var hour = new Date().getHours() + 8;
                    }
                    var allocatedtime = (hour <10 ? '0' : '') + hour + ':' + (new Date().getMinutes() <10 ? '0' : '') + new Date().getMinutes() + ':' + (new Date().getSeconds() <10 ?'0' : '') + new Date().getSeconds();
                    req.session.key = key;
                    req.session.LotID = snapshot.val()[key]['LotID'];
                    req.session.AllocatedTime = allocatedtime;
                    req.session.SerialNum = snapshot.val()[key]['SerialNumber'];
                    var date = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
                    req.session.DateAllocated = date;
                    console.log(req.session);
                    //firebase.database().ref('Lots/'+ req.session.key).update({'Availability': false });
                    break;
                }
            }
            res.redirect('checkin'); 
        });
        
        
       
    });
};
