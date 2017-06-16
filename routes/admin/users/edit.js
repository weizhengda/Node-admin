/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5-node');
var DB = require('../../../model/dbmodle');
var session = require('express-session');
var URL = require('url');
var multiparty = require('multiparty');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

var Host = ''

router.use('/', function (req, res, next) {
    Host = 'http://' + req.headers.host + '/';
    //console.log(Host)
    next()
});


/* GET home page. */
router.get('/', function (req, res) {

    var admin_userinfo_name = session.admin_userinfo.username;
    var id = (URL.parse(req.url, true).query._id);
    //！或者用以下方法获取？_id传值：
    //console.log(req.query._id);

    DB.find('users', {_id: new DB.ObjectID(id)}, function (err, data) {
        console.log(data);
        res.render('admin/users/edit', {
            host: Host,
            'admin_userinfo_name': (admin_userinfo_name),
            result: data[0]
        })
    })


});


router.post('/doEdit', function (req,res) {


    var form = new multiparty.Form();
    form.uploadDir='./public/face';
    form.parse(req,function(err, fields, files) {
        console.log('测试测试测试测试'+fields);
        var id=fields.id[0];
        var username=fields.username[0];
        var sex=fields.sex[0];
        var age=fields.age[0];
        var tel=fields.tel[0];
        var email=fields.email[0];
        var status=fields.status[0];
        var password=md5(fields.password[0]);
        var edittime=(new Date()).toLocaleString();
        var face=files.face[0].path;

        var updateobj={};

        if (req.body.password = '') {
            updateobj = {
                "username": username,
                "password": password,
                'sex': sex,
                'age': age,
                'email': email,
                'face': face,
                'status':status,
                'edittime': edittime
            }
        }else{
            updateobj = {
                "username": username,
                "password": password,
                'sex': sex,
                'age': age,
                'email': email,
                'face':face,
                'password':password,
                'status':status,
                'edittime':edittime
            }
        }

        DB.updateOne('users',{_id:new DB.ObjectID(id)},{$set:updateobj},function(err,result){

            if(err){
                console.log(err);
                res.send("<script>alert('修改失败');location.href= Host+'admin/users'</script>");
                return;
            }


            res.redirect(Host+'admin/users');//添加成功回到后台用户管理首页

        })

    })

})







module.exports = router;