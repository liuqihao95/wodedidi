var express = require('express');
var router = express.Router();

router.post('/outlogin', (req, res) => {
    req.session.user=null;
    res.json({
        data:"退出登录成功",
        msg:"退出登录成功",
        code:200,
        ret:true
    })
    return
});

module.exports = router;
