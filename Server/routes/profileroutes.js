var mysql = require('mysql')
const path = require('path')
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

exports.createProfile = async function (req, res) {
  const name = req.body.name;
  const userid = req.body.userid;
  const type =req.body.type;
  const imageid = req.body.imageid;
  var profile = {
    name: name,
    usersid: userid,
    type: type,
    imageid:imageid
  }
  console.log(profile);

  connection.query(
      'INSERT INTO profiles SET ?',
      profile,
      function (error, results, fields) {
          if (error) {
              res.status(400).json({
                  code: 400,
                  failed: 'error occurred',
                  error:error
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