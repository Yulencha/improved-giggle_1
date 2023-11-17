/*
Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет анимацию 
для элемента на веб-странице, например, плавное изменение его положения или размера.
*/

function startAnimation() {
  let elem = document.getElementById("animateMe");
  elem.style.width = "200px";
  elem.style.height = "200px";
  elem.style.transform = "translateX(100px)";
}
