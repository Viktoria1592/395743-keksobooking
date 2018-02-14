'use strict';

// МОДУЛЬ 3 ЗАДАЧА 1

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
var PINS_SHARP_HEIGHT = 22;
var MAIN_PIN_CENTER_X = 600;
var MAIN_PIN_CENTER_Y = 352;
var ENTER_KEYCODE = 13;

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

var pinsOnMap = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
var getPinsOnMap = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < REAL_ESTATE_OFFERS_LENGTH; i++) {
    var pinsElement = pinsTemplate.cloneNode(true);
    pinsElement.setAttribute('style', 'left: ' + (realEstateOffers[i].location.x + PINS_WIDTH / 2) +
      'px; top: ' + (realEstateOffers[i].location.y + PINS_HEIGHT) + 'px');
    pinsElement.querySelector('img').setAttribute('src', realEstateOffers[i].author.avatar);
    fragment.appendChild(pinsElement);
  }
  pinsOnMap.appendChild(fragment);
  return pinsOnMap;
};

var renderOfferCard = function (i) {
  var map = document.querySelector('.map');
  var cardFragment = document.createDocumentFragment();
  var adBlockTemplate = document.querySelector('template').content.querySelector('article.map__card');
  window.adBlockElementGlobal = adBlockTemplate.cloneNode(true);
  var adBlockElement = window.adBlockElementGlobal = adBlockTemplate.cloneNode(true);
  adBlockElement.querySelector('h3').textContent = realEstateOffers[i].offer.title;
  adBlockElement.querySelector('.popup__address small').textContent = realEstateOffers[i].offer.address;
  adBlockElement.querySelector('.popup__price').textContent = realEstateOffers[i].offer.price + ' ₽/ночь';
  adBlockElement.querySelector('h4').textContent = setAppartType(realEstateOffers[i].offer.type);
  adBlockElement.querySelector('.popup__rooms-and-guests').textContent = realEstateOffers[i].offer.rooms +
    ' комнаты для ' + realEstateOffers[i].offer.guests + ' гостей';
  adBlockElement.querySelector('.popup__check').textContent = 'Заезд после ' + realEstateOffers[i].offer.checkin +
    ', выезд до ' + realEstateOffers[i].offer.checkout;
  adBlockElement.querySelector('.popup__features').textContent = '';
  adBlockElement.querySelector('.popup__features').appendChild(setFeatures(realEstateOffers[i].offer.features));
  adBlockElement.querySelector('.popup__description').textContent = realEstateOffers[i].offer.description;
  adBlockElement.querySelector('.popup__pictures').textContent = '';
  adBlockElement.querySelector('.popup__pictures').appendChild(setPhotos(realEstateOffers[i].offer.photos));
  adBlockElement.querySelector('.popup__avatar').src = realEstateOffers[i].author.avatar;
  var insertContainer = document.querySelector('.map__filters-container');
  cardFragment.appendChild(adBlockElement);
  map.insertBefore(cardFragment, insertContainer);
  return map;
};

// МОДУЛЬ 4 ЗАДАЧА 1;

// глобальные переменные

var inputAddress = document.querySelector('input#address');
inputAddress.value = MAIN_PIN_CENTER_X + ', ' + MAIN_PIN_CENTER_Y;
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var fieldList = document.querySelectorAll('fieldset');

// функция переключения активации / деактивации
var toggleFormAviability = function (isFormMustDisabled) {
  for (var i = 0; i < fieldList.length; i++) {
    fieldList[i].disabled = isFormMustDisabled;
  }
};
toggleFormAviability(true);

// функция активации карты и отрисовки похожих объявлений
var activateMap = function () {
  toggleFormAviability(false);
  var noticeForm = document.querySelector('.notice__form');
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  getPinsOnMap();
  inputAddress.value = MAIN_PIN_CENTER_X + ', ' + parseInt(MAIN_PIN_CENTER_Y + PINS_HEIGHT / 2 + PINS_SHARP_HEIGHT, 10);
  mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
  mainPin.removeEventListener('keyup', mainPinKeyupHandler);
};

// обработчики нажатия на main__pin
var mainPinMouseupHandler = function () {
  activateMap();
};
mainPin.addEventListener('mouseup', mainPinMouseupHandler);

var mainPinKeyupHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
};
mainPin.addEventListener('keyup', mainPinKeyupHandler);

// получение индекса элемента
function getElementIndex(node) {
  var index = 0;
  while ((node = node.previousElementSibling)) {
    index++;
  }
  return index;
}

// делегирование и рендер карточек
var mapCardsClickHandler = function (evt) {
  var overlay = document.querySelector('.map__pinsoverlay');
  if (overlay) {
    pinsOnMap.removeChild(overlay);
  }
  var target = evt.target;
  var button = target.closest('.map__pin--user');
  var index;
  if (!button) {
    return;
  }
  index = getElementIndex(button) - 1;
  renderOfferCard(index);
  map.replaceChild(window.adBlockElementGlobal, window.adBlockElementGlobal.previousSibling);
};
map.addEventListener('click', mapCardsClickHandler);

// МОДУЛЬ 4 ЗАДАЧА 2

// функция выставления минимальной цены в поле #price в зависимости от изменения значения поля #type
var typeSelect = document.querySelector('#type');
var priceInput = document.querySelector('#price');

var typeSelectInputHandler = function (evt) {
  var target = evt.target;
  switch (target.value) {
    case 'flat':
      priceInput.setAttribute('min', '1000');
      break;
    case 'bungalo':
      priceInput.setAttribute('min', '0');
      break;
    case 'house':
      priceInput.setAttribute('min', '5000');
      break;
    case 'palace':
      priceInput.setAttribute('min', '10000');
      break;
  }
};
typeSelect.addEventListener('input', typeSelectInputHandler);

// синхронизация select'ов времени заезда и выезда
var timeinSelect = document.querySelector('#timein');
var timeoutSelect = document.querySelector('#timeout');

var timeSelectInputHandler = function (evt) {
  var target = evt.target;
  switch (target.value) {
    case '12:00':
      timeinSelect.selectedIndex = 0;
      timeoutSelect.selectedIndex = 0;
      break;
    case '13:00':
      timeinSelect.selectedIndex = 1;
      timeoutSelect.selectedIndex = 1;
      break;
    case '14:00':
      timeinSelect.selectedIndex = 2;
      timeoutSelect.selectedIndex = 2;
      break;
  }
};
timeinSelect.addEventListener('input', timeSelectInputHandler);
timeoutSelect.addEventListener('input', timeSelectInputHandler);

// синхронизация select'ов количества комнат и количества гостей
var numbersRoomSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var capacitySelectItem = capacitySelect.querySelectorAll('option');

var roomSelectInputHandler = function () {
  for (var i = 0; i < capacitySelectItem.length; i++) {
    capacitySelectItem[i].disabled = false;
  }
  switch (numbersRoomSelect.value) {
    case '1':
      capacitySelect.value = numbersRoomSelect.value;
      capacitySelectItem[0].disabled = true;
      capacitySelectItem[1].disabled = true;
      capacitySelectItem[3].disabled = true;
      break;
    case '2':
      capacitySelect.value = '2';
      capacitySelectItem[0].disabled = true;
      capacitySelectItem[3].disabled = true;
      break;
    case '3':
      capacitySelect.value = '3';
      capacitySelectItem[3].disabled = true;
      break;
    case '100':
      capacitySelect.value = '0';
      capacitySelectItem[0].disabled = true;
      capacitySelectItem[1].disabled = true;
      capacitySelectItem[2].disabled = true;
      break;
  }
};
numbersRoomSelect.addEventListener('input', roomSelectInputHandler);

// поведение кнопки reset
var resetButton = document.querySelector('.form__reset');
var resetButtonClickHandler = function () {
  window.location.reload();
};
resetButton.addEventListener('click', resetButtonClickHandler);
