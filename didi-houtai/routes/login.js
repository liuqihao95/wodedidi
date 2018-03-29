var express = require('express');
var router = express.Router();
var users = require('../database/model/users');
var validator = require('validator');
var md5 = require('md5');

router.post('/login', (req, res) => {
    let {pwd,phone}=req.body;
    if(!pwd||validator.isEmpty(pwd.trim())){
        res.json({
            data:"密码为空",
            msg:"密码为空",
            code:400,
            ret:false
        });
        return
    }else if(!phone||!validator.isMobilePhone(phone,'zh-CN')){
        res.json({
            data:"用户名不合法",
            msg:"用户名不合法",
            code:400,
            ret:false
        });
        return
    }else{
        users.findOne({phone},(err,data)=>{
            pwd=md5(pwd);
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
                console.log(req.session)
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
