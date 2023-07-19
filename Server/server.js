var express = require('express')
const path = require('path')
var login = require('./routes/loginroutes')
var profile = require('./routes/profileroutes')
var payment = require('./routes/paymentsroutes')
var menus = require('./routes/menuroutes')
var orders = require('./routes/orderroutes')
var images = require('./routes/imagesHandle')
const myMulter = require('./models/mullterHandle.js')
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express()
app.use( cors() )
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})


app.use('/static',express.static(path.resolve(__dirname,"fronted","static")));

// all data-back to main page
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname,"fronted","index.html"));
}) //route to handle user registration

var router = express.Router() // test route



router.post('/register', login.register)
router.post('/login', login.login)
router.post('/createProfile', profile.createProfile)
router.post('/createCard', payment.createCard)
router.post('/createMenu', menus.createMenu)
router.post('/createCategory', menus.createCategory)
router.post('/createDish', menus.createDish)

router.post('/createOrder',orders.createOrder)
router.post('/createImage',images.createImage)
router.post('/getimage',images.getimage)

//multer:



router.post("/uploadImage", myMulter.upload.single("image"),images.uploadimage);

app.use('/api', router)
app.listen(4000)
