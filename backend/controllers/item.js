const Item = require('../models/item');
const fs = require('fs');


//GET routes

//Get one specific item
exports.getOneItem = (req,res,next)=>{
    Item.findOne({
        _id: req.params.id
    }).then((item)=>{
        res.status(200).json(item)
    }).catch((error)=>{
        res.status(401).json({
            error:error
        });
    });
};

//Get all Items
exports.getAllItems = (req,res,next)=>{
    Item.find().then(
        (items)=>{
            res.status(200).json(items)
        }
    ).catch((error)=>{
        res.status(401).json({
            error: error
        });
    });
};


//POST route

//Creating a new item

exports.createNewItem = (req,res,next)=>{
    req.body.item = JSON.parse(req.body.item);
    const url = req.protocol+'://'+req.get('host');
    const item = new Item({
        title: req.body.item.title,
        price: req.body.item.price,
        description: req.body.item.description,
        imageUrl: url+'/images'+req.file.filename,
        userId: req.body.item.userId
    });
    item.save()
    .then(
        ()=>{
            res.status(201).json('Post saved successfully!')
        }
    ).catch(
        (error)=>{
            res.status(401).json({
                error:error
            })
        }
    );
}

//DELETE route

//Deleting an item

exports.deleteItem = (req,res,next)=>{
    Item.findOne({_id: req.params.id})
    .then((item)=>{
        if(!item){
            return res.status(404).json({
                error: new Error('Item not found!')
            });
        }
        if (item.userId !== req.auth.userId){
            return res.status(401).json({
                error: new Error('Unauthorized request!')
            });
        }
        //The follwing line will delete the imagew from the images folder
        fs.unlink('images/'+filename,()=>{
            Item.deleteOne({
                _id: req.params.id
            }).then(()=>{
                res.status(200).json({
                    message: 'Item deleted'
                });
            }).catch((error)=>{
                res.status(401).json({
                    error:error
                });
            });
        });
    }).catch((error)=>{
        req.status(401).json({
            error: error
        });
    });
}


//PUT route

//Modifying an item

exports.modifyItem = (req,res,next)=>{
   let item = new Item({_id: req.params.id}); //Keeping the same id
   if(req.file){
       const url = req.protocol+"://"+req.get('host');
       item = ({
           _id:req.params.id,
           title: req.body.item.title,
           price: req.body.item.price,
           description: req.body.item.description,
           imageUrl: url+'/images'+req.file.filename,
           userId: req.body.item.userId
       });
   }else{
       item = ({
           _id: req.params.id,
           title: req.body.title,
           price: req.body.price,
           description: req.body.description,
           imageUrl: req.body.imageUrl,
           userId: req.body.userId
       });
   }
   Item.updateOne({_id: req.params.id}, item).then(
       ()=>{
        res.status(201).json({
            message: 'Item updated successfully!'
        });
       }
   ).catch((error)=>{
    res.status(401).json({
        error: error
    });
   });

   
}