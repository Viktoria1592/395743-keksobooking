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

var realEstateOffers = [];

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

for (var i = 0; i < 8; i++) {
  realEstateOffers.push({
    'author': {
      'avatar': 'img/avatars/user/0' + (i + 1) + '.png'
    },
    'offer': {
      'title': offerTitles[i],
      'address': location.x,
      'price': randomInteger(MIN_PRICE, MAX_PRICE),
      'type': offerTypes,
      'rooms': randomInteger(MIN_ROOMS, MAX_ROOMS),
      'guests': randomInteger(MIN_GUESTS, MAX_GUESTS),
      'checkin': checkinCheckoutInteger(),
      'checkout': checkinCheckoutInteger(),
      'features': offerFeatures.slice(randomInteger(1, offerFeatures.length)),
      'description': '',
      'photos': offerPhotos.sort(compareRandom)
    },
    'location': {
      'x': randomInteger(LOCATION_X_MIN, LOCATION_X_MAX),
      'Y': randomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  });
}

// console.log(realEstateOffers);

var mapModal = document.querySelector('.map');
mapModal.classList.remove('map--faded');


