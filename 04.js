/* Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
112 сообщения
12 сообщений
1 сообщение
1024 пользователя
1026 пользователей
121 пользователь

Функцию надо упаковать в модуль. */

/* Чтобы получить правильную форму склонения, нужно передать в функцию:
number - количество единиц
one - склонение слова для одной единицы
two - склонение слова для двух единиц
five - склонение слова для пяти единиц
*/

export function getCorrectWordEnding(quantity, one, two, five) {
  const number = Math.abs(quantity); // Получаем абсолютное значение числа
  //Получаем последнюю цифру переданного числа - остаток от деления числа на 10
  const lastDigit = number % 10;
  //Получаем две последние цифры переданного числа - остаток от деления числа на 100
  const lastTwoDigits = number % 100;

  // Для чисел от 10 до 20 и чисел, оканчивающихся на 10-20 мы используем то же окончание, что и для 5 ед.
  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return `${quantity} ${five}`;
  }
  // Для всех чисел, оканчивающихся на 1 мы используем то же окончание, что и для 1 ед.
  else if (lastDigit === 1) {
    return `${quantity} ${one}`;
  }
  // Для всех чисел, оканчивающихся на 2, 3 или 4 мы используем то же окончание, что и для 2 ед.
  else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${quantity} ${two}`;
  }
  //Для всех остальных чисел мы используем то же окончание, что и для 5 ед.
  else {
    return `${quantity} ${five}`;
  }
}

console.log(getCorrectWordEnding(21, "сообщение", "сообщения", "сообщений")); // 21 сообщение
console.log(getCorrectWordEnding(2, "сообщение", "сообщения", "сообщений")); // 2 сообщения
console.log(getCorrectWordEnding(5, "сообщение", "сообщения", "сообщений")); // 5 сообщений
console.log(getCorrectWordEnding(11, "сообщение", "сообщения", "сообщений")); // 11 сообщений
console.log(getCorrectWordEnding(111, "сообщение", "сообщения", "сообщений")); // 111 сообщений
console.log(getCorrectWordEnding(1024, "пользователь", "пользователя", "пользователей")); // 1024 пользователя
console.log(getCorrectWordEnding(0, "пользователь", "пользователя", "пользователей")); // 0 пользователей
console.log(getCorrectWordEnding(-1, "пользователь", "пользователя", "пользователей")); // -1 пользователь
