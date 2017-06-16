/**
 * Created by Administrator on 2017/5/27 0027.
 */
/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
/*var bodyParser = require('body-parser');
var md5 = require('md5-node');
var DB=require('../../model/dbmodle');
var session=require('express-session');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));*/



var Host=''

router.use('/', function(req, res, next) {
    Host='http://'+req.headers.host+'/';
    //console.log(Host)
    next()
});



router.post('/', function(req, res) {
    // var username=req.body.parse

    // DB.find('article',{},{'page':page,'pageSize':pageSize},function(err,data){

    //     if(err){
    //         console.log(err);
    //         return
    //     }else{
    //         res.json(data)
    //     }
    // })

    res.send('1111')

});





module.exports = router;