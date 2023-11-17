/* 
Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. 
Напишите код, который сортирует этот массив по возрастанию возраста, а при равных возрастах 
сортирует по алфавиту по полю name.
*/

function sortObjectsByProperties(array) {
  // Используем метод массивов sort. Нужно учитывать, что данный метод изменяет исходный массив.
  // Если стоит задача не менять исходный массив, то нужно создать копию массива
  //  const arrayCopy = array.slice();
  // и дальнейшие действия производить именно с ним.
  return array.sort((a, b) => {
    // Если значения сравниваемых объектов по ключу age одинаково
    if (a.age === b.age) {
      // Используем метод localeCompare для сравнения строк
      // Он возвращает -1, 0 или 1 в зависимости от того,
      // какая строка предшествует другой в соответствии с правилами языка.
      return a.name.localeCompare(b.name);
    }
    // если значения сравниваемых объектов по ключу age не равно, можно использовать тернарный оператор
    // который вернет -1 если a.age < b.age, и 1 - в обратном случае.
    return a.age < b.age ? -1 : 1;
  });
}

// Вспомогательная функция для проверки полученных массивов объектов
function testSorting(array, expected, testName) {
  const sortedArray = sortObjectsByProperties(array); // Сортируем массив
  // Преобразуем отсортированный и проверочный массив в JSON-строки и сравним
  const result = JSON.stringify(sortedArray) === JSON.stringify(expected);
  console.log(`Тест '${testName}': ${result}`);
}

// Тесты
const tests = [
  {
    array: [
      { name: "John", age: 25 },
      { name: "Jane", age: 20 },
      { name: "Mary", age: 25 },
      { name: "Mark", age: 30 },
      { name: "Bill", age: 20 },
    ],
    expected: [
      { name: "Bill", age: 20 },
      { name: "Jane", age: 20 },
      { name: "John", age: 25 },
      { name: "Mary", age: 25 },
      { name: "Mark", age: 30 },
    ],
    testName: "Разные возраста и имена",
  },
  {
    array: [
      { name: "John", age: 25 },
      { name: "Jane", age: 25 },
      { name: "Mary", age: 25 },
      { name: "Mark", age: 25 },
      { name: "Bill", age: 25 },
    ],
    expected: [
      { name: "Bill", age: 25 },
      { name: "Jane", age: 25 },
      { name: "John", age: 25 },
      { name: "Mark", age: 25 },
      { name: "Mary", age: 25 },
    ],
    testName: "Одинаковый возраст, разные имена",
  },
  {
    array: [
      { name: "Mary", age: 25 },
      { name: "John", age: 30 },
      { name: "John", age: 25 },
      { name: "Alice", age: 20 },
      { name: "Zach", age: 20 },
    ],
    expected: [
      { name: "Alice", age: 20 },
      { name: "Zach", age: 20 },
      { name: "John", age: 25 },
      { name: "Mary", age: 25 },
      { name: "John", age: 30 },
    ],
    testName: "Случайный порядок",
  },
  {
    array: [
      { name: "mary", age: 25 },
      { name: "John", age: 25 },
      { name: "alice", age: 25 },
      { name: "Alice", age: 25 },
      { name: "john", age: 25 },
    ],
    expected: [
      { name: "alice", age: 25 },
      { name: "Alice", age: 25 },
      { name: "john", age: 25 },
      { name: "John", age: 25 },
      { name: "mary", age: 25 },
    ],
    testName: "Разный регистр имен",
  },
];

tests.forEach((test) => testSorting(test.array, test.expected, test.testName));
