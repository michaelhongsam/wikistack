const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
   res.redirect('/');
});

router.get('/:id', function(req, res){
   
});

router.post('/', function(req, res){

});

router.put('/:id', function(req, res){
   
});

router.delete('/:id', function(req, res){

});


module.exports = router;