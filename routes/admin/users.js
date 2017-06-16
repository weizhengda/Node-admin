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

var add=require('./users/add');
var edit=require('./users/edit');
var remove=require('./users/remove');

var Host=''

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});

router.use('/add',add);
router.use('/edit',edit);
router.use('/remove', remove);

router.get('/', function(req, res) {
    console.log('后台主页的'+session.admin_userinfo);
    var admin_userinfo_name=session.admin_userinfo.username;

    //用去数据库用户数据
    DB.find('users',{},function(err,data){

        if(err){

            console.log(err);
            return;
        }
        console.log(data);

        //for(var i =0;i<data.length;i++){
        //    if(data[i].username)
        //}

        res.render('admin/users',{
            host:Host,
            'admin_userinfo_name':(admin_userinfo_name),
            'userlist':data
        })

    })


});





module.exports = router;