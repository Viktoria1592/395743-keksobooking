'use strict';

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 2;
var MAX_GUESTS = 15;
var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 150;
var LOCATION_Y_MAX = 500;
var REAL_ESTATE_OFFERS_LENGTH = 8;
var PINS_WIDTH = 40;
var PINS_HEIGHT = 44;

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира,',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerTypes = [
  'flat',
  'house',
  'bungalo'
];

var offerCheckTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var offerFeatures = [
  'wifi',
  'dishwater',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var compareRandom = function () {
  return Math.random() - 0.5;
};

var checkinCheckoutInteger = function () {
  return offerCheckTimes[randomInteger(0, offerCheckTimes.length - 1)];
};

var setAppartType = function (objType) {
  var appartType;
  if (objType === 'flat') {
    appartType = 'Квартира';
  }
  if (objType === 'bungalo') {
    appartType = 'Бунгало';
  }
  if (objType === 'house') {
    appartType = 'Дом';
  }
  return appartType;
};

var realEstateOffers = [];

for (var i = 0; i < REAL_ESTATE_OFFERS_LENGTH; i++) {
  var locationCoordsX = randomInteger(LOCATION_X_MIN, LOCATION_X_MAX);
  var locationCoordsY = randomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
  var offerFeaturesRandom = offerFeatures.slice(randomInteger(1, offerFeatures.length));
  realEstateOffers.push({
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'title': offerTitles[i],
      'address': locationCoordsX + ', ' + locationCoordsY,
      'price': randomInteger(MIN_PRICE, MAX_PRICE),
      'type': offerTypes[randomInteger(0, offerTypes.length - 1)],
      'rooms': randomInteger(MIN_ROOMS, MAX_ROOMS),
      'guests': randomInteger(MIN_GUESTS, MAX_GUESTS),
      'checkin': checkinCheckoutInteger(),
      'checkout': checkinCheckoutInteger(),
      'features': offerFeaturesRandom,
      'description': '',
      'photos': offerPhotos.sort(compareRandom)
    },
    'location': {
      'x': locationCoordsX,
      'y': locationCoordsY
    }
  });
}

var template = document.querySelector('template');

var pinsOnMap = document.querySelector('.map__pins');
var pinsTemplate = template.content.querySelector('.map__pin');

for (i = 0; i < REAL_ESTATE_OFFERS_LENGTH; i++) {
  var pinsElement = pinsTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  pinsElement.setAttribute('style', 'left: ' + (realEstateOffers[i].location.x + PINS_WIDTH / 2) +
    'px; top: ' + (realEstateOffers[i].location.y + PINS_HEIGHT) + 'px');
  pinsElement.querySelector('img').setAttribute('src', realEstateOffers[i].author.avatar);


  fragment.appendChild(pinsElement);
  pinsOnMap.appendChild(fragment);

}

var getOfferCard = function () {
  var map = document.querySelector('.map');
  var cardFragment = document.createDocumentFragment();
  var adBlockTemplate = template.content.querySelector('article.map__card');
  var adBlockElements = adBlockTemplate.cloneNode(true);

  adBlockElements.querySelector('h3').textContent = realEstateOffers[0].offer.title;
  adBlockElements.querySelector('.popup__address small').textContent = realEstateOffers[0].offer.address;
  adBlockElements.querySelector('.popup__price').textContent = realEstateOffers[0].offer.price + ' ₽/ночь';
  adBlockElements.querySelector('h4').textContent = setAppartType(realEstateOffers[0].offer.type);
  adBlockElements.querySelector('.popup__rooms-and-guests').textContent = realEstateOffers[0].offer.rooms +
    ' комнаты для ' + realEstateOffers[0].offer.guests + ' гостей';
  adBlockElements.querySelector('.popup__check').textContent = 'Заезд после ' + realEstateOffers[0].offer.checkin +
    ', выезд до ' + realEstateOffers[0].offer.checkout;
  // adBlockElements.querySelector('.popup__features').appendChild();
  adBlockElements.querySelector('.popup__description').textContent = realEstateOffers[0].offer.description;
  // adBlockElements.querySelector('.popup__pictures').appendChild();
  adBlockElements.querySelector('.popup__avatar').src = realEstateOffers[0].author.avatar;

  var insertContainer = document.querySelector('.map__filters-container');
  cardFragment.appendChild(adBlockElements);
  map.insertBefore(cardFragment, insertContainer);

  return map;
};

getOfferCard();


var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');
