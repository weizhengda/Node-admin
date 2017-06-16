/**
 * Created by Administrator on 2017/5/26 0026.
 */
var sd = require('silly-datetime');
var session=require('express-session');
var express = require('express');
var router = express.Router();

var DB=require('../../../model/dbmodle');

var Host='';

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});

router.get('/', function(req, res) {
    var admin_userinfo_name=session.admin_userinfo.username;
    //console.log('host:'+ Host);

    res.render("admin/cate/add",{
        host:Host,
        admin_userinfo_name:admin_userinfo_name
    });

});


router.post("/doAdd",function(req,res,next) {

    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(req.body);
    var id=req.body.id;
    var title=req.body.title;
    var description=req.body.description;
    var status=req.body.status;

    DB.insertOne("cate",{"id":id,"title":title,"description":description,"status":status,"addtime":time},function(err,data) {

        if(err) {
            console.log("插入数据失败");
        }else{

            res.redirect("http://"+req.headers.host+"/admin/cate");

        }

    })

})

module.exports = router;