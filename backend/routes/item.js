const express = require('express');
const router = express.Router();
const itemCtrl = require('../controllers/item');

//Middleware
const auth = require('../middlewear/auth');
const multer = require('../middlewear/multer-config');

router.post('/', auth, multer, itemCtrl.createNewItem);
router.get('/:id', auth, itemCtrl.getOneItem);
router.get('/', auth, itemCtrl.getAllItems);
router.delete('/:id', auth, itemCtrl.deleteItem);
router.put('/:id', auth, multer, itemCtrl.modifyItem);