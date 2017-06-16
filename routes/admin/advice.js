/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5-node');
var DB=require('../../model/dbmodle');
var session=require('express-session');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var add=require('./users/add');


var Host=''

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});


router.get('/', function(req,res) {
    var admin_userinfo_name=session.admin_userinfo.username;

    DB.find('advice',{},function(err,data){

        if(err){
            console.log(err)
        }else{
             //console.log(data)
            res.render('admin/advice',{
                host:Host,
                'admin_userinfo_name':admin_userinfo_name,
                "advicelist":data
            })

        }


    })

});

//router.use('/add',add);








module.exports = router;