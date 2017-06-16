/**
 * Created by Administrator on 2017/5/26 0026.
 */
var express = require('express');
var router = express.Router();
var session=require('express-session');
var Host='';

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    next()
});

var DB=require('../../../model/dbmodle');

var multiparty = require('multiparty');


/*进入编辑页面*/
router.get('/', function(req, res) {
    var id = req.query._id;
    var admin_userinfo_name=session.admin_userinfo.username;

    DB.find('slider', {_id: new DB.ObjectID(id)}, function (err, data) {

        res.render('admin/slider/edit', {
            host: Host,
            result: data[0],
            'admin_userinfo_name':(admin_userinfo_name),
        })
    })
});

/*修改提交*/

router.post('/editPost', function(req, res) {
    var form = new multiparty.Form();
    form.uploadDir='./public/slider-images'
    form.parse(req, function(err, fields, files) {
        var id=fields.id[0]
        var tittle=fields.tittle[0]
        var description=fields.description[0]
        var edittime=(new Date()).toLocaleString();
        var path=files.img[0].path;
        var href=fields.href[0];


        var sliderobj={
            tittle,
            description,
            edittime,
            path,
            href
        }
        console.log(sliderobj.path);
        DB.updateOne('slider',{_id: new DB.ObjectID(id)},{$set:sliderobj},function(err,result){
            if(err) {
                console.log(err);
                return;
            }
            res.redirect(Host+'admin/slider')
        })
    });

});


module.exports = router;
