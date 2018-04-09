'use strict';

var dummyData = [];
var fragment = document.createDocumentFragment();

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

    var location;

    for (var i = 0; i < dummy_quantity; i++) {

        var item = {'author':{}, 'offer': {}, 'location': {}};

        item['author']['avatar']  = 'img/avatars/user0' + (i + 1) + '.png';

        item['offer']['title']    = getRandomTitle(offer_title);
        item['offer']['price']    = getRandomRange(offer_price_min, offer_price_max);
        item['offer']['type']     = getRandomItem(offer_type);
        item['offer']['rooms']    = getRandomRange(offer_rooms_min, offer_rooms_max);
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

var renderPins = function(data) {

    var pinItemTemplate = document.querySelector('#map-pin')
        .content
        .querySelector('.map__card');

    var pinItem = pinItemTemplate.cloneNode(true);

    pinItem.querySelector('.popup__avatar').src = data.author.avatar;
    pinItem.querySelector('.popup__avatar').alt = data.offer.title;
    pinItem.querySelector('.popup__title').textContent = data.offer.title;
    pinItem.querySelector('.popup__text--address').textContent = data.offer.address;
    pinItem.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
    pinItem.querySelector('.popup__type').textContent = data.offer.type;

// <article class="map__card popup">
//   <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
//   <button type="button" class="popup__close">Закрыть</button>
//   <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
//   <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
//   <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
//   <h4 class="popup__type">Квартира</h4>
//   <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
//   <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
//   <ul class="popup__features">
//     <li class="popup__feature popup__feature--wifi"></li>
//     <li class="popup__feature popup__feature--dishwasher"></li>
//     <li class="popup__feature popup__feature--parking"></li>
//     <li class="popup__feature popup__feature--washer"></li>
//     <li class="popup__feature popup__feature--elevator"></li>
//     <li class="popup__feature popup__feature--conditioner"></li>
//   </ul>
//   <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
//   <div class="popup__photos">
//     <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
//   </div>
// </article>
    return pinItem;
};

generateDummy();

for (var i = 0; i < dummyData.length; i++) {
    fragment.appendChild(renderPins(dummyData[i]))
}

document.querySelector('.map__pins').appendChild(fragment);
