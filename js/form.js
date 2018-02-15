'use strict';

(function () {
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
})();
