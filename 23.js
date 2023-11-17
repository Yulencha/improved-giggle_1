/*
Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля. 
Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах. 
Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.
*/

function analyzePassword(password) {
  let strength = 0;
  let suggestions = [];

  // Критерий длины
  if (password.length < 6) {
    suggestions.push("Используйте не менее 6 символов.");
  } else if (password.length >= 6) {
    strength++;
  }

  // Критерий наличия букв в разных регистрах
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    strength++;
  } else {
    suggestions.push("Используйте комбинацию больших и маленьких букв.");
  }

  // Критерий наличия цифр
  if (/\d/.test(password)) {
    strength++;
  } else {
    suggestions.push("Добавьте в пароль цифры.");
  }

  // Критерий наличия специальных символов
  if (/\W/.test(password)) {
    strength++;
  } else {
    suggestions.push("Добавьте специальные символы (например, !, @, #, $).");
  }

  // Оценка сложности
  let strengthLevel;
  switch (strength) {
    case 0:
    case 1:
      strengthLevel = "Слабый";
      break;
    case 2:
      strengthLevel = "Средний";
      break;
    case 3:
      strengthLevel = "Сильный";
      break;
    case 4:
      strengthLevel = "Очень сильный";
      break;
  }

  // Вывод оценки и предложений
  console.log("Сложность пароля:", strengthLevel);
  if (strengthLevel !== "Очень сильный") {
    console.log("Предложения по улучшению:", suggestions.join(" "));
  }
}

// Тест 1: Очень слабый пароль (короткий, только буквы)
let password1 = "abc";
analyzePassword(password1);

// Тест 2: Слабый пароль (только буквы)
let password2 = "abcdef";
analyzePassword(password2);

// Тест 3: Средний пароль (буквы и цифры)
let password3 = "abc123";
analyzePassword(password3);

// Тест 4: Сильный пароль (буквы в разных регистрах и цифры)
let password4 = "Abc123";
analyzePassword(password4);

// Тест 5: Очень сильный пароль (буквы в разных регистрах, цифры и спецсимволы)
let password5 = "Abc123!";
analyzePassword(password5);
