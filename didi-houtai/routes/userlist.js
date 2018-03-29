var express = require('express');
var router = express.Router();
var users = require('../database/model/users');

/* GET home page. */
router.get('/getlist', function(req, res, next) {
  let {pn,phone}=req.query;
  console.log(pn)
  let params={};
  if(phone){
      params={phone}
  }else{
    params={}
  }
  users.find(params).skip((pn-1)*5).limit(5).exec((err,data)=>{
    console.log(data);
    if(err){
        res.json({
          data:err,
          masg:"出错了",
          code:500,
          ret:false
        })
        return
    }
    if(data==null){
      res.json({
        data:"查询无果",
        masg:"出错了",
        code:500,
        ret:false
      })
      return
    }else{
      res.json({
        data:data ,
        masg:"success",
        code:200,
        ret:true
      })
      return
    }
  })
});

module.exports = router;
