var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopping');

var products = [
    new Product({
        imagePath: 'https://www.gizbot.com/img/2014/01/24-save.jpeg',
        title: 'samsung mobile',
        description: 'A7',
        price: '150'
    }),

    new Product({
        imagePath: 'http://cdn.extrastores.com/ImagesSections/product/191/9967051_L_1.jpg',
        title: 'Iphone mobile',
        description: 'Iphone6',
        price: '250'
    }),

    new Product({
        imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSogTLv2dmnqEHZ1ExubjyqSOUB342s_WGkITMWlRCvnKV9NMA4',
        title: 'htc mobile',
        description: 'htc',
        price: '170'
    }),

    new Product({
        imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPgoAkymWYPJNpyX3pmnJXM33UorpAKLiy0iXnM8X6qLyqXTXagg',
        title: 'Iphone mobile',
        description: 'Iphone7',
        price: '300'
    }),

    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/884437b8-f77c-433a-8857-315c74af205e_1.b12fef87867da1053b301dfd302e42bc.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        title: 'samsung mobile',
        description: 'j5',
        price: '200'
    })
];

for(var i = 0; i < products.length ; i++){
    products[i].save(function (err) {
        if(err){
            console.log(err)
        }else{
            console.log('products is added')
        }
    });
}
