/*
Разработайте функцию преобразования JSON в связный список. 
На входе функция должна получать JSON, содержащий список объектов, на выходе объект, 
представляющий из себя односвязный список.
*/

function jsonToSinglyLinkedList(json) {
  const data = JSON.parse(json); // Преобразуем строку в формате JSON в массив объектов JavaScript.
  let head = null; // Начало списка, пока что указывает на null.
  let current = null; // Текущий рабочий узел списка, пока что null.

  // Проходим по каждому элементу массива объектов.
  data.forEach((obj) => {
    // Если current равен null, то мы находимся у начала списка, и список пуст.
    // Создаем первый элемент списка с содержимым объекта obj и основой ссылки на следующий элемент
    if (current === null) {
      head = { value: obj, next: null };
      // Обновляем current, чтобы он указывал на текущий элемент списка
      current = head;
    }
    // Если current не null, это означает, что в списке уже есть узлы.
    // Тогда создаем следующий элемент списка в current.next
    else {
      current.next = { value: obj, next: null };
      // Обновляем current, чтобы он указывал на текущий элемент списка
      current = current.next;
    }
  });
  // Возвращаем первый узел итогового списка
  return head;
}

// Вспомогательная функция для печати элементов односвязного списка
function printList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
}

// Тест 1: Пустой список
console.log("Тест 1: Пустой список");
const emptyList = jsonToSinglyLinkedList("[]");
printList(emptyList);

// Тест 2: Список с одним элементом
console.log("Тест 2: Список с одним элементом");
const singleItemList = jsonToSinglyLinkedList('[{"data": "single"}]');
printList(singleItemList);

// Тест 3: Список с несколькими элементами
console.log("Тест 3: Список с несколькими элементами");
const multipleItemsList = jsonToSinglyLinkedList(
  '[{"data": "first"}, {"data": "second"}, {"data": "third"}]'
);
printList(multipleItemsList);
