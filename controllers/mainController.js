module.exports = function(app) {
    
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    var firebase = require('firebase');
    var database = firebase.database(); 
    var carparkRef = database.ref('Carparks');
    var lotsRef = database.ref('Lots');


    app.get('/carpark', function(req,res){

        carparkRef.on('value', function(snapshot){
            res.render('main', {carparks: snapshot.val()} );
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
            //lotsRef.orderByChild('CarparkID').equalTo(carparkid).on("child_added", function(snapshot){
             //   for (var i in snapshot.val()) {
             //       console.log(i);
             //   }
                
            //});
            lotsRef.on('value', function(snapshot) {
                for (var key in snapshot.val()) {
                    if (snapshot.val()[key]['CarparkID'] == carparkid && snapshot.val()[key]['Availability'] ==true) {
                        //var serialnumber = snapshot.val()[key]['SerialNumber'];
                        //var details = [{SerialNumber: serialnumber}];
                        
                        res.render('checkin', {AllocatedTime: ((new Date().getHours()+8) >23 ? new Date().getHours()+8-24 : new Date().getHours()+8) + ':' + (new Date().getMinutes() <10 ? '0' : '') + new Date().getMinutes() + ':' + (new Date().getSeconds() <10 ?'0' : '') + new Date().getSeconds(),
                            LotID: snapshot.val()[key]['LotID'],
                            SerialNumber: snapshot.val()[key]['SerialNumber']});
                        break;
                    }
                }
            });
        }
    });

        
    });
};