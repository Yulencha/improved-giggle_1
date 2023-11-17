//Реализовать функцию конвертации JSON в строку JSON.stringify

function jsonStringify(value) {
  // Обработка null, который допустим в JSON как значение
  if (value === null) {
    return "null";
  }

  // Числа и булевые значения просто преобразуются в строку
  if (typeof value === "number" || typeof value === "boolean") {
    return value.toString();
  }

  // Строки обрабатываются путем обрамления их в двойные кавычки
  if (typeof value === "string") {
    return `"${value}"`;
  }

  // Массивы обрабатываются рекурсивно
  if (Array.isArray(value)) {
    const arrayContents = value
      .map((element) =>
        // Если элемент undefined, функция или символ, заменить его на 'null'
        // в противном случае рекурсивно вызвать jsonStringify для элемента
        element === undefined || typeof element === "function" || typeof element === "symbol"
          ? "null"
          : jsonStringify(element)
      )
      .join(","); // Соединяем получившиеся элементы, разделенные запятыми
    return `[${arrayContents}]`; // Возвращаем результат в формате массива JSON
  }

  // Обрабатываем объект, превращая все его свойства в их строковое представление
  if (typeof value === "object") {
    const keys = Object.keys(value);
    const keyValuePairStrings = keys.reduce((acc, key) => {
      // Пропускаем свойства объекта с функциями, символами или undefined в качестве значения
      if (
        typeof value[key] === "function" ||
        typeof value[key] === "symbol" ||
        value[key] === undefined
      ) {
        return acc; // Пропускаем эти значения, не добавляя их в результат
      }
      // Преобразуем пару ключ-значение в строковый формат, добавляем результат в аккумулирующий массив
      const keyValueString = `"${key}":${jsonStringify(value[key])}`;
      return [...acc, keyValueString];
    }, []);
    return `{${keyValuePairStrings.join(",")}}`; // Формируем результат в виде объекта JSON
  }
  // Если значение - undefined, функция или символ, возвращаем 'null'
  return "null";
}

const testObject = {
  nullValue: null,
  stringValue: "Test string",
  numberValue: 123,
  booleanValue: true,
  undefinedValue: undefined,
  functionValue: function () {
    console.log("test");
  },
  symbolValue: Symbol("symbol"),
  objectValue: {
    nestedString: "Nested Test",
  },
  arrayValue: [1, "two", null, undefined, function () {}, Symbol("symbol")],
};

const jsonString = jsonStringify(testObject);

console.log(JSON.stringify(testObject) === jsonStringify(testObject));

const testArray = [null, 123, "Test string", undefined, function () {}, Symbol("symbol")];

console.log(JSON.stringify(testArray) === jsonStringify(testArray));
console.log(JSON.stringify(testArray));
