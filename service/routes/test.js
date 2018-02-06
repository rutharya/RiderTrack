//testing mongodb against local environment and production using mongoAtlas.


var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  res.send("hello");
});

module.exports = router;
