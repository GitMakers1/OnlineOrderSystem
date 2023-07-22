const sql = require('../models/sql.js')
exports.getResturents = async function (req, res) {}

exports.getUser = async function (req, res) {
  const Look = req.query.look
  console.log(userid)
  console.log(Look)
  let query = `select * from users`

  if (Look === 'userid') {
    let userid = req.query.userid
    query = `select * from users WHERE id='${userid}'` // Corrected to use userid
  } else if (Look === 'account') {
    let account = req.query.account
    query = `SELECT * FROM users WHERE account='${account}'` // Assuming req.data is the value for the account
  } else if (Look === 'registertime') {
    let registertime = req.query.registertime
    query = `select * from users where register_at between '${registertime}' and curdate()`
  }

  try {
    const users = await sql.get(query)

    res.status(200).json({ success: true, message: 'users info:', data: users })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting users',
      error: error.message
    })
  }
}

exports.getProfiles = async function (req, res) {}
exports.getDish = async function (req, res) {}

exports.getMenu = async function (req, res) {}
exports.getCategory = async function (req, res) {}
