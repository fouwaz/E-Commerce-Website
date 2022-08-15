const express = require('express');
const router = express.Router();
const itemCtrl = require('../controllers/item');

router.post('/', auth, itemCtrl.createNewItem);
router.get('/:id', auth, itemCtrl.getOneItem);
router.get('/', auth, itemCtrl.getAllItems);
router.delete('/:id', auth, itemCtrl.deleteItem);
router.put('/:id', auth, itemCtrl.modifyItem);