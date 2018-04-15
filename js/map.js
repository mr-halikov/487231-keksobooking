'use strict';

var dummyData = [];

var cards = document.createDocumentFragment(),
    pins  = document.createDocumentFragment();

var mapBlock  = document.querySelector('.map'),
    pinsBlock = document.querySelector('.map__pins'),
    filters = document.querySelector('.map__filters-container');

var offerCollate = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
};

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

    var offer_guest_min = 1;
    var offer_guest_max = 10;

    var offer_checkin  = ['12:00', '13:00', '14:00'];
    var offer_checkout = ['12:00', '13:00', '14:00'];

    var offer_features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
    var offer_type = [ 'palace', 'flat', 'house', 'bungalo'];

    var offer_photos = [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];

    var location;

    for (var i = 0; i < dummy_quantity; i++) {

        var item = {'author':{}, 'offer': {}, 'location': {}};

        item['author']['avatar']  = 'img/avatars/user0' + (i + 1) + '.png';

        item['offer']['title']    = getRandomTitle(offer_title);
        item['offer']['price']    = getRandomRange(offer_price_min, offer_price_max);
        item['offer']['type']     = getRandomItem(offer_type);
        item['offer']['rooms']    = getRandomRange(offer_rooms_min, offer_rooms_max);
        item['offer']['guests']   = getRandomRange(offer_guest_min, offer_guest_max);
        item['offer']['checkin']  = getRandomItem(offer_checkin);
        item['offer']['checkout'] = getRandomItem(offer_checkout);
        item['offer']['features'] = getRanfomFeatures(offer_features);
        item['offer']['description'] = '';
        item['offer']['photos']   = getRanfomPhotos(offer_photos);

        item['location']['x']     = getRandomRange(300, 900);
        item['location']['y']     = getRandomRange(150, 500);

        item['offer']['address']  = item['location']['x'] + ', ' + item['location']['y'];


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

        function getRanfomFeatures(arr) {
            var quantity = getRandomRange(1, arr.length);
            var features = Array.from(arr);
            var remove = features.length - quantity;

            for (var i = 0; i < remove; i++) {
                var j = getRandomRange(0, features.length);
                features.splice(j, 1);
            }

            return features;
        };

        function getRanfomPhotos(arr) {
            var ctr = arr.length, temp, index;

            while (ctr > 0) {
                index = Math.floor(Math.random() * ctr);
                ctr--;
                temp = arr[ctr];
                arr[ctr] = arr[index];
                arr[index] = temp;
            }
            return arr;
        };

        dummyData.push(item);
    }
};

var renderCards = function(data) {

    var cardTemplate = document.querySelector('#card_template')
        .content
        .querySelector('.map__card');

    var cardItem = cardTemplate.cloneNode(true);

    cardItem.querySelector('.popup__avatar').src = data.author.avatar;
    cardItem.querySelector('.popup__avatar').alt = data.offer.title;
    cardItem.querySelector('.popup__title').textContent = data.offer.title;
    cardItem.querySelector('.popup__text--address').textContent = data.offer.address;
    cardItem.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
    cardItem.querySelector('.popup__type').textContent = offerCollate[data.offer.type];
    cardItem.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardItem.querySelector('.popup__description').textContent = data.offer.description;

    for (var i = 0; i < data.offer.features.length; i++) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature', 'popup__feature--' + data.offer.features[i]);
        cardItem.querySelector('.popup__features').appendChild(feature);
    }

    for (var i = 0; i < data.offer.photos.length; i++) {
        var photo;
        if (i === 0 ) {
            photo = cardItem.querySelector('.popup__photo');
            photo.src = data.offer.photos[i];
        } else {
            photo = cardItem.querySelector('.popup__photo').cloneNode(true);
            photo.src = data.offer.photos[i];
        }
        cardItem.querySelector('.popup__photos').appendChild(photo);
    }
    return cardItem;
};

var renderPins = function(data) {
    var pinTemplate = document.querySelector('#card_template')
        .content
        .querySelector('.map__pin');

    var pinItem = pinTemplate.cloneNode(true);

    var pinWidth = 50;
    var pinHeight = 70;

    var shiftPin = function(pos, dim) {
        return parseInt(pos) - dim / 2;
    }

    pinItem.style.left = shiftPin(data.location.x, pinWidth) + 'px';
    pinItem.style.top = shiftPin(data.location.y, pinHeight) + 'px';
    pinItem.src = data.author.avatar;
    pinItem.alt = data.offer.title;

    return pinItem;
};


generateDummy();

cards.appendChild(renderCards(dummyData[0]));

for (var key in dummyData) {
    pins.appendChild(renderPins(dummyData[key]));
};

mapBlock.insertBefore(cards, filters);
pinsBlock.appendChild(pins);
