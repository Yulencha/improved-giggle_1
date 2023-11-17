// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// - вычисление N-го числа в ряду Фибоначчи
// - вычисление всех чисел в ряду Фибоначчи до числа N
// - вычисление N-го просто числа
// - вычисление всех простых чисел до числа N

// Будет плюсом, если задумаетесь и об оптимизации

//Будем делать MathX в виде объекта
//С помощью анонимной функции-обертки создадим область видимости, где определим приватные и возвращаемые(доступные для внешнего пользования) части
const MathX = (function () {
  // Приватные переменные и функции

  // Для оптимизации, будем запоминать/кэшировать результаты предыдущих вычислений.
  const fibCache = { 0: 0, 1: 1 }; // Объект с числами Фибоначчи
  const primeCache = [2, 3]; //Массив с простыми числами

  // Вспомогательная функция для проверки простое ли это число
  const isPrime = (num) => {
    //Самое маленькое простое число - 2, меньше него числа не являются простыми
    if (num <= 1) {
      return false;
    }
    if (num === 2) {
      return true;
    }
    //Четные числа не могут быть простыми, для оптимизации исключим их из следующего цикла
    if (num % 2 === 0) {
      return false;
    }
    /*Будем перебирать делители начиная с 3, поскольку 1 точно является делителем, а если число делится на 2 - то оно четное
    Также будем увеличивать значение i сразу на два, поскольку мы уже отсекли все четные числа
    Проверять делители будем до корня из исходного числа, поскольку если мы не находим делитель вплоть до квадратного корня из num,
    то и после квадратного корня также делителя не существует.*/
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      //Если число делится на i без остатка - оно не является простым
      if (num % i === 0) return false;
    }
    //Если цикл прошел без выполнения return false, значит не было найдено делителей для этого числа. Значит число является простым.
    return true;
  };

  // Возвращаем методы, которые будут доступны для внешнего использования
  return {
    // 1.вычисление N-го числа в ряду Фибоначчи
    fibonacci: function (n) {
      // Если в fibCache уже есть значение по ключу n, то возвращаем его
      if (fibCache[n]) {
        return fibCache[n];
      }
      //Если этого значения нет, нам нужно вычислить недостающие числа Фибоначчи
      // Находим ключ/порядковый номер наибольшего вычисленного значения в кеше, от которого начнём вычисление и увеличиваем его на 1
      //Для этого создаем массив всех ключей объекта fibCache и преобразуем их в числа (Object.keys вернет массив строк), затем передаем в Math.max с помощью оператора "..."
      let i = Math.max(...Object.keys(fibCache).map(Number)) + 1;
      //Выполняем цикл, пока не вычислим n-е число Фибоначчи
      for (; i <= n; i++) {
        fibCache[i] = fibCache[i - 1] + fibCache[i - 2]; // Сохраняем каждое новое значение в кеше
      }
      //Возвращаем вычисленное значение
      return fibCache[n];
    },

    //2.вычисление всех чисел в ряду Фибоначчи до числа N
    fibonacciSeries: function (n) {
      // Находим ключ/порядковый номер наибольшего вычисленного значения в кеше
      let i = Math.max(...Object.keys(fibCache).map(Number));
      // Если максимальное число в кеше меньше n, вычисляем недостающие значения
      if (fibCache[i] < n) {
        //Выполняем цикл пока последнее/максимальное значение будет меньше n. Как только это условие перестанет выполняться,
        //т.е. при fibCache[i] >= n , выполнение цикла закончится
        while (fibCache[i] < n) {
          fibCache[i] = fibCache[i - 1] + fibCache[i - 2];
          i++;
        }
      }

      // Возвращаем все числа Фибоначчи из кеша, которые меньше n
      return Object.values(fibCache).filter((fibNum) => fibNum < n);
    },

    //3.вычисление N-го простого числа
    findNthPrime: function (n) {
      // Если n-тое простое число уже находится в кэше, возвращаем его
      if (primeCache.length >= n) return primeCache[n - 1];
      // Иначе начинаем поиск с последнего найденного простого числа
      let currentNumber = primeCache[primeCache.length - 1];
      //С помощью цикла, перебираем все последующие нечетные числа, пока длина кэшированного массива не будет больше или равна n
      while (primeCache.length < n) {
        currentNumber += 2; // проверяем только нечетные числа
        //Используем вспомогательную функцию isPrime для проверки текущего числа
        if (isPrime(currentNumber)) {
          //и если число является простым, добавляем его в кэш
          primeCache.push(currentNumber);
        }
      }
      //Возвращаем n-тое число из массива
      return primeCache[n - 1];
    },

    //4.вычисление всех простых чисел до числа N
    primeSeries: function (n) {
      // Находим последнее/наибольшее простое число в кэше
      let currentNumber = primeCache[primeCache.length - 1];
      //Если оно меньше n находим недостающие простые числа
      if (currentNumber < n) {
        //С помощью цикла, перебираем все последующие нечетные числа, пока длина кэшированного массива не будет больше или равна n
        while (currentNumber < n) {
          currentNumber += 2; // проверяем только нечетные числа
          //Используем вспомогательную функцию isPrime для проверки текущего числа

          if (isPrime(currentNumber)) {
            primeCache.push(currentNumber);
          }
        }
      }
      // Возвращаем все простые числа из кэша, которые меньше n
      return primeCache.filter((primeNum) => primeNum < n);
    },
  };
})();

//.........................................
console.log("Тесты для функции вычисления N-го числа Фибоначчи");

console.log(MathX.fibonacci(0) === 0);
console.log(MathX.fibonacci(1) === 1);
console.log(MathX.fibonacci(10) === 55);
console.log(MathX.fibonacci(-1) === undefined);
//.........................................
console.log("Тесты для функции вычисления всех чисел в ряду Фибоначчи до числа N");

console.log(JSON.stringify(MathX.fibonacciSeries(0)) === JSON.stringify([]));
console.log(JSON.stringify(MathX.fibonacciSeries(1)) === JSON.stringify([0]));
console.log(JSON.stringify(MathX.fibonacciSeries(2)) === JSON.stringify([0, 1, 1]));
console.log(JSON.stringify(MathX.fibonacciSeries(10)) === JSON.stringify([0, 1, 1, 2, 3, 5, 8]));
console.log(JSON.stringify(MathX.fibonacciSeries(13)) === JSON.stringify([0, 1, 1, 2, 3, 5, 8]));
//.........................................
console.log("Тесты для функции вычисления N-го простого числа");

console.log(MathX.findNthPrime(1) === 2);
console.log(MathX.findNthPrime(10) === 29);
console.log(MathX.findNthPrime(0) === undefined);
console.log(MathX.findNthPrime(-1) === undefined);
//.........................................
console.log("Тесты для функции вычисления всех простых чисел до числа N");

console.log(JSON.stringify(MathX.primeSeries(10)) === JSON.stringify([2, 3, 5, 7]));
console.log(JSON.stringify(MathX.primeSeries(2)) === JSON.stringify([]));
console.log(JSON.stringify(MathX.primeSeries(1)) === JSON.stringify([]));
console.log(JSON.stringify(MathX.primeSeries(0)) === JSON.stringify([]));
console.log(JSON.stringify(MathX.primeSeries(-10)) === JSON.stringify([]));
