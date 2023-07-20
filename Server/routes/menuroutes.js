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

exports.createMenu = async function (req, res) {
  var menus = {
    name:req.body.name,
    profilesID: req.body.profilesID,
    type: req.body.type,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    imageid: 1
  }

  console.log(menus);
  connection.query(
    'INSERT INTO menus SET ?',
    menus,
    function (error, results, fields) {
      if (error) {
        res.status(400).json({
          code: 400,
          failed: error
        })
      } else {
        res.status(200).json({
          code: 200,
          success: 'menu created successfully'
        })
      }
    }
  )
}
  exports.createCategory = async function (req, res) {
    var category = {
      menuid: req.body.menuid,
      name: req.body.name,
      type: req.body.type,
      imageid: req.body.imageid
    }

    connection.query(
      'INSERT INTO menuCategory SET ?',
      category,
      function (error, results, fields) {
        if (error) {
          res.status(400).json({
            code: 400,
            failed: error
          })
        } else {
          res.status(200).json({
            code: 200,
            success: 'Category created successfully'
          })
        }
      }
    )
  }

  exports.createDish = async function (req, res) {
    var Dish = {
      categoryid: req.body.categoryid,
      dishid: req.body.dishid,
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      imageid: req.body.imageid,
      price:req.body.price
    }

    connection.query(
      'INSERT INTO dishs SET ?',
      Dish,
      function (error, results, fields) {
        if (error) {
          res.status(400).json({
            code: 400,
            failed: error
          })
        } else {
          res.status(200).json({
            code: 200,
            success: 'Dish created successfully'
          })
        }
      }
    )
  }


