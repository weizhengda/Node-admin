/**
 * Created by Administrator on 2017/5/27 0027.
 */
/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var DB=require('../../../model/dbmodle');
/*var md5 = require('md5-node');

var session=require('express-session');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));*/



var Host=''

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});



router.get('/', function(req, res) {
    res.json({'advice':'好好好'})

});

router.post('/adVice',function(req,res){

    var phone = req.body.phone;
    var matter = req.body.matter;
    var adviceObj = {
        phone,
        matter
    }

    DB.insertOne('advice',adviceObj,function(err,result){
        if(err){
            console.log(err);
            return;
        }



    })
})



module.exports = router;