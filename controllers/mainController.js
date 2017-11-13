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
        var carpark = req.body.carpark;
        carparkRef.orderByChild('CarparkName').equalTo(carpark).on("child_added", function(snapshot){
            if (snapshot.val().AvailableLots == 0) {
                console.log('no lots');
            }
            else {
                var carparkid = snapshot.val().CarparkID;
                //var availablelots = snapshot.val().AvailableLots - 1;
                //var key1 = snapshot.key;
                //firebase.database().ref('Carparks/' + key1).update({'AvailableLots': availablelots});
                lotsRef.on('value', function(snapshot) {
                    for (var key in snapshot.val()) {
                        if (snapshot.val()[key]['CarparkID'] == carparkid && snapshot.val()[key]['Availability'] ==true) {                        
                            if ((new Date().getHours()+8) > 23) {
                                var hour = new Date().getHours() + 8 -24;
                            } else {
                                var hour = new Date().getHours() + 8;
                            }
                            var allocatedtime = (hour <10 ? '0' : '') + hour + ':' + (new Date().getMinutes() <10 ? '0' : '') + new Date().getMinutes() + ':' + (new Date().getSeconds() <10 ?'0' : '') + new Date().getSeconds();
                            req.session.carpark = carpark;
                            req.session.LotID = snapshot.val()[key]['LotID'];
                            req.session.AllocatedTime = allocatedtime;
                            req.session.SerialNum = snapshot.val()[key]['SerialNumber'];
                            //res.render('checkin', {AllocatedTime: ((new Date().getHours()+8) >23 ? new Date().getHours()+8-24 : new Date().getHours()+8) + ':' + (new Date().getMinutes() <10 ? '0' : '') + new Date().getMinutes() + ':' + (new Date().getSeconds() <10 ?'0' : '') + new Date().getSeconds(),
                            //    LotID: snapshot.val()[key]['LotID'],
                             //   SerialNumber: snapshot.val()[key]['SerialNumber']});
                            var date = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
                            req.session.DateAllocated = date;
                            console.log(req.session);
                            res.redirect('checkin');
                            //TO BE DONE: update availability of carpark as well as lot etc
                            break;
                        }
                    }
                });
            }
        });

        
    });
};