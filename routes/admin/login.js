
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
    //console.log('host:'+ Host);
    res.render('admin/login',{
        host:Host
    })
});


router.post('/doLogin',function(req,res){
    var username=req.body.username;
    var password=md5(req.body.password)

    console.log(username);
    console.log(password);

    DB.find('admin',{"username":username,"password":password},function(err,data){

        if(err){

            console.log(err);
            return;
        }
        console.log('数据库返回的data'+data);
        if(data.length>0){


            session.admin_userinfo=data[0];

            res.redirect(Host+'admin/index');//成功登录回到后台首页

        }else{//数据库找不到数据，登录失败
            res.send("<script>alert('用户名或者密码错误');location.href='/admin/login'</script>");
        }


    })

})


module.exports = router;