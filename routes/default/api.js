/**
 * Created by Administrator on 2017/5/27 0027.
 */
/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
/*var bodyParser = require('body-parser');
var md5 = require('md5-node');
var DB=require('../../model/dbmodle');
var session=require('express-session');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));*/
var article = require('./api/article');
var login = require('./api/login');
var advice = require('./api/advice');
var cate = require('./api/cate');
var website = require('./api/website');
var slider = require('./api/slider');

var Host='';

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});

router.use('/article',article);//文章接口
router.use('/cate',cate);//文章分类接口
router.use('/login',login);//登录api接口
router.use('/advice',advice);//提交意见api接口
router.use('/website',website);//后台设置api接口
router.use('/slider',slider);//后台设置api接口

router.get('/', function(req, res) {
    /*console.log('后台主页的'+session.admin_userinfo);
    var admin_userinfo_name=session.admin_userinfo.username;*/

});





module.exports = router;