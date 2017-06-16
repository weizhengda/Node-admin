/**
 * Created by Administrator on 2017/5/26 0026.
 */



/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5-node');
var DB=require('../../model/dbmodle');
var session=require('express-session');

var MongoClient=require("mongodb").MongoClient;
var url="mongodb://10.36.141.117:27017/project";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var add=require('./cate/add');
var remove=require('./cate/remove');
var direct=require('./cate/direct');
var Host='';

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});

/* GET home page. */
router.get('/', function(req, res) {
    var admin_userinfo_name=session.admin_userinfo.username;

    //console.log('host:'+ Host);
    DB.find('cate',{},function(err,data){
        if(err){
            console.log(err);
            return
        }else{
            res.render("admin/cate",{
                msgArr:data,
                host:Host,
                admin_userinfo_name:admin_userinfo_name
            });
        }
    })
});




router.use('/add',add);
router.use('/remove',remove);
router.use('/direct',direct);
module.exports = router;