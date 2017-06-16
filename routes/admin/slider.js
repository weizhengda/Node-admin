/**
 * Created by Administrator on 2017/5/26 0026.
 */
var express = require('express');
var router = express.Router();
var session=require('express-session');
var add=require('./slider/add');
var edit=require('./slider/edit');
var remove=require('./slider/remove');

router.use('/add',add);
router.use('/edit',edit);
router.use('/remove',remove);

var Host=''

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    next()
});

var DB=require('../../model/dbmodle');

/*显示图片数据*/
router.get('/', function(req, res) {
    console.log('后台主页的'+session.admin_userinfo);
    var admin_userinfo_name=session.admin_userinfo.username;
    DB.find('slider',{},function(err,data){
        res.render('admin/slider',{
            host:Host,
            list:data,
            'admin_userinfo_name':(admin_userinfo_name),
        })
    })
});


module.exports = router;