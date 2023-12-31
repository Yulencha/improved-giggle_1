//Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат.

// Функция для тестирования максимального количества рекурсивных вызовов document.write
function testDocumentWriteRecursion() {
  let count = 0; // Счетчик для подсчета количества вызовов

  // Вложенная функция для рекурсивного вызова document.write
  function recursiveWrite() {
    try {
      count++; // Увеличиваем счетчик на каждый вызов
      document.write(recursiveWrite()); // Рекурсивный вызов функции
    } catch (e) {
      // Блок catch срабатывает, когда возникает ошибка (например, переполнение стека вызовов)
      console.log("Максимальное количество рекурсивных вызовов document.write: ", count); // Выводим результат
      console.error(e); // Выводим ошибку в консоль
    }
  }

  recursiveWrite(); // Начальный вызов рекурсивной функции
}

testDocumentWriteRecursion(); // Вызов основной функции

/*
В моем тесте рекурсивно вызвать document.write получилось 6895 раз. 
Это число отражает максимальное количество рекурсивных вызовов document.write(), 
которое удается выполнить в текущем браузере, прежде чем достигается предел стека вызовов 
и оно может варьироваться в зависимости от браузера, его версии, а также от характеристик системы, 
на которой выполняется тест.
*/
