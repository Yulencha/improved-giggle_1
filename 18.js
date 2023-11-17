/*Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.*/

function testLocalStorageLimit() {
  let testKey = "testLocalStorage"; // Ключ, используемый для сохранения тестовых данных в localStorage
  let increment = 1024 * 50;
  let testValue = "a".repeat(increment); // Начальное значение - повторяем символ increment раз

  // Переменная для хранения текущего общего размера тестовых данных в байтах
  let totalBytes = 0;

  // Очищаем все данные в localStorage перед началом теста
  localStorage.clear();

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
  } finally {
    // Удаляем тестовый ключ из localStorage, чтобы очистить использованные для теста данные
    localStorage.removeItem(testKey);
  }
}

// Вызываем функцию для тестирования
testLocalStorageLimit();
