/**
 * Created by Administrator on 2017/5/26 0026.
 */
var express = require('express');
var router = express.Router();
var session=require('express-session');
var Host=''

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    next()
});

var DB=require('../../../model/dbmodle');

var multiparty = require('multiparty');


/*进入添加页面*/
router.get('/', function(req, res) {
    var admin_userinfo_name=session.admin_userinfo.username;
    res.render('admin/slider/add',{
        host:Host,
        'admin_userinfo_name':(admin_userinfo_name),
    })

});

/*添加图片*/
router.post('/addPost', function(req, res) {
    var form = new multiparty.Form();

    form.uploadDir='./public/slider-images'
    form.parse(req, function(err, fields, files) {

        var tittle=fields.tittle[0];
        var description=fields.description[0]
        var addtime=(new Date()).toLocaleString();
        var edittime=(new Date()).toLocaleString();
        var href=fields.href[0];
        var path=files.img[0].path;
        DB.insertOne('slider',{"tittle":tittle,"description":description,"href":href,"addtime":addtime,"edittime":edittime,"path":path},function(err,result){
            if(err){
                console.log(err);
                return;
            }
            res.redirect(Host+'admin/slider')
        })
    });

});


module.exports = router;
