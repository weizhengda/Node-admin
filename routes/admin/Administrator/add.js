/**
 * Created by Administrator on 2017/5/25 0025.
 */
/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5-node');
var DB=require('../../../model/dbmodle');
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
    //console.log('后台主页的'+session.admin_userinfo);
    var admin_userinfo_name=session.admin_userinfo.username;



   res.render('admin/administrator/add',{
        host:Host,
        'admin_userinfo_name':(admin_userinfo_name)
    })
});






router.post('/doAdd',function(req,res){
    var username=req.body.username;
    var position=req.body.position;
    var sex=req.body.sex;
    var tel=req.body.tel;
    var password = req.body.password;


     DB.insertOne('admin',{
        "username":username,
        "position":position,
        'sex':sex,
         "tel":tel,
        "password":password
    },function(err,result){

        if(err){

            console.log(err);
            return;
        }

        res.redirect(Host+'admin/Administrator');//添加成功回到后台用户管理首页



    })
})








module.exports = router;