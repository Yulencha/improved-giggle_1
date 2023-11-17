/*
Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует функцию для работы с датами. 
Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.
*/

// Импорт библиотеки Moment.js
import moment from "moment";

// Функция для форматирования текущей даты и времени
export function formatCurrentDate() {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}

console.log(formatCurrentDate());
