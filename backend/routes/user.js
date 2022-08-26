//Creating a user router and routes specified for the user requests

const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user')

router.post('/signup',userCtrl.signup)
router.post('/signin',userCtrl.signin)