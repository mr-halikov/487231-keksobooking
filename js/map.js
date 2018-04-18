'use strict';

var dummyData = [];

var cards = document.createDocumentFragment();
var pins = document.createDocumentFragment();

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('#address');
var pinsBlock = document.querySelector('.map__pins');
var pinMain = document.querySelector('.map__pin--main');
var filters = document.querySelector('.map__filters-container');

var offerCollate = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var offerTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

function generateDummy() {
  var dummyQuantity = 8;

  var avatarUrl = 'img/avatars/user';
  var userAvatars = generateAvatar(avatarUrl, dummyQuantity);

  var offerPriceMin = 1000;
  var offerPriceMax = 1000000;

  var offerRoomsMin = 1;
  var offerRoomsMax = 5;

  var offerGuestMin = 1;
  var offerGuestMax = 10;

  var offerCheckin = ['12:00', '13:00', '14:00'];
  var offerCheckout = ['12:00', '13:00', '14:00'];

  var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerType = ['place', 'flat', 'house', 'bungalo'];

  var offerPhotos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];


  for (var i = 0; i < dummyQuantity; i++) {
    var item = {'author': {}, 'offer': {}, 'location': {}};

    item.author.avatar = userAvatars[i];
    item.offer.title = getRandomTitle(offerTitle);
    item.offer.price = getRandomRange(offerPriceMin, offerPriceMax);
    item.offer.type = getRandomItem(offerType);
    item.offer.rooms = getRandomRange(offerRoomsMin, offerRoomsMax);
    item.offer.guests = getRandomRange(offerGuestMin, offerGuestMax);
    item.offer.checkin = getRandomItem(offerCheckin);
    item.offer.checkout = getRandomItem(offerCheckout);
    item.offer.features = getRanfomFeatures(offerFeatures);
    item.offer.description = '';
    item.offer.photos = getRanfomPhotos(offerPhotos);
    item.location.x = getRandomRange(300, 900);
    item.location.y = getRandomRange(150, 500);
    item.offer.address = item.location.x + ', ' + item.location.y;

    dummyData.push(item);
  }
}

function generateAvatar(url, quantity) {
  var avatars = [];
  for (var i = 0; i < quantity; i++) {
    var avatar = url + '0' + (i + 1) + '.png';
    avatars.push(avatar);
  }
  avatars = getRanfomPhotos(avatars);
  return avatars;
}

function getRandomTitle(arr) {
  var idx = Math.floor(Math.random() * Math.floor(arr.length));
  var val = arr[idx];
  offerTitle.splice(idx, 1);
  return val;
}

function getRandomRange(min, max) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

function getRandomItem(arr) {
  var idx = Math.floor(Math.random() * Math.floor(arr.length));
  return arr[idx];
}

function getRanfomFeatures(arr) {
  var quantity = getRandomRange(1, arr.length);
  var features = Array.from(arr);
  var remove = features.length - quantity;

  for (var i = 0; i < remove; i++) {
    var j = getRandomRange(0, features.length);
    features.splice(j, 1);
  }
  return features;
}

function getRanfomPhotos(arr) {
  var ctr = arr.length;
  var temp;
  var index;

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

function generateCard(data) {

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

  cardItem.querySelector('.popup__close').addEventListener('click', closePopup);

  generateCardFeatures(data.offer.features, cardItem);
  generateCardPhotos(data.offer.photos, cardItem);

  return cardItem;
}

function generateCardFeatures(features, card) {
  for (var i = 0; i < features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
    card.querySelector('.popup__features').appendChild(feature);
  }
}

function generateCardPhotos(photos, card) {
  for (var j = 0; j < photos.length; j++) {
    var photo;
    if (j === 0) {
      photo = card.querySelector('.popup__photo');
      photo.src = photos[j];
    } else {
      photo = card.querySelector('.popup__photo').cloneNode(true);
      photo.src = photos[j];
    }
    card.querySelector('.popup__photos').appendChild(photo);
  }
}

function generatePin(data, key) {
  var pinTemplate = document.querySelector('#card_template')
      .content
      .querySelector('.map__pin');

  var pinItem = pinTemplate.cloneNode(true);
  var pinItemImg = pinItem.querySelector('img');
  var pinWidth = 50;
  var pinHeight = 70;

  pinItem.style.left = setPinOffset(data.location.x, pinWidth) + 'px';
  pinItem.style.top = setPinOffset(data.location.y, pinHeight) + 'px';
  pinItem.dataset.id = key;
  pinItemImg.src = data.author.avatar;
  pinItemImg.alt = data.offer.title;

  return pinItem;
}

function setPinOffset(pos, dim) {
  return parseInt(pos, 10) - dim / 2;
}

function renderPins() {
  for (var key in dummyData) {
    if (Object.prototype.hasOwnProperty.call(dummyData, key)) {
      pins.appendChild(generatePin(dummyData[key], key));
    }
  }
  pinsBlock.appendChild(pins);
}

function resetPageState() {
  var fadedClass = 'map--faded';
  var disabledFormClass = 'ad-form--disabled';

  var mapFaded = map.classList.contains(fadedClass);
  var adFormDisabled = adForm.classList.contains(disabledFormClass);

  if (!mapFaded) {
    map.classList.add(fadedClass);
  }

  if (!adFormDisabled) {
    adForm.classList.add(disabledFormClass);
  }

  for (var i = 0; i < adFormFieldsets.length; i++) {
    var fieldset = adFormFieldsets[i];
    var fieldsetDisabled = fieldset.hasAttribute('disabled');

    if (!fieldsetDisabled) {
      fieldset.setAttribute('disabled', 'disabled');
    }
  }
}

function setActiveState() {

  var fadedClass = 'map--faded';
  var disabledFromClass = 'ad-form--disabled';

  map.classList.remove(fadedClass);
  adForm.classList.remove(disabledFromClass);

  for (var i = 0; i < adFormFieldsets.length; i++) {
    var fieldset = adFormFieldsets[i];
    fieldset.removeAttribute('disabled');
  }

  setAddress();
  renderPins();
  activatePins();
}

function getMainPinAddress() {

  var mapIsActive = getMapState();

  var cssPinX = window.getComputedStyle(pinMain, null).getPropertyValue('left');
  var cssPinY = window.getComputedStyle(pinMain, null).getPropertyValue('top');

  var pinX = cssPropToNumber(cssPinX);
  var pinY = cssPropToNumber(cssPinY);

  var markWidth = 65;
  var markHeight = 65;
  var pinHeight = 22;

  var offsetX;
  var offsetY;

  var addressX;
  var addressY;

  if (mapIsActive) {
    offsetX = markWidth / 2;
    offsetY = markHeight / 2;
  } else {
    offsetX = markWidth / 2;
    offsetY = markHeight + pinHeight;
  }

  addressX = pinX + offsetX;
  addressY = pinY + offsetY;
  return addressX + ', ' + addressY;
}

function getMapState() {
  return map.classList.contains('map--faded');
}

function cssPropToNumber(string) {
  var indexOfPx = string.indexOf('px');

  if (indexOfPx !== -1) {
    string = string.slice(0, indexOfPx);
    string = parseInt(string, 10);
  } else {
    string = parseInt(string, 10);
    string = Math.round(string);
  }

  return string;
}

function setInitialAddress() {
  var address = getMainPinAddress();

  adFormAddress.value = address;
}

function setAddress() {
  var address = getMainPinAddress();
  adFormAddress.value = address;
}

function activatePins() {
  var userPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  userPins.forEach(function (pin) {
    pin.addEventListener('click', pinClick);
  });
}

function pinClick(evt) {
  var source = evt.currentTarget;
  var id = source.dataset.id;

  showPopup(id);
}

function showPopup(id) {
  var data = dummyData[id];
  var openCards = map.querySelectorAll('.map__card.popup');

  if (openCards.length !== 0) {
    for (var i = 0; i < openCards.length; i++) {
      map.removeChild(openCards[i]);
    }
  }

  cards.appendChild(generateCard(data));
  map.insertBefore(cards, filters);
}

function closePopup(evt) {
  evt.preventDefault();
  var source = evt.currentTarget;
  var popup = findAncestor(source, 'popup');

  source.removeEventListener('click', closePopup);
  map.removeChild(popup);
}

function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {
    el = el;
  }
  return el;
}

resetPageState();
setInitialAddress();
generateDummy();

pinMain.addEventListener('mouseup', setActiveState);
