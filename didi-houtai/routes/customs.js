var express = require('express');
var router = express.Router();
var projects = require("../database/model/customs");

/* GET home page. */
router.post('/add', function (req, res, next) {
    let {name,phone,idNum,status,level} = req.body;
    projects.create({name,phone,idNum,status,level,createTime:(new Date()).toLocaleString()}, (err, data) => {
        if (err) {
            res.json({
                data: "插入失败",
                code: "500",
                msg: "插入失败",
                ret: false
            });
            return
        }
        else {
            res.json({
                data: "success",
                code: "200",
                msg: "success",
                ret: true
            });
        }
    })
});
router.get('/get', function (req, res, next) {
    let {id,pn} = req.query;
    var params = {};
    if (id) {
        params._id = id;
    }else{
        params = {};
    }
    projects.find(params).sort({_id: -1}).skip((pn-1)*3).limit(3).exec((err, data) => {
        if (err) {
            res.json({
                data:err,
                code: "500",
                msg: "查找失败",
                ret: false
            });
            return
        }
        else {
            res.json({
                data: data,
                code: "200",
                msg: "success",
                ret: true
            });
        }
    })
});
module.exports = router;
