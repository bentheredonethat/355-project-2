var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all climbers in a <table> */
router.get('/all/', function (req, res) {
    db.GetAllClimbers(function (err, result) {
            if (err) throw err;
            res.render('displayClimbersTable.ejs', {rs: result});
        }
    );
});


/* View a single climber's information */
router.get('/', function (req, res) {
    if(req.query.climberID == null) {
        res.redirect('/climber/all');
    }
    else
    console.log("got climberID");
    db.GetAllSponsorsForClimberID(req.query.climberID, function (err1, sponsorRS) {
        if (err1) throw err1;
        else
        console.log("got all sponsors given ");
        {
            db.GetByClimberID(req.query.climberID, function (err, result) {
                    if (err) throw err;

                    // Send result to the template along with the original climberID in case there were no results
                    res.render('displayClimberInfo.ejs', {
                        rs: result[0],
                        climberID: req.query.climberID,
                        sponsorRS: sponsorRS[0]
                    });
                });
        }
    });
});

// Create climber Form
router.get('/create/', function(req, res){
    db.GetAllRoutes(function (err,result) {
        if (err) throw err;
        else
        console.log(result);
        res.render('createClimberForm.ejs', {
            routeRS: result,
            action: '/climber/create'
        });
    });
});

// Save climber information
router.post('/create/', function (req, res) {
            db.InsertClimber( req.body, function (err1, result) {
                if (err1) {
                    throw err1;
                }
                console.log(result[0]);

                    console.log("insert worked now trying to display \n"+ result);
                    res.render('displayClimberInfoSnippet.ejs', {rs: result[0], climberID: result[0].insertId});


            });



});

module.exports = router;

