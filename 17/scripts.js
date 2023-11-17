/*
Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле 
с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес.
Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.
*/

// function setupAddressAutocomplete() {
//   const addressInput = document.getElementById("geoInput");
//   const resultsSelect = document.getElementById("geoResults");

//   ymaps.ready(() => {
//     const addressAutocomplete = new ymaps.SuggestView(addressInput);

//     function fetchAddressCoordinates(address) {
//       if (address === "") {
//         resultsSelect.innerHTML = "";
//         resultsSelect.style.display = "none";
//         return;
//       }
//       ymaps.geocode(address).then((geocodingResult) => {
//         resultsSelect.innerHTML = "";
//         geocodingResult.geoObjects.each((addressObject) => {
//           const addressOption = document.createElement("option");
//           addressOption.value = addressObject.getAddressLine();
//           addressOption.text = addressObject.getAddressLine();
//           resultsSelect.appendChild(addressOption);
//         });
//         resultsSelect.style.display = "block";
//         resultsSelect.addEventListener("change", () => {
//           addressInput.value = resultsSelect.value;
//           resultsSelect.style.display = "none";
//         });
//       });
//     }

//     function debounceInput(fn, delay) {
//       let timer;
//       return function () {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//           fn.apply(this, arguments);
//         }, delay);
//       };
//     }

//     addressInput.addEventListener(
//       "input",
//       debounceInput(() => {
//         const address = addressInput.value;
//         fetchAddressCoordinates(address);
//       }, 1000)
//     );
//   });
// }
function setupAddressAutocomplete() {
  // Получаем элементы для ввода адреса и отображения результатов геокодирования
  const addressInput = document.getElementById("geoInput");
  const resultsSelect = document.getElementById("geoResults");

  // Инициализируем автодополнение адреса после загрузки Yandex Maps API
  ymaps.ready(function () {
    // Создаем виджет автодополнения для улучшения пользовательского ввода
    new ymaps.SuggestView(addressInput);

    // Добавляем слушатель событий ввода в поле адреса, используя дебаунсинг
    // для уменьшения количества запросов при наборе адреса
    addressInput.addEventListener("input", debounceInput(updateGeocodeResults, 1000));
  });

  // Функция для обновления результатов геокодирования на основе ввода пользователя
  function updateGeocodeResults() {
    const address = addressInput.value; // Получаем текущий введенный адрес
    if (!address) {
      clearResults(); // Если адрес пуст, очищаем результаты и не делаем запрос
      return;
    }
    fetchAddressCoordinates(address); // Иначе выполняем запрос на геокодирование
  }

  // Очищаем текущие результаты в выпадающем списке
  function clearResults() {
    resultsSelect.innerHTML = "";
    resultsSelect.style.display = "none";
  }

  // Выполняем запрос на геокодирование введенного адреса
  function fetchAddressCoordinates(address) {
    ymaps.geocode(address).then(function (geocodingResult) {
      clearResults(); // Очищаем предыдущие результаты
      populateResults(geocodingResult); // Заполняем новыми данными
    });
  }

  // Заполняем выпадающий список результатами геокодирования
  function populateResults(geocodingResult) {
    geocodingResult.geoObjects.each(function (addressObject) {
      // Создаем новый элемент списка для каждого найденного адреса
      const addressOption = document.createElement("option");
      addressOption.value = addressObject.getAddressLine();
      addressOption.text = addressObject.getAddressLine();
      resultsSelect.appendChild(addressOption); // Добавляем элемент в список
    });
    resultsSelect.style.display = "block"; // Отображаем список с результатами
  }

  // Добавляем слушатель событий для выбора адреса из выпадающего списка
  // При выборе адреса, он автоматически устанавливается в поле ввода
  resultsSelect.addEventListener("change", function () {
    addressInput.value = resultsSelect.value;
    clearResults(); // Скрываем список после выбора адреса
  });

  // Функция дебаунсинга для управления вызовами функций при частом вводе
  function debounceInput(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer); // Очищаем текущий таймер
      timer = setTimeout(function () {
        fn.apply(this, arguments); // Вызываем функцию после задержки
      }, delay);
    };
  }
}

window.onload = setupAddressAutocomplete;
