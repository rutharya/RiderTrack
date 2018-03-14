var express = require('express');
var router = express.Router();

router.get('/hello',function(req,res,next){
  res.end('end');
  next();
});


module.exports = router;
