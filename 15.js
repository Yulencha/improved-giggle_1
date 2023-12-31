/*
Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await 
для ожидания выполнения других асинхронных операций, и возвращает результат выполнения.
*/

async function asyncOperation() {
  try {
    // Здесь мы можем ожидать выполнения любой асинхронной операции
    // Например, мы используем setTimeout для имитации асинхронной задержки
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("Результат выполненной операции");
      }, 2000); // задержка в 2000 мс (2 секунды)
    });

    // Возвращаем результат после завершения асинхронной операции
    return result;
  } catch (error) {
    // В случае ошибки в асинхронной операции, ошибка будет поймана здесь
    throw error;
  }
}

// Использование асинхронной функции
asyncOperation()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
