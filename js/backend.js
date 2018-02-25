'use strict';

(function () {
  var ERROR_200 = 200;
  var ERROR_400 = 400;
  var ERROR_401 = 401;
  var ERROR_404 = 404;
  var SERVER_TIMEOUT = 30000;
  var URL = 'https://js.dump.academy/keksobooking';
  var request = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case ERROR_200:
          onLoad(xhr.response, window.index);
          break;
        case ERROR_400:
          error = 'Неверный запрос';
          break;
        case ERROR_401:
          error = 'Пользователь не авторизован';
          break;
        case ERROR_404:
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
