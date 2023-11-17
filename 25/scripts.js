/*
Задача: Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент, 
добавляет его в DOM и устанавливает для него стиль с помощью CSS.
*/

function createAndStyleElement() {
  // Создание нового элемента, например div
  var newElement = document.createElement("div");

  // Добавление текста или другого содержимого в элемент
  newElement.innerHTML = "Это новый элемент";

  // Установка стилей для элемента
  newElement.style.color = "blue";
  newElement.style.fontSize = "20px";
  newElement.style.fontWeight = "bold";
  newElement.style.marginTop = "10px";

  // Добавление элемента в DOM, например, в body
  document.body.appendChild(newElement);
}

// Вызов функции для создания и добавления элемента
createAndStyleElement();
