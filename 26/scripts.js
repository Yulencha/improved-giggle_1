/*
Задача: Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM, 
начиная с указанного элемента, и выполняет определенное действие с каждым узлом 
(например, выводить информацию о теге в консоль).
*/

function traverseDOM(element) {
  // Выполнение действия с текущим элементом
  console.log("Тег:", element.tagName, "| Класс:", element.className);
  // Получение всех дочерних элементов
  let children = element.children;

  // Рекурсивный обход всех дочерних элементов
  for (let i = 0; i < children.length; i++) {
    traverseDOM(children[i]);
  }
}

// Запуск обхода с корневого элемента, например, document.body
traverseDOM(document.body);
