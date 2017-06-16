/**
 * Created by Administrator on 2017/5/27 0027.
 */
var express = require('express');
var router = express.Router();

var Host=''

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    next()
});

var DB=require('../../../model/dbmodle');




router.get('/', function(req, res) {

    var id=req.query._id;
    DB.deleteMany('users',{_id:new DB.ObjectID(id)},function(err,result){
        if(err){
            console.log(err);
            return
        }
        res.redirect(Host+'admin/users')
    })

});




module.exports = router;
