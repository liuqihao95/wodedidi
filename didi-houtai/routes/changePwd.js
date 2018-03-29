var express = require('express');
var router = express.Router();
var validator = require('validator');
var users = require('../database/model/users');
var md5=require('md5');

router.post('/changePwd', (req, res) => {
    let {pwd, newpwd} = req.body;
    if (!pwd||validator.isEmpty(pwd.trim())) {
        res.json({
            data:"旧密码不能为空",
            msg:"旧密码不能为空",
            code:400,
            ret:false
        })
        return
    }else if(!newpwd||validator.isEmpty(newpwd.trim())){
        res.json({
            data:"新密码不能为空",
            msg:"新密码不能为空",
            code:400,
            ret:false
        })
        return
    }else{
        pwd=md5(pwd);
        users.findOne({pwd},(err,data)=>{
            newpwd= md5(newpwd);
            if(data==null){
                res.json({
                    data:"旧密码不正确",
                    msg:"旧密码不正确",
                    code:400,
                    ret:false
                })
                return
            }else if(newpwd==data.pwd){
                res.json({
                    data:"旧密码不能跟新密码一样",
                    msg:"旧密码不能跟新密码一样",
                    code:400,
                    ret:false
                })
                return
            }else {
                users.update({pwd},{$set:{pwd:newpwd}},(err,data)=>{
                    if(err){
                        res.json({
                            data,
                            msg:"err",
                            code:400,
                            ret:false
                        })
                        return
                    }else{
                        res.json({
                            data:"修改密码成功",
                            msg:"success",
                            code:200,
                            ret:true
                        })
                        return
                    }
                })
            }
        })
    }
});

module.exports = router;