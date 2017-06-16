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



/*ɾ��*/
router.get('/', function(req, res) {

    var id=req.query._id;
    DB.deleteMany('article',{_id:new DB.ObjectID(id)},function(err,result){
        if(err){
            console.log(err);
            return
        }
        res.redirect(Host+'admin/article')
    })

});




module.exports = router;
