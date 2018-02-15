'use strict';

(function () {
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
    'dishwasher',
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

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var getCheckinCheckoutInteger = function () {
    return offerCheckTimes[getRandomInteger(0, offerCheckTimes.length - 1)];
  };

  window.realEstateOffers = [];
  var getArrayRealEstate = function () {
    for (var i = 0; i < REAL_ESTATE_OFFERS_LENGTH; i++) {
      var locationCoordsX = getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX);
      var locationCoordsY = getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
      var offerFeaturesRandom = offerFeatures.slice(getRandomInteger(0, offerFeatures.length));
      window.realEstateOffers.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: offerTitles[i],
          address: locationCoordsX + ', ' + locationCoordsY,
          price: getRandomInteger(MIN_PRICE, MAX_PRICE),
          type: offerTypes[getRandomInteger(0, offerTypes.length - 1)],
          rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
          guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
          checkin: getCheckinCheckoutInteger(),
          checkout: getCheckinCheckoutInteger(),
          features: offerFeaturesRandom,
          description: '',
          photos: offerPhotos.sort(compareRandom)
        },
        location: {
          'x': locationCoordsX,
          'y': locationCoordsY
        }
      });
    }
  };

  getArrayRealEstate();
})();
