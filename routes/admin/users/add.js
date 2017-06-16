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
var session=require('express-session');
var multiparty = require('multiparty');
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


    //console.log('host:'+ Host);
    res.render('admin/users/add',{
        host:Host,
        'admin_userinfo_name':(admin_userinfo_name)
    })
});


router.post('/doAdd',function(req,res){
    var form = new multiparty.Form();
    //console.log(form);
    form.uploadDir='./public/face';
    form.parse(req,function(err, fields, files){

        var username=fields.username[0];
        var sex=fields.sex[0];
        var age=fields.age[0];
        var tel=fields.tel[0];
        var email=fields.email[0];
        var status=fields.status[0];
        var password=md5(fields.password[0]);
        var addtime=(new Date()).toLocaleString();
        var face=files.face[0].path;

        DB.insertOne('users',{
            username,
            sex,
            age,
            tel,
            email,
            status,
            password,
            face,
            addtime
        },function(err,result){

            if(err){

                console.log(err);
                return;
            }

            res.redirect(Host+'admin/users');//添加成功回到后台用户管理首页

        })

    });
})








module.exports = router;