var mysql = require('mysql')
const bcrypt = require('bcrypt')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '741852',
    database: 'OnlineOrderSystem'
})

connection.connect(function (err) {
    if (!err) {
        console.log('Database is connected...')
    } else {
        console.log('Error connecting database...')
    }
})


const saltRounds = 10 // Define the saltRounds variable

exports.createProfile = async function (req, res) {

    var profile = {
        usersid: req.body.usersid,
        name: req.body.name,
        type: req.body.type,
        imageid: 1
    }

    connection.query(
        'INSERT INTO profiles SET ?',
        profile,
        function (error, results, fields) {
            if (error) {
                res.status(400).json({
                    code: 400,
                    failed: error
                })
            } else {
                res.status(200).json({
                    code: 200,
                    success: 'Profile created successfully'
                })
            }
        }
    )
}