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
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var Host='';

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    next()
});


/* GET home page. */
router.get('/', function(req, res) {
    console.log('后台主页的'+session.admin_userinfo);
    var admin_userinfo_name=session.admin_userinfo.username;
    DB.find('cate',{},function(err,data){
        console.log(data);
        res.render('admin/article/add',{
            host:Host,
            'admin_userinfo_name':(admin_userinfo_name),
            cate:data
        })


    })
    //console.log('host:'+ Host);

});


router.post('/doAdd',function(req,res){


    var title=req.body.tittle;
    var cid=req.body.cid;
    var author=req.body.author;
    var email=req.body.email;
    var description=req.body.description;
    var content=req.body.content;
    var addtime=(new Date()).toLocaleString();

    var articleobj={
        title,
        cid,
        author,
        email,
        description,
        content,
        addtime
    }

    console.log(articleobj);

    DB.insertOne('article',articleobj,function(err,result){
        if(err){
            console.log(err);
            return;
        }

        res.redirect(Host+'admin/article');//添加成功回到后台文章管理首页

    })
})








module.exports = router;