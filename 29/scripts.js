function submitForm() {
  // Получение формы по её идентификатору
  const form = document.getElementById("myForm");

  // Создание объекта для хранения данных формы
  const formData = {
    firstName: form["firstName"].value,
    lastName: form["lastName"].value,
  };

  // Действия с данными формы, например, отображение всплывающего окна с результатами
  alert("Имя: " + formData.firstName + "\nФамилия: " + formData.lastName);
}
