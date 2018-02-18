'use strict';

(function () {
  var REAL_ESTATE_OFFERS_LENGTH = 8;
  var PINS_WIDTH = 40;
  var PINS_HEIGHT = 44;
  var MAIN_PIN_CENTER_X = 600;
  var MAIN_PIN_CENTER_Y = 352;
  var MOVE_LIMIT_TOP = 125;
  var MOVE_LIMIT_RIGHT = 1170;
  var MOVE_LIMIT_BOTTOM = 650;
  var MOVE_LIMIT_LEFT = 30;

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

  var map = document.querySelector('.map');
  var getOfferCard = function (offerCard) {
    var adBlockTemplate = document.querySelector('template').content.querySelector('article.map__card');
    window.adBlockElementGlobal = adBlockTemplate.cloneNode(true);
    var adBlockElement = window.adBlockElementGlobal = adBlockTemplate.cloneNode(true);
    adBlockElement.querySelector('h3').textContent = offerCard.offer.title;
    adBlockElement.querySelector('.popup__address small').textContent = offerCard.offer.address;
    adBlockElement.querySelector('.popup__price').textContent = offerCard.offer.price + ' ₽/ночь';
    adBlockElement.querySelector('h4').textContent = setAppartType(offerCard.offer.type);
    adBlockElement.querySelector('.popup__rooms-and-guests').textContent = offerCard.offer.rooms +
      ' комнаты для ' + offerCard.offer.guests + ' гостей';
    adBlockElement.querySelector('.popup__check').textContent = 'Заезд после ' + offerCard.offer.checkin +
      ', выезд до ' + offerCard.offer.checkout;
    adBlockElement.querySelector('.popup__features').textContent = '';
    adBlockElement.querySelector('.popup__features').appendChild(setFeatures(offerCard.offer.features));
    adBlockElement.querySelector('.popup__description').textContent = offerCard.offer.description;
    adBlockElement.querySelector('.popup__pictures').textContent = '';
    adBlockElement.querySelector('.popup__pictures').appendChild(setPhotos(offerCard.offer.photos));
    adBlockElement.querySelector('.popup__avatar').src = offerCard.author.avatar;
    return adBlockElement;
  };

  var renderOfferCards = function (i) {
    window.load(function (offerCards, errorMessage) {
      var fragment = document.createDocumentFragment();
      var insertContainer = document.querySelector('.map__filters-container');
      fragment.appendChild(getOfferCard(offerCards[i]));
      map.insertBefore(fragment, insertContainer);

      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    });
  };

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
    var popup = document.querySelector('.popup');
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
    renderOfferCards(index);
    popup.remove();
  };
  map.addEventListener('click', mapCardsClickHandler);

  var pinsOnMap = document.querySelector('.map__pins');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var getPinsOnMap = function (pin) {
    var pinsElement = pinsTemplate.cloneNode(true);
    pinsElement.setAttribute('style', 'left: ' + (pin.location.x + PINS_WIDTH / 2) +
      'px; top: ' + (pin.location.y + PINS_HEIGHT) + 'px');
    pinsElement.querySelector('img').setAttribute('src', pin.author.avatar);
    return pinsElement;
  };

  var renderPins = function () {
    window.load(function (pins) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < 8; i++) {
        fragment.appendChild(getPinsOnMap(pins[i]));
      }
      pinsOnMap.appendChild(fragment);
    });
  };

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
    renderPins();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var button = document.querySelectorAll('.map__pin--user');

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.endingShift = {
        top: mainPin.offsetTop - shift.y,
        left: mainPin.offsetLeft - shift.x
      };

      mainPin.style.top = (window.endingShift.top) + 'px';
      mainPin.style.left = (window.endingShift.left) + 'px';

      if (window.endingShift.top < MOVE_LIMIT_TOP) {
        mainPin.style.top = MOVE_LIMIT_TOP + 'px';
      }
      if (window.endingShift.top > MOVE_LIMIT_BOTTOM) {
        mainPin.style.top = MOVE_LIMIT_BOTTOM + 'px';
      }
      if (window.endingShift.left < MOVE_LIMIT_LEFT) {
        mainPin.style.left = MOVE_LIMIT_LEFT + 'px';
      }
      if (window.endingShift.left > MOVE_LIMIT_RIGHT) {
        mainPin.style.left = MOVE_LIMIT_RIGHT + 'px';
      }

      inputAddress.value = window.endingShift.left + ', ' + window.endingShift.top;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      activateMap();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    for (var i = 0; i < REAL_ESTATE_OFFERS_LENGTH; i++) {
      button[i].remove();
    }
  });
})();
