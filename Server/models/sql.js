var mysql = require('mysql')
const bcrypt = require('bcrypt')
const { json } = require('body-parser')
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

exports.insert = function (insert, data) {
  return new Promise((resolve, reject) => {
    connection.query(insert, data, function (error, results, fields) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

exports.get = function (get) {
  return new Promise((resolve, reject) => {
    connection.query(get, function (error, results, fields) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
