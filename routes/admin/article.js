/**
 * Created by Administrator on 2017/5/25 0025.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5-node');
var DB = require('../../model/dbmodle');
var session = require('express-session');
var async = require('async');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var add = require('./article/add');
var edit = require('./article/edit');
var remove = require('./article/remove');
var Host = '';

router.use('/', function(req, res, next) {
    Host = 'http://' + req.headers.host + '/';
    //console.log(Host)
    next()
});

router.use('/add', add);
router.use('/edit', edit);
router.use('/remove', remove);


router.get('/', function(req, res) {
    console.log('后台主页的' + session.admin_userinfo);
    var admin_userinfo_name = session.admin_userinfo.username;

    async.parallel({
            articlelist: function(callback) {
                DB.find('article', {}, function(err, data) {

                    if(err) {

                        console.log(err);
                        return;
                    }
                    console.log(data);
                    callback(err, data)
                })
            },
            cate: function(callback) {
                DB.find('cate', {}, function(err, data) {

                    if(err) {

                        console.log(err);
                        return;
                    }

                    callback(err, data);
                })
            }
        },
        function(err, data) {
            res.render('admin/article', {
                host: Host,
                'admin_userinfo_name': (admin_userinfo_name),
                'articlelist': data.articlelist,
                'cate': data.cate
            })
        }
    )
})

module.exports = router;