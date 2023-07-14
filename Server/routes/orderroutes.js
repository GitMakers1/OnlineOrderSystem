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

exports.createOrder = async function (req, res) {
    var theOrder = req.body.theOrder;
    var values = [];
    var totalPrice = 0;
    for (var i = 0; i < theOrder.length; i++) {
      values.push({
        dishid: theOrder[i].dishid,
        name: theOrder[i].name,
        changes: theOrder[i].changes,
        price: theOrder[i].price
      });
      totalPrice += theOrder[i].price;
    }
  
    var Order = {
      OrderNumber: req.body.OrderNumber,
      usersID: req.body.usersID,
      theOrder: JSON.stringify(values), // Convert the array to JSON string
      totalPrice: totalPrice
    };
  
    connection.query(
      'INSERT INTO Orders SET ?',
      Order,
      function (error, results, fields) {
        if (error) {
          res.status(400).json({
            code: 400,
            failed: error
          });
        } else {
          res.status(200).json({
            code: 200,
            success: 'Order created successfully'
          });
        }
      }
    );
  };
  