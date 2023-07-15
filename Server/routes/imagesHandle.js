var mysql = require('mysql');
const path = require('path');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '741852',
  database: 'OnlineOrderSystem',
});

connection.connect(function (err) {
  if (!err) {
    console.log('Database is connected...');
  } else {
    console.log('Error connecting database...');
  }
});

exports.createImage = async function(req,res){
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      code: 400,
      failed: 'No file uploaded',
    });
  }



  const file = req.files.file;

  if (!/^image/.test(file.mimetype)) return res.sendStatus(400);

  let highestID;
  const query = 'SELECT MAX(id) AS highestID from images';
  connection.query(query, function (err, result) {
    if (err) {
      console.error('Error retrieving highest ID from database:', err.stack || err.message);
      return res.status(500).json({
        code: 500,
        failed: 'error retrieving highest ID from database',
      });
    }
    highestID = result.length > 0 ? result[0].highestID || 0 : 0;
  
    const newimagename = `image_${highestID + 1}.png`;
    const destination =
      '/home/serverweb/Desktop/OnlineOrderSystem/Server/fronted/static/upload/' +
      newimagename;


  file.mv(destination, function (err) {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({
        code: 500,
        failed: 'Failed to upload file',
      });
    }

    const saveddes = `static/upload/${newimagename}`;
    // Save the image path to the SQL database
    const saveImagePathQuery = 'INSERT INTO images (image) VALUES (?)';
    connection.query(saveImagePathQuery, [saveddes], function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          code: 500,
          failed: 'error saving image path to database',
        });
      }
      res.status(200).json({
        code: 200,
        imageid:highestID +1,
        success: 'image saved successfully',
      });
    });
  });
})
}


exports.getimage = async function (req, res) {
var imageid = req.body.imageid;

let path;



const query = 'SELECT image AS path FROM images WHERE id = ?';
connection.query(query, [imageid], function (err, result) {
  if (err) {
    console.error('Error retrieving image from database:', err.stack || err.message);
    return res.status(500).json({
      code: 500,
      failed: 'error retrieving image from database',
    });
  }
  
  path = result.length > 0 ? result[0].path || '' : '';

  console.log(path);
  // Further code to handle the path as needed

  return res.status(200).json({
    code: 200,
    id: imageid,
    path: path,
  });
})
}

