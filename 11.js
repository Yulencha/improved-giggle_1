/*
Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую функцию. 
Внутренняя функция должна иметь доступ к переменной, определенной во внешней функции, 
даже после того, как внешняя функция завершила свое выполнение.
*/

function outerFunction() {
  // Определяем переменную 'outerVariable' в области видимости 'outerFunction'.
  // Эта переменная будет доступна только внутри 'outerFunction' и во всех функциях, определенных внутри 'outerFunction'.
  const outerVariable = "Я видима внутренней функции!";

  // Возвращаем новую функцию — 'innerFunction' из 'outerFunction'.
  // 'innerFunction' создается в области видимости 'outerFunction', что позволяет ей иметь доступ к 'outerVariable'.
  return function innerFunction() {
    // 'innerFunction' возвращает 'outerVariable', когда она вызывается.
    // Замыкание сохраняет 'outerVariable' доступной для 'innerFunction', даже после того как 'outerFunction' выполнена.
    return outerVariable;
  };
}

// Вызываем 'outerFunction', который возвращает 'innerFunction', и присваиваем этой возвращаемой функции переменную 'myInnerFunction'.
const myInnerFunction = outerFunction(); // 'outerFunction' выполнена, но 'outerVariable' остается доступна для 'myInnerFunction' через замыкание.

// Вызываем 'myInnerFunction', которая теперь ссылается на 'innerFunction', и выводим в консоль значение 'outerVariable'.
console.log(myInnerFunction()); // 'Я видима внутренней функции!'
