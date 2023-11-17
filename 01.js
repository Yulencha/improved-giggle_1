//Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом.
//Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).

function isPalindrome(str) {
  const lowercaseChars = str.toLocaleLowerCase().split(""); // Преобразуем строку в нижний регистр и разобьём на массив символов.
  let result = false; // Инициализация переменной результата как ложь (false).

  const lettersAndDigits = lowercaseChars.filter((item) => /^[а-яА-Яa-zA-Z0-9]+$/.test(item)); // Фильтруем массив символов, оставляя только буквы и цифры.

  // Если в отфильтрованном массиве есть элементы, выполнение кода продолжится. Если нет, то в функция вернет начальное значение result = false
  if (lettersAndDigits.length > 0) {
    // Выполняем сравнение символов первого и последнего, второго и предпоследнего и т.д. до середины массива.
    for (let i = 0; i <= (lettersAndDigits.length - 1) / 2; i++) {
      if (lettersAndDigits[i] == lettersAndDigits[lettersAndDigits.length - 1 - i]) {
        //Если пара символов одинакова, то перезаписываем значение result. Если все пары символов будут одинаковы, result останется равным true
        result = true;
      } else {
        //Если какая-то пара символов не будет одинаковой, то прерываем выполнение функции и возвращаем false
        return false;
      }
    }
  }
  return result;
}

let str1 = "аргентина манит негра"; //это палиндром, выполнение функции должно вернуть true
let str2 = "аргентина юманит негра"; //это не палиндром (ошибка в середине), выполнение функции должно вернуть false
let str3 = "Он — верба, но / Она — бревно"; //это палиндром с использованием знаков препинания, выполнение функции должно вернуть true
let str4 = ""; //это не палиндром, выполнение функции должно вернуть false
let str5 = "12344321"; //это палиндром, выполнение функции должно вернуть true
let str6 = "13344321"; //это не палиндром, выполнение функции должно вернуть false
let str7 = "a"; ////короткий палиндром, выполнение функции должно вернуть true
let longPalindrome = "a".repeat(10000) + "b" + "a".repeat(10000); //длинный палиндром, выполнение функции должно вернуть true
let str8 = "A man, a plan, a canal, Panama"; //палиндром на английском, выполнение функции должно вернуть true

console.log(isPalindrome(str1) === true);
console.log(isPalindrome(str2) === false);
console.log(isPalindrome(str3) === true);
console.log(isPalindrome(str4) === false);
console.log(isPalindrome(str5) === true);
console.log(isPalindrome(str6) === false);
console.log(isPalindrome(str7) === true);
console.log(isPalindrome(longPalindrome) === true);
console.log(isPalindrome(str8) === true);
