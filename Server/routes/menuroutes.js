var sql = require('../models/sql.js')
const bcrypt = require('bcrypt')



exports.createMenu = async function (req, res) {
  var menus = {
    name:req.body.name,
    profilesID: req.body.profilesID,
    type: req.body.type,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    imageid: 1
  }


  try {
    const info = await sql.insert('INSERT INTO menus SET ?', menus);

    res.status(200).json({ success: true, message: 'Menu created successfully', data: info });
  } catch (error) {

    res.status(500).json({ success: false, message: 'Error creating menu', error: error.message });
  }
}
  exports.createCategory = async function (req, res) {
    var category = {
      menuid: req.body.menuid,
      name: req.body.name,
      type: req.body.type,
      imageid: req.body.imageid
    }


    try {
      const info = await sql.insert('INSERT INTO menuCategory SET ?', category);
  
      res.status(200).json({ success: true, message: 'Menu created successfully', data: info });
    } catch (error) {
  
      res.status(500).json({ success: false, message: 'Error creating menu', error: error.message });
    }
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

    try {
      const info = await sql.insert('INSERT INTO dishs SET ?', Dish);
  
      res.status(200).json({ success: true, message: 'Menu created successfully', data: info });
    } catch (error) {
  
      res.status(500).json({ success: false, message: 'Error creating menu', error: error.message });
    }
    
  }


