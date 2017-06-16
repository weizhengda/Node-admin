var express = require('express');
var router = express.Router();
//var url=require('url');



var login = require('./admin/login');
var index = require('./admin/index');
var users = require('./admin/users');
var article = require('./admin/article');
var cate = require('./admin/cate');
var advice = require('./admin/advice');//意见反馈
var slider = require('./admin/slider');
var administrator=require('./admin/administrator');
var session = require("express-session");

/* GET users listing. */
router.use(function(req,res,next){
    console.log(req.url);


    if(req.url!='/login'&&req.url!='/login/doLogin'){
        if(session.admin_userinfo){
            next()
        }
        else{
            res.redirect('/admin/login');
        }
    }else{
        next();
    }
})



router.use('/login',login);
router.use('/index',index);
router.use('/',index);
router.use('/users',users);
router.use('/article',article);
router.use('/cate',cate)
router.use('/advice',advice);
router.use('/slider',slider);
router.use('/administrator',administrator);
module.exports = router;
