/**
 * Created by Administrator on 2017/5/26 0026.
 */
/**
 * Created by Administrator on 2017/5/26 0026.
 */

var express = require('express');
var router = express.Router();
var DB=require('../../../model/dbmodle');
var ObjectID = require('mongodb').ObjectID;
var Host='';
var session=require('express-session');
router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});

router.get("/",function(req,res,next) {
    var admin_userinfo_name=session.admin_userinfo.username;
    var id=req.query.aid;
    DB.find("cate",{"_id":new ObjectID(id)},function(err,data) {

        if(err){
            console.log(err);
            return;
        }
        //console.log(data[0]);
        res.render("admin/cate/direct",{
            host:Host,
            msgArr:data,
            admin_userinfo_name:session.admin_userinfo.username
        })

    })

})


router.post("/doDirect",function(req,res,next) {

    console.log(req.body);
    var id=req.body.id;
    var title=req.body.title;
    var description=req.body.description;
    var status=req.body.status;
    var Hid=req.body.hiddenVal;

    DB.updateMany("cate",{"_id":new ObjectID(Hid)},{$set:{"id":id,"title":title,"description":description,"status":status}},function(err,data) {

        if(err) {
            console.log("修改失败");
        }else{

            res.redirect("http://"+req.headers.host+"/admin/cate");

        }

    })

})




module.exports = router;