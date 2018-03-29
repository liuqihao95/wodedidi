var express = require('express');
var router = express.Router();
var projects = require("../database/model/images");

/* GET home page. */
router.post('/add', function (req, res, next) {
    let {img} = req.body;
    projects.create({img,createTime:(new Date()).toLocaleString()}, (err, data) => {
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
                data: "查找失败",
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
router.post('/update', function (req, res, next) {
    let {img,id} = req.body;
    projects.update({_id:id},{$set:{img,updateTime:(new Date()).toLocaleString()}}, (err, data) => {
        if (err) {
            res.json({
                data: "更新失败",
                code: "500",
                msg: "更新失败",
                ret: false
            });
            return
        }
        else if(data.n==0){
            res.json({
                data,
                code: "400",
                msg: "无效的id",
                ret: false
            });
            return
        }
        else {
            res.json({
                data:data,
                code: "200",
                msg: "success",
                ret: true
            });
        }
    })
});
router.post('/del', function (req, res, next) {
    let {id} = req.body;
    projects.remove({_id:id}, (err, data) => {
        if (err) {
            res.json({
                data: "删除失败",
                code: "500",
                msg: "删除失败",
                ret: false
            });
            return
        }
        else if(data.n==0){
            res.json({
                data: "无效的id",
                code: "400",
                msg: "无效的id",
                ret: false
            });
            return
        }
        else {
            res.json({
                data:data,
                code: "200",
                msg: "success",
                ret: true
            });
        }
    })
});
module.exports = router;
