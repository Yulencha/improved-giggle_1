/*
Задача на работу с объектами: создайте объект, представляющий собой книгу. 
Объект должен иметь свойства, такие как: название книги, автор и год издания. 
Напишите методы для получения и изменения значений свойств книги.
*/

const book = {
  title: "Тени прошлого", // Название книги
  author: "Алексей Иванов", // Имя автора
  year: 2021, // Год издания

  // Метод объекта для получения названия книги
  // this используется для доступа к информации внутри объекта
  getTitle: function () {
    return this.title;
  },

  // Метод объекта для получения имени автора
  getAuthor: function () {
    return this.author;
  },

  // Метод объекта для получения года издания
  getYear: function () {
    return this.year;
  },

  // Метод объекта для установки нового названия книги
  setTitle: function (newTitle) {
    this.title = newTitle;
  },

  // Метод объекта для установки нового имени автора
  setAuthor: function (newAuthor) {
    this.author = newAuthor;
  },

  // Метод объекта для установки нового года издания
  setYear: function (newYear) {
    this.year = newYear;
  },
};

// Использование методов объекта для получения информации о книге
console.log(book.getTitle() === "Тени прошлого");
console.log(book.getAuthor() === "Алексей Иванов");
console.log(book.getYear() === 2021);

// Использование методов объекта для изменения информации о книге
book.setTitle("Свет будущего");
book.setAuthor("Мария Петрова");
book.setYear(2022);

// Проверка обновлённых свойств объекта
console.log(book.getTitle() === "Свет будущего");
console.log(book.getAuthor() === "Мария Петрова");
console.log(book.getYear() === 2022);
