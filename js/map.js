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


var setFeatures = function (featuresArray) {
  var templateFeature = document.createElement('li');
  templateFeature.classList.add('feature');
  var offerFeaturesFragment = document.createDocumentFragment();

  for (var i = 0; i < featuresArray.length; i++) {
    var featureItem = templateFeature.cloneNode();
    featureItem.classList.add('feature--' + featuresArray[i]);
    offerFeaturesFragment.appendChild(featureItem);
  }

  return offerFeaturesFragment;
};


var setPhotos = function (photosArray) {
  var templatePhoto = document.createElement('img');
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photosArray.length; i++) {
    var templatePhotoCopy = templatePhoto.cloneNode();
    templatePhotoCopy.src = photosArray[i];
    templatePhotoCopy.style.width = '65px';
    templatePhotoCopy.style.height = '65px';
    photosFragment.appendChild(templatePhotoCopy);
  }
  return photosFragment;
};


var realEstateOffers = [];

var getArrayRealEstate = function () {
  for (var i = 0; i < REAL_ESTATE_OFFERS_LENGTH; i++) {
    var locationCoordsX = getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationCoordsY = getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var offerFeaturesRandom = offerFeatures.slice(getRandomInteger(0, offerFeatures.length));
    realEstateOffers.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': offerTitles[i],
        'address': locationCoordsX + ', ' + locationCoordsY,
        'price': getRandomInteger(MIN_PRICE, MAX_PRICE),
        'type': offerTypes[getRandomInteger(0, offerTypes.length - 1)],
        'rooms': getRandomInteger(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomInteger(MIN_GUESTS, MAX_GUESTS),
        'checkin': getCheckinCheckoutInteger(),
        'checkout': getCheckinCheckoutInteger(),
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
};

getArrayRealEstate();


var getPinsOnMap = function () {
  var pinsOnMap = document.querySelector('.map__pins');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
  for (var i = 0; i < REAL_ESTATE_OFFERS_LENGTH; i++) {
    var pinsElement = pinsTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    pinsElement.setAttribute('style', 'left: ' + (realEstateOffers[i].location.x + PINS_WIDTH / 2) +
      'px; top: ' + (realEstateOffers[i].location.y + PINS_HEIGHT) + 'px');
    pinsElement.querySelector('img').setAttribute('src', realEstateOffers[i].author.avatar);
    fragment.appendChild(pinsElement);
    pinsOnMap.appendChild(fragment);
  }
  return pinsOnMap;
};

getPinsOnMap();


var getOfferCard = function () {
  var map = document.querySelector('.map');
  var cardFragment = document.createDocumentFragment();
  var adBlockTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var adBlockElements = adBlockTemplate.cloneNode(true);

  adBlockElements.querySelector('h3').textContent = realEstateOffers[0].offer.title;
  adBlockElements.querySelector('.popup__address small').textContent = realEstateOffers[0].offer.address;
  adBlockElements.querySelector('.popup__price').textContent = realEstateOffers[0].offer.price + ' ₽/ночь';
  adBlockElements.querySelector('h4').textContent = setAppartType(realEstateOffers[0].offer.type);
  adBlockElements.querySelector('.popup__rooms-and-guests').textContent = realEstateOffers[0].offer.rooms +
    ' комнаты для ' + realEstateOffers[0].offer.guests + ' гостей';
  adBlockElements.querySelector('.popup__check').textContent = 'Заезд после ' + realEstateOffers[0].offer.checkin +
    ', выезд до ' + realEstateOffers[0].offer.checkout;
  adBlockElements.querySelector('.popup__features').textContent = '';
  adBlockElements.querySelector('.popup__features').appendChild(setFeatures(realEstateOffers[0].offer.features));
  adBlockElements.querySelector('.popup__description').textContent = realEstateOffers[0].offer.description;
  adBlockElements.querySelector('.popup__pictures').textContent = '';
  adBlockElements.querySelector('.popup__pictures').appendChild(setPhotos(realEstateOffers[0].offer.photos));
  adBlockElements.querySelector('.popup__avatar').src = realEstateOffers[0].author.avatar;

  var insertContainer = document.querySelector('.map__filters-container');
  cardFragment.appendChild(adBlockElements);
  map.insertBefore(cardFragment, insertContainer);

  return map;
};

getOfferCard();


var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');
