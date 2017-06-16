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
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

var Host = ''

router.use('/', function(req, res, next){
    Host = 'http://' + req.headers.host + '/';
    //console.log(Host)
    next()
});


/* GET home page. */
router.get('/', function (req, res){

    var admin_userinfo_name = session.admin_userinfo.username;


    var id = req.query.id;
    //！或者用以下方法获取？_id传值：
    //console.log(id);

    DB.find('admin', {_id: new DB.ObjectID(id)}, function (err, data){
        //console.log(data);
        res.render('admin/administrator/edit',{
            host: Host,
            'admin_userinfo_name': (admin_userinfo_name),
            result: data[0]
        })
    })


});


router.post('/doEdit', function (req, res){
    var id = req.body.id;
    var username = req.body.username;
    var position = req.body.position;
    var sex = req.body.sex;
    var tel = req.body.tel;
    var password = md5(req.body.password);
    var updateobj = {}
    if(req.body.password!=''){
        updateobj = {
                "username": username,
                "position": position,
                'sex': sex,
                'tel': tel,
                "password":password

              };

    }else{
        updateobj = {
            "username": username,
            "position": position,
            'sex': sex,
            'tel': tel,
         };
    }

     DB.updateOne('admin',{_id:new DB.ObjectID(id)},{$set:updateobj},function(err,result){

        if(err){
            console.log(err);
            res.send("<script>alert('修改失败');location.href= Host+'admin/administrator'</script>");
            return;
        }

        res.redirect(Host+'admin/administrator');//添加成功回到后台用户管理首页

    })
})


module.exports = router;