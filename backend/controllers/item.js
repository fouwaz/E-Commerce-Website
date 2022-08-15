const Item = require('../models/item');
const fs = require('fs');


exports.createNewItem((req,res,next)=>{
    const item = new Item({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
    item.save()
    .then(()=>{
        res.status(201).json({message: 'Item posted successfully!'});
    }).catch((error)=>{
        res.status(401).json({error: error});
    });
});


exports.getOneItem((req,res,next)=>{
    Item.findOne({
        _id: req.params.id
    }).then((item)=>{
        res.status(200).json(item);
    }).catch((error)=>{
        res.status(400).json({error: error});
    });
});



exports.getAllItems((req,res,next)=>{
    Item.find()
    .then((items)=>{
        res.status(200).json(items);
    }).catch((error)=>{
        res.status(400).json({error: error});
    });
});



exports.deleteItem((req,res,next)=>{
    Item.findOne({_id: req.params.id})
    .then((item)=>{
        if (! item){
            return res.status(404).json({error: new Error('Item not found')});
        }
        if (req.auth.userId !== item.userId){
            return res.status(401).json({error: new Error('Unauthorized request!')});
        }
        item.
    }).catch((error)=>{
        res.status(400).json({error: error});
    });
});



exports.modifyItem((req,res,next)=>{
    const item = new Item(_id: req.params.id,{
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
});