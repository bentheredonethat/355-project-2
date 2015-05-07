var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all routes in a <table> */
router.get('/all', function (req, res) {
    db.GetAllRoutes(function (err, result) {
            if (err) throw err;
            res.render('displayRoutesTable.ejs', {rs: result});
        }
    );
});


/* View a single route's information */
router.get('/', function (req, res) {
    if(req.query.routeID == null) {
        res.redirect('/route/all');
    }
    else {
        db.GetByRouteID(req.query.routeID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original routeID in case there were no results
                res.render('displayRouteInfo.ejs', {rs: result, routeID: req.query.routeID});
            }
        );
    }
});

// Create route Form
router.get('/create/', function(req, res){
    db.GetAllLocations(function (err, location_result) {
        if (err) throw err;
        else
            res.render('createRouteForm.ejs',
                {
                    action: '/route/create',
                    locationsRS: location_result
                });
    });
});

// Save route information
router.post('/create/', function (req, res) {
    db.InsertRoute( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                console.log(result);
                db.GetByRouteID(result.insertId, function(err, result){
                    res.render('displayRouteInfoSnippet.ejs', {rs: result, routeID: result.insertId});

                });
            }
            else {
                res.send('Route was not inserted.');
            }
        }
    );
});

module.exports = router;

