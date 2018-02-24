var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var User = require('../models/user');
var Order = require('../models/order');
var Cart = require('../models/cart');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', function (req, res, next) {
    res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/signup', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.save(function (err) {
        if(err){
            console.log(err);
        }else{
            console.log('user added');
        }
    });
    req.session.user = newUser;
    if(req.session.OldUrl){
        res.redirect(req.session.OldUrl);
    }else {
        res.redirect('/user/profile');
    }
});

router.get('/signin', function (req, res, next) {
    res.render('user/signin', {csrfToken: req.csrfToken()});
});

router.post('/signin', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email, password:password}, function (err, user) {
        if(err) {
            console.log('nooooo');
        }
        if(!user){
            var message = "the email or user is incorrect or you donot sign up, please try again!";
            res.render('user/signin', {message: message});
        }else{
            console.log('user is existed');
            req.session.user = user;
            if(req.session.OldUrl){
                res.redirect(req.session.OldUrl);
            }else {
                res.redirect('/user/profile');
            }
        }
    });
});

router.get('/profile', function (req, res, next) {
    if(req.session.user){
        var user = req.session.user;
        Order.find({user: req.session.user}, function (err, result) {
            if(err){
                console.log(err);
            }
            var elem =[];
            for(var i=0; i<result.length; i++){
            var cart = new Cart(result[i].cart);
            elem.push(cart.generateArray());

            }
            console.log(result);
            res.render('user/profile', {user: user, order: result, cart:elem[0]});
        });

    }else{
        res.redirect('/');
    }
});

router.get('/logout', function (req, res, next) {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;
