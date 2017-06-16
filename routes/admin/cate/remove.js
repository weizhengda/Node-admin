/**
 * Created by Administrator on 2017/5/26 0026.
 */



var express = require('express');
var router = express.Router();
var DB=require('../../../model/dbmodle');
var session=require('express-session');
var ObjectID = require('mongodb').ObjectID;

var Host='';

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});


router.get("/",function(req,res,next) {

    var id=req.query.aid;
    var cid=req.query.cid;

    DB.find("article",{"cid":cid},function(err,data) {

        console.log(data);
        if(data.length>0) {

            res.redirect(Host+"admin/cate");

        }else{

            DB.deleteMany("cate",{"_id":new ObjectID(id)},function(err,data) {

                if(err) {
                    console.log("删除数据失败");
                    return;
                }
                res.redirect(Host+"admin/cate");
            })

        }

    })

})


module.exports = router;