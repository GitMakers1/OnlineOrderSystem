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

exports.register = async function (req, res) {
    const password = req.body.password
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    var users = {
        account: req.body.account,
        email: req.body.email,
        password: encryptedPassword
    }

    connection.query(
        'INSERT INTO users SET ?',
        users,
        function (error, results, fields) {
            if (error) {
                res.status(400).json({
                    code: 400,
                    failed: 'error occurred'
                })
            } else {
                res.status(200).json({
                    code: 200,
                    success: 'user registered successfully'
                })
            }
        }
    )
}

exports.login = async function (req, res) {
    var account = req.body.account
    var password = req.body.password
    if (account.includes('@')) var Qstring = 'SELECT * FROM users WHERE email = ?'
    else var Qstring = 'SELECT * FROM users WHERE account = ?'
    console.log(Qstring)

    connection.query(Qstring, [account], async function (error, results, fields) {
        if (error) {
            res.status(400).json({
                code: 400,
                failed: 'error occurred'
            })
        } else {
            if (results.length > 0) {
                const comparison = await bcrypt.compare(password, results[0].password)
                if (comparison) {
                    res.status(200).json({
                        code: 200,
                        success: 'login successful'
                    })
                } else {
                    res.status(204).json({
                        code: 204,
                        success: 'Email and password do not match'
                    })
                }
            } else {
                res.status(206).json({
                    code: 206,
                    success: 'Email or Account does not exist'
                })
            }
        }
    })
}
