var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAllClimbers = function(callback) {
    connection.query('select Climber.climberName, Climber.hardestGradeUS, climberID ' +
        'from Climber where ' +
        'hardestGradeUS =(select max(hardestGradeUS) )',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};

exports.GetByClimberID = function(climberID, callback) {
    console.log(climberID);
    var query = 'CALL ClimberByID(' + climberID + ');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};

exports.InsertClimber = function(climber_info, callback) {
    console.log(climber_info);

    var query = 'call ClimberByID( cInsertcrInsert(\'' +
        climber_info.climberName + '\', \'' +
        climber_info.hardestGradeUS + '\', \'' +
        climber_info.hardestGradeEuro + '\', \'' +
        climber_info.country + '\', ' +
        climber_info.birthYear + ', ' +
        climber_info.routeID + '));';
    console.log(query);

    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        });
};


exports.GetAllRoutes = function(callback) {
    connection.query('select * from Route',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
};

exports.GetByRouteID = function(routeID, callback) {
    console.log(routeID);
    var query = 'Select * from Route where routeID=' + routeID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};

exports.InsertRoute = function(route_info, callback) {
    console.log(route_info);
    var query = 'INSERT INTO Route (routeName, locationOfRoute, difficultyUS, ' +
        'difficultyEuro, firstAscent, typeOfClimb, routeSetter, numberPitches) VALUES (' +
        '\'' + route_info.routeName + '\', ' +
        '\'' + route_info.locationOfRoute + '\',' +
        '\'' + route_info.difficultyUS + '\',' +
        '\'' + route_info.difficultyEuro + '\',' +
        '\'' + route_info.firstAscent + '\',' +
        '\'' + route_info.typeOfClimb + '\',' +
        '\'' + route_info.routeSetter + '\',' +
        + route_info.numberPitches + ');' ;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
};


exports.GetAllLocations = function(callback) {
    connection.query('select * from Location',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};

exports.GetAllSponsorsForClimberID = function(climberID, callback) {
    console.log("climberID for GetAllSponsorsForClimberID is: " + climberID);
    connection.query('call SponsorsByclimberID(' + climberID + ')',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log("SponsorsByclimberID worked");
            console.log(result);
            callback(false, result);
        }
    );
};

