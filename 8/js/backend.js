'use strict';

(function () {
  var SUCCESS = 200;
  var BAD_REQUEST = 400;
  var UNAUTHORIZED = 401;
  var NOT_FOUND = 404;
  var SERVER_TIMEOUT = 30000;
  var URL = 'https://js.dump.academy/keksobooking';
  var request = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case SUCCESS:
          onLoad(xhr.response, window.index);
          break;
        case BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = SERVER_TIMEOUT;
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = request(onLoad, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = request(onLoad, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
