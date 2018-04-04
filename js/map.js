'use strict';

var dummyData = [];

var generateDummy = function() {
    var dummy_quantity = 8;
    var offer_title = [
        'Большая уютная квартира',
        'Маленькая неуютная квартира',
        'Огромный прекрасный дворец',
        'Маленький ужасный дворец',
        'Красивый гостевой домик',
        'Некрасивый негостеприимный домик',
        'Уютное бунгало далеко от моря',
        'Неуютное бунгало по колено в воде'
    ];

    var offer_price_min = 1000;
    var offer_price_max = 1000000;

    var offer_rooms_min = 1;
    var offer_rooms_max = 5;

    var offer_checkin  = ['12:00', '13:00', '14:00'];
    var offer_checkout = ['12:00', '13:00', '14:00'];

    var offer_features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
    var offer_type = [ 'palace', 'flat', 'house', 'bungalo'];

    var offer_photos = [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];

    var location

    for (var i = 0; i < dummy_quantity; i++) {

        var item = {'author':{}, 'offer': {}};

        item['author']['avatar']  = 'img/avatars/user0' + (i + 1) + '.png';

        item['offer']['title']    = getRandomTitle(offer_title);
        item['offer']['address']  = '';
        item['offer']['price']    = getRandomRange(offer_price_min, offer_price_max);
        item['offer']['type']     = getRandomItem(offer_type);
        item['offer']['rooms']    = getRandomRange(offer_rooms_min, offer_rooms_max);
        item['offer']['checkin']  = getRandomItem(offer_checkin);
        item['offer']['checkout'] = getRandomItem(offer_checkout);
        item['offer']['features'] = '';
        item['offer']['description'] = '';
        item['offer']['photos'] = [];


        function getRandomTitle(arr) {
            var idx = Math.floor(Math.random() * Math.floor(arr.length));
            var val = arr[idx];
            offer_title.splice(idx, 1);
            return val;
        };

        function getRandomRange(min, max) {
            return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
        };

        function getRandomItem(arr) {
            var idx = Math.floor(Math.random() * Math.floor(arr.length));
            return arr[idx];
        };




        dummyData.push(item);
    }

    console.log(dummyData)
};

generateDummy();
