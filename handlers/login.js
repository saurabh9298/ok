const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const myslqCfg = require('./mysql-config');
const mysqlConfig = require('./mysql-config');

//secret key to be maintained only on the server side, and must be a very complex string
const secretKey = require('./secret.key');

module.exports = (req, resp) => {

    //check if payload contains emial/password (in md5 format) fields
    if ('email' in req.body && 'password' in req.body) {
        const sql = 'select * from users where email=? and password=?';
        const data = [req.body.email, req.body.password];
        const conn = mysql.createConnection(mysqlConfig);
        conn.query(sql, data, (err, results) => {
            if (err) throw err;

            const isValidUser = (results.length === 1);

            if (isValidUser) {
                //if valid, then generate a JST and send a response body
                let user = results[0];
                // const [firstname, lastname, city]=['vinod', 'kumar', 'Bangalore']; //to be retrieved from DB (TBD)
                const payload = {
                    sub: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    it: Date.now()
                };
                const token = jwt.sign(payload, secretKey);
                resp.json({ token });
            }
            else {
                //if invalid, then respond with HTTP status code 401
                resp.status(401);
                resp.json({ message: 'Invalid email/password combination!' });
            }
            conn.end();
        });
    }
    else {
        resp.send(404);
        resp.semd({ message: 'email and password are required in json format' });
    }

    //check if the email/password is valid acccording to our db (TBD)
    // let isValidUser=true; //this needs to be changed; should check with db data



}