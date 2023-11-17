// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

function parseJSON(jsonString) {
  jsonString = jsonString.trim();
  if (jsonString.startsWith("{")) {
    // Обработка JSON-объекта
    return parseObject(jsonString);
  } else if (jsonString.startsWith("[")) {
    // Обработка JSON-массива
    return parseArray(jsonString);
  } else {
    throw new Error("Invalid JSON: Must start with either { or [");
  }
}

function mergeNestedStructures(parts, connector) {
  // Перебираем полученные части
  for (let i = 0; i < parts.length; i++) {
    // Проверяем, содержит ли текущий элемент открывающую скобку
    if (parts[i].includes("{") || parts[i].includes("[")) {
      // Если да, то устанавливаем счетчик глубины вложенности
      let depth = 0;

      // Перебираем следующие элементы для поиска закрывающей скобки
      for (let j = i; j < parts.length; j++) {
        let part = parts[j];
        // Увеличиваем глубину вложенности при каждой открывающей скобке
        depth += (part.match(/{|\[/g) || []).length;
        // Уменьшаем глубину вложенности при каждой закрывающей скобке
        depth -= (part.match(/}|\]/g) || []).length;

        // Когда глубина вложенности достигает нуля, значит, мы нашли соответствующую закрывающую скобку
        if (depth === 0) {
          // Объединяем все элементы от начальной открывающей до закрывающей скобки
          parts[i] = parts.slice(i, j + 1).join(connector);
          // Удаляем из массива уже обработанные элементы, оставляя только объединенный элемент
          parts.splice(i + 1, j - i);
          break;
        }
      }
    }
  }
}

function validateJSON(jsonString) {
  // Удаляем пробелы в начале и конце строки
  jsonString = jsonString.trim();
  const bracketPairs = new Map([
    ["{", "}"],
    ["[", "]"],
  ]);
  const startBracket = jsonString[0];
  const endBracket = jsonString[jsonString.length - 1];
  if (!bracketPairs.has(startBracket) || bracketPairs.get(startBracket) !== endBracket) {
    throw new Error("Invalid JSON string");
  }

  // Удаление скобки с начала и конца строки
  const content = jsonString.slice(1, -1);

  // Возвращаем обработанную строку
  return content;
}

function parseArray(jsonString) {
  const content = validateJSON(jsonString); // Проверяем и удаляем скобки с начала и конца
  let parts = content.split(",").map((part) => part.trim()); // Разделение строки на элементы
  // Соединяем части, которые являются частью вложенного  массива или объекта
  mergeNestedStructures(parts, ',"');
  return parts.map((part) => {
    if (part.startsWith("{")) {
      return parseObject(validateJSON(part));
    } else if (part.startsWith("[")) {
      return parseArray(part);
    } else {
      return parsePrimitiveValue(part);
    }
  });
}

function parseObject(jsonString) {
  const content = validateJSON(jsonString); // Проверяем и удаляем скобки с начала и конца
  // Разделяем строку по ',"', предполагая, что это начало новой пары ключ-значение
  let parts = content.split(',"').map((part) => part.trim());
  // Проверка и удаление первой кавычки из первого элемента
  if (parts.length > 0 && parts[0][0] === '"') {
    parts[0] = parts[0].substring(1);
  }
  // Соединяем части, которые являются частью вложенного  массива или объекта
  mergeNestedStructures(parts, ',"');

  const result = {};

  parts.forEach((part) => {
    const items = part.split('":').map((p) => p.trim());
    if (items.length > 2) {
      mergeNestedStructures(items, '":');
    }
    const [key, value] = items;
    if (value.startsWith("{")) {
      // Обработка вложенного объекта
      result[key] = parseObject(value);
    } else if (value.startsWith("[")) {
      // Обработка вложенного массива
      result[key] = parseArray(value);
    } else {
      // Обработка примитивных значений
      result[key] = parsePrimitiveValue(value);
    }
  });

  return result;
}

function parsePrimitiveValue(value) {
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  if (!isNaN(value)) {
    return Number(value);
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === "null") {
    return null;
  }
  return value;
}

// Тест

const testObject = {
  objectValue: {
    nestedString: "Nested Test",
  },
  nullValue: null,
  stringValue: "Test string",
  numberValue: 123,
  booleanValue: true,
  undefinedValue: undefined,
  functionValue: function () {
    console.log("test");
  },
  symbolValue: Symbol("symbol"),

  arrayValue: [1, "two", null, undefined, function () {}, Symbol("symbol")],
};

const jsonString = JSON.stringify(testObject);
// console.log(jsonString);

const jsonObj = JSON.parse(jsonString);
// console.log(jsonObj);

const parsed = parseJSON(jsonString);
// console.log(parsed);

console.log(JSON.stringify(parsed) === JSON.stringify(jsonObj));
