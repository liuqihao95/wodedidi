var express = require('express');
var router = express.Router();
var guanliyuan = require('../database/model/guanliyuan');
var validator = require('validator');
var md5 = require('md5');

router.post('/login', (req, res) => {
    let {pwd,name}=req.body;
    if(!pwd||validator.isEmpty(pwd.trim())){
        res.json({
            data:"密码为空",
            msg:"密码为空",
            code:400,
            ret:false
        });
        return
    }else if(!name||validator.isEmpty(name.trim())){
        res.json({
            data:"用户名不能为空",
            msg:"用户名不能为空",
            code:400,
            ret:false
        });
        return
    }else{
        guanliyuan.findOne({name},(err,data)=>{
            // pwd=md5(pwd);
            if(err){
                res.json({
                    data,
                    msg:err,
                    code:400,
                    ret:false
                });
                return
            }if(data==null){
                res.json({
                    data:"用户名错误或位注册",
                    msg:"用户名错误或位注册",
                    code:400,
                    ret:false
                });
                return
            }else if(pwd==data.pwd){
                req.session.user=data;
                res.json({
                    data:"登录成功",
                    msg:"登录成功",
                    code:200,
                    ret:true
                });
                return
            }else {
                res.json({
                    data:"用户名与密码不匹配",
                    msg:"用户名与密码不匹配",
                    code:400,
                    ret:false
                });
                return
            }
        })
    }

});

module.exports = router;
