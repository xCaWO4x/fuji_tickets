const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

// attr of event
/*
* credentials
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

    let ValidateCredentials = (credentials) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Auth WHERE credentials=? && type='VenueManager' ", [credentials],  (error, rows) => {
                if (error) { return reject(error); }
                console.log(rows)
                if ((rows) && (rows.length == 1)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                } }); }); }
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


    const validCredentials = await ValidateCredentials(event.credentials); // check the credentials
    const venueExists = await ValidateExists(event.venueName);

    const can_delete = validCredentials && venueExists


    if (can_delete) {


        let DeleteVenueSection = (name) => {
            return new Promise((resolve, reject) => {
                pool.query("DELETE FROM venueSection WHERE venueID = ?;", [name], (error, rows) => {
                    if (error) { return reject(error); }
                    if ((rows) && (rows.affectedRows == 1)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    } }); }); }

        // add every venue section to "venueSection" table
        for (const section of event.layout){
            let delete_result = await DeleteVenueSection(event.name)
        }


        let DeleteVenue = (name) => {
            return new Promise((resolve, reject) => {
                pool.query("DELETE FROM Venue WHERE venueID = ?;", [name], (error, rows) => {
                    if (error) { return reject(error); }
                    if ((rows) && (rows.affectedRows == 1)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    } }); }); }

        // add new venue to "venue" table
        let venueDeleted = await DeleteVenue(event.name)


        response = {
            statusCode: 200,
            success: delete_result
        }
    } else {
        response = {
            statusCode: 400,
            success: false
        };
    }
    return response;
};
