var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');


/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function (err, docs) {
      if(err){
        console.log(err)
      }
      var user = req.session.user;
      res.render('shop/index', { title: 'Shopping-Cart', products: docs, user: user});

    });

});

router.get('/add-to-cart/:id', function (req, res, next) {
    var ProductId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(ProductId, function (err, product) {
        if(err){
            console.log(err);
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});

router.get('/reduce/:id', function (req, res, next) {
    var ProductId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduce(ProductId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');

});

router.get('/remove/:id', function (req, res, next) {
    var ProductId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(ProductId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function (req, res, next) {
    if(!req.session.cart){
        return res.render('shop/shopping-cart', {products: null});
    }
    var user = req.session.user;
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, totalqty:req.session.cart.totalQty, user:user});
});

router.get('/checkout', function (req, res, next) {
    req.session.OldUrl = req.url;
    var user = req.session.user;
    if(req.session.user){
        if(!req.session.cart){
            return res.render('shop/shopping-cart', {products: null});
        }
        var cart = new Cart(req.session.cart);
        res.render('shop/checkout', {total: cart.totalPrice, user:user});
    }else{
        res.redirect('/user/signin');
    }

});

router.post('/checkout', function (req, res, next) {
    console.log(req.session.user);
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.session.user,
        cart: cart
    });
    order.save(function (err, result) {
        if(err){
            console .log(err);
        }else{
            console.log(req.session.user);
            console.log('order is added');
        }
    });
    req.session.OldUrl = null;
    res.redirect('/shopping-cart');
});

module.exports = router;
