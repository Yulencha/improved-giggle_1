/*Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.*/

export function testLocalStorageLimit() {
  let testKey = "testLocalStorage"; // Ключ, используемый для сохранения тестовых данных в localStorage
  let increment = 1024 * 50;
  let testValue = "a".repeat(increment); // Начальное значение - повторяем символ increment раз

  // Переменная для хранения текущего общего размера тестовых данных в байтах
  let totalBytes = getCurrentLocalStorageSize(); // Начинаем с текущего размера

  try {
    // Начинаем бесконечный цикл для постепенного увеличения размера данных, сохраняемых в localStorage
    while (true) {
      // Пытаемся сохранить текущее тестовое значение в localStorage
      localStorage.setItem(testKey, testValue);

      // Обновляем общий размер тестовых данных (количество символов * 2, т.к. один символ = 2 байта)
      totalBytes = testValue.length * 2;

      // Увеличиваем тестовое значение, добавляя к нему еще 100 КБ данных
      testValue += "a".repeat(increment);
    }
  } catch (e) {
    // В случае ошибки (обычно это ошибка превышения квоты), выводим максимальный объем данных
    console.log("Максимальный объем данных: ", totalBytes, " байт");
    console.log("Максимальный объем данных: ", totalBytes / 1024, " KB");
    console.log("Максимальный объем данных: ", (totalBytes / 1024 / 1024).toFixed(2), " MB");
    return totalBytes;
  } finally {
    // Удаляем тестовый ключ из localStorage, чтобы очистить использованные для теста данные
    localStorage.removeItem(testKey);
  }
}

export function getCurrentLocalStorageSize() {
  let totalSize = 0;

  // Перебор всех ключей в localStorage и подсчет общего размера
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // Каждый символ в строке обычно занимает 2 байта
      totalSize += localStorage[key].length * 2;
    }
  }

  return totalSize;
}

// Вызываем функцию для тестирования
testLocalStorageLimit();
