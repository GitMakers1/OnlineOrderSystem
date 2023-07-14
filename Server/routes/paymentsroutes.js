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

exports.createCard = async function (req, res) {

    var payments = {
        usersid: req.body.usersid,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        cardid:req.body.cardid,
        expireM:req.body.expireM,
        expireD:req.body.expireD,
        svv: req.body.svv
    }

    connection.query(
        'INSERT INTO payments SET ?',
        payments,
        function (error, results, fields) {
            if (error) {
                res.status(400).json({
                    code: 400,
                    failed: error
                })
            } else {
                res.status(200).json({
                    code: 200,
                    success: 'Card created successfully'
                })
            }
        }
    )
}