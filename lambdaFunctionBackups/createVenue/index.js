const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

// attr of event
/*
* venueName
* layout
*
*
*
*
* */

exports.handler = async (event) => {
// get credentials from the db_access layer (loaded separately via AWS console)
    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });
    let ValidateExists = (name) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venue WHERE name=?", [name], (error, rows) => {
                if (error) { return reject(error); }
                console.log(rows)
                if ((rows) && (rows.length == 1)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                } }); }); }
    let response = undefined
    const can_create = await ValidateExists(event.venueName); // check to see if this already exists


    if (!can_create) {
        let CreateVenue = (name) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Venue(name) VALUES(?);", [name], (error, rows) => {
                    if (error) { return reject(error); }
                    if ((rows) && (rows.affectedRows == 1)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    } }); }); }

        // add new venue to "venue" table
        let newVenue = await CreateVenue(event.name)

        let CreateVenueSection = (section) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into venueSection(venueID, name, numRows, numCols) VALUES(?,?,?,?);", [section.venueID,section.name,section.numRows,section.numCols], (error, rows) => {
                    if (error) { return reject(error); }
                    if ((rows) && (rows.affectedRows == 1)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    } }); }); }

        // add every venue section to "venueSection" table
        for (const section of event.layout){
            let add_result = await CreateVenueSection(event.layout[0])
        }

        response = {
            statusCode: 200,
            success: add_result
        }
    } else {
        response = {
            statusCode: 400,
            success: false
        };
    }
    return response;
};
