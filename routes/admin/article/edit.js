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
var async = require('async');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

var Host = ''

router.use('/', function (req, res, next) {
    Host = 'http://' + req.headers.host + '/';
    //console.log(Host)
    next()
});


/* GET home page. */
//router.get('/', function (req, res) {
//
//    var admin_userinfo_name = session.admin_userinfo.username;
//    var id = (URL.parse(req.url, true).query._id);
//    //！或者用以下方法获取？_id传值：
//    console.log(id);
//
//    DB.find('article', {_id: new DB.ObjectID(id)}, function (err, data) {
//        console.log(data);
//        res.render('admin/article/edit', {
//            host: Host,
//            'admin_userinfo_name': (admin_userinfo_name),
//            result: data[0]
//        })
//    })
//
//
//});

router.get('/', function(req, res) {
    var admin_userinfo_name = session.admin_userinfo.username;
    var id = (URL.parse(req.url, true).query._id);
    //！或者用以下方法获取？_id传值：
    console.log(id);

    async.parallel({
            article: function(callback) {
                DB.find('article', {_id: new DB.ObjectID(id)}, function(err, data) {

                    if(err) {

                        console.log(err);
                        return;
                    }
                    console.log(data);
                    callback(err, data[0])
                })
            },
            cate: function(callback) {
                DB.find('cate', {}, function(err, data) {

                    if(err) {

                        console.log(err);
                        return;
                    }
                    callback(err, data);
                })
            }
        },
        function(err, data) {
            res.render('admin/article/edit', {
                host: Host,
                'admin_userinfo_name': (admin_userinfo_name),
                'result': data.article,
                'cate': data.cate
            })
        }
    )
})















router.post('/doEdit', function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var author = req.body.author;
    var cid=req.body.cid;

    var email = req.body.email;
    var description=req.body.description;
    var content=req.body.content;

    var updateobj={
        title,
        author,
        cid,
        email,
        description,
        content
    };
    console.log(updateobj);

    DB.updateOne('article',{_id:new DB.ObjectID(id)},{$set:updateobj},function(err,result){

        if(err){
            console.log(err);
            res.send("<script>alert('修改失败');location.href= Host+'admin/users'</script>");
            return;
        }

        //if(result){
        //    console.log(result);
        //}

        res.redirect(Host+'admin/article');//添加成功回到后台用户管理首页

    })
})


module.exports = router;