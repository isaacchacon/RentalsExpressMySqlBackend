var Property = require('../models/Property');
var express = require('express');
var router = express.Router();

/* GET properties listing. */
router.get('/:id?', function(req, res, next) {
    if(req.params.id){
        Property.getPropertyById(req.params.id,function(err,rows){
            res.json(err?err:rows);
        })
    }else{
        Property.getAllProperties(function(err,rows){
            res.json(err?err:rows);
        })
    }
});

module.exports = router;
