/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5-node');
var DB=require('../../model/dbmodle');
var session=require('express-session')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var Host=''

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});


/* GET home page. */
router.get('/', function(req, res) {
    console.log('后台主页的'+session.admin_userinfo);
    var admin_userinfo_name=session.admin_userinfo.username;
    console.log(admin_userinfo_name);

    //console.log('host:'+ Host);
    res.render('admin/index',{
        host:Host,
        'admin_userinfo_name':(admin_userinfo_name)
    })
});

module.exports = router;