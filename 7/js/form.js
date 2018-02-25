'use strict';

(function () {
  var PIN_TOP_DEFAULT = '375px';
  var PIN_LEFT_DEFAULT = '50%';
  var REAL_ESTATE_OFFERS_LENGTH = 8;
  var NOTICE_TIMEOUT = 5000;

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

  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');

  var formDisabled = function () {
    var fieldList = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldList.length; i++) {
      fieldList[i].disabled = true;
    }
  };

  var mainPinResetCoords = function () {
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.top = PIN_TOP_DEFAULT;
    mainPin.style.left = PIN_LEFT_DEFAULT;
  };
  var resetPage = function () {
    var popup = document.querySelector('.popup');
    var button = document.querySelectorAll('.map__pin--user');
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    if (map.contains(popup)) {
      popup.remove();
    }
    if (mapPins.childElementCount > 2) {
      for (var i = 0; i < REAL_ESTATE_OFFERS_LENGTH; i++) {
        button[i].remove();
      }
    }
    formDisabled();
    noticeForm.reset();
    map.classList.add('map--faded');
    mapPins.insertAdjacentHTML('afterbegin', '<div class="map__pinsoverlay"><h2>И снова Токио!</h2></div>');
    mainPinResetCoords();
    noticeForm.classList.add('notice__form--disabled');
  };

  var formValidityNotice = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 1; margin: -20px auto; text-align: center; color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '26px';
    node.textContent = errorMessage;
    notice.appendChild(node);
    setTimeout(function () {
      node.remove();
    }, NOTICE_TIMEOUT);
  };

  var submitFormHandler = function (evt) {
    window.backend.save(new FormData(noticeForm), resetPage, formValidityNotice);
    evt.preventDefault();
  };
  noticeForm.addEventListener('submit', submitFormHandler);

  // поведение кнопки reset
  var resetButton = document.querySelector('.form__reset');
  var resetButtonClickHandler = function () {
    resetPage();
  };
  resetButton.addEventListener('click', resetButtonClickHandler);
})();
