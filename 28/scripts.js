/*
Задача: Создать и добавить элемент с использованием шаблонов: Напишите функцию, 
которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.
*/

function addItem() {
  // Получение шаблона
  const template = document.getElementById("itemTemplate");

  // Клонирование содержимого шаблона
  const clone = template.content.cloneNode(true);

  // Добавление клонированного содержимого в DOM, например в конец body
  document.body.appendChild(clone);
}
