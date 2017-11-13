module.exports = function(app) {
    
    var firebase = require('firebase');
    var database = firebase.database(); 
    var timeRef = database.ref('Time');
    
    app.get('/checkout', function(req,res){
        res.render('checkout');
    });
    app.post('/checkout', function(req, res){
        if ((new Date().getHours()+8) > 23) {
            var hour = new Date().getHours() + 8 -24;
        } else {
            var hour = new Date().getHours() + 8;
        }
        req.session.CheckOutTime = (hour <10 ? '0' : '') + hour + ':' + (new Date().getMinutes() <10 ? '0' : '') + new Date().getMinutes() + ':' + (new Date().getSeconds() <10 ?'0' : '') + new Date().getSeconds();
        timeRef.push({
            UserID: req.session.userID,
            CarparkName: req.session.carpark,
            DateCheckedIn: req.session.DateAllocated,
            TimeAllocated: req.session.AllocatedTime,
            TimeCheckedIn: req.session.CheckInTime,
            TimeCheckedOut: req.session.CheckOutTime
        });
        res.redirect('/carpark');
        console.log(req.session);
    });
};