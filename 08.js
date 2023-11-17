/*
Задача о замыканиях: напишите функцию, которая будет принимать массив функций 
и возвращать новую функцию, которая вызывает каждую функцию в этом массиве 
и возвращает массив результатов, полученных после вызова каждой функции.
*/

function invokeFunctions(functionsArray) {
  // Возвращаем новую функцию из invokeFunctions для создания замыкания
  return function () {
    const results = []; // массив для хранения результатов вызова функций.
    // Итерируемся по массиву функций
    for (let i = 0; i < functionsArray.length; i++) {
      // Добавляем в массив результат выполнения функции
      results.push(functionsArray[i]());
    }
    // После завершения цикла возвращаем массив с результатами выполнения функций
    return results;
  };
}

// Тест 1: Пустой массив функций
const emptyArrayTest = invokeFunctions([]);
console.log(JSON.stringify(emptyArrayTest()) === JSON.stringify([])); // Тест с пустым массивом должен вернуть пустой массив

// Тест 2: Массив функций, возвращающих значения
const returnValueTest = invokeFunctions([() => 1, () => 2, () => 3]);
console.log(JSON.stringify(returnValueTest()) === JSON.stringify([1, 2, 3])); // Тест с массивом функций должен вернуть массив возвращаемых значений.

// Тест 3: Функции с побочными эффектами
let sideEffectCounter = 0;
const sideEffectTest = invokeFunctions([
  () => {
    sideEffectCounter++;
    return sideEffectCounter;
  },
  () => {
    sideEffectCounter++;
    return sideEffectCounter;
  },
]);
sideEffectTest();
console.log(sideEffectCounter === 2); // Функции с побочными эффектами должны вызываться по порядку

// Тест 4: Многократный вызов
const multipleCallsTest = invokeFunctions([() => "test", () => "multiple"]);
const firstCallResult = multipleCallsTest();
const secondCallResult = multipleCallsTest();
console.assert(
  JSON.stringify(firstCallResult) === JSON.stringify(["test", "multiple"]) &&
    JSON.stringify(secondCallResult) === JSON.stringify(["test", "multiple"]) &&
    firstCallResult !== secondCallResult,
  "Последовательные вызовы должны возвращать отдельные массивы результатов."
);
console.log("Все тесты выполнены.");
