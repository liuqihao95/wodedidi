var express = require('express');
var router = express.Router();
var users = require('../database/model/users');
var validator = require('validator');
var md5 = require('md5');

router.post('/register', (req, res) => {
    let {address, pwd, sex, type, idNum, email, phone, name, userType} = req.body;
    if (!phone || !validator.isMobilePhone(phone, 'zh-CN')) {
        res.json({
            data: '手机号名非法',
            msg: '用户名非法',
            code: 400,
            ret: false
        });
        return
    }
    else if (!pwd || validator.isEmpty(pwd.trim())) {
        res.json({
            data: '密码不能为空',
            msg: '密码不能为空',
            code: 400,
            ret: false
        });
        return
    }
    else if (!name || validator.isEmpty(name.trim())) {
        res.json({
            data: '用户名不能为空',
            msg: '用户名不能为空',
            code: 400,
            ret: false
        });
        return
    }
    else {
        users.findOne({phone}, (err, data) => {
            if (err) {
                res.json({
                    data: err,
                    msg: 'false',
                    code: 500,
                    ret: false
                });
                return
            }
            if (data != null) {
                res.json({
                    data: '该用户名已被注册',
                    msg: '该用户名已被注册',
                    code: 400
                });
                return
            } else {  //可以注册的部分
                pwd = md5(pwd);
                users.create({address, pwd, sex, type, idNum, email, phone, name, userType}, (err, data) => {
                    if (err) {
                        res.json({
                            data: err,
                            code: 500,
                            msg: 'false',
                            ret: false
                        });
                        return
                    } else {
                        res.json({
                            data: '注册成功',
                            msg: '注册成功',
                            code: 200,
                            ret: true
                        })
                    }
                })
            }
        })
    }
});

module.exports = router;
