/*
Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

Требования:
данные должны загружаться при загрузке страницы
необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
необходимо реализовать клиентскую пагинацию (50 элементов на странице)
*/

let fullData = []; // Хранение полных данных
let currentSortColumn = null;
let sortDirection = "ascending";
let currentPage = 1; // Текущая страница пагинации
const itemsPerPage = 50; // Элементов на страницу

// Функция для загрузки данных из источника
async function fetchDataAndRenderTable() {
  const url =
    "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true";

  try {
    const response = await fetch(url);
    fullData = await response.json();
    renderTable(fullData);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
}
fetchDataAndRenderTable();

// Функция для создания и отображения таблицы
function renderTable(data) {
  const container = document.getElementById("table-container");
  const table = document.createElement("table");
  const thead = createTableHeader();
  const tbody = document.createElement("tbody");
  tbody.setAttribute("id", "table-body");

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(table);

  updateTableContent(1, itemsPerPage);
  addPagination(container, data, itemsPerPage);
}

// Создание заголовков таблицы с элементами управления сортировкой
function createTableHeader() {
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["first name", "last name", "tel", "address", "city", "state", "zip"];

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header + " ";

    const sortIndicator = document.createElement("span");
    sortIndicator.className = "sort-indicator";
    sortIndicator.innerHTML = "&#x2195;";
    th.appendChild(sortIndicator);

    th.addEventListener("click", () => sortTableByColumn(header));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  return thead;
}

// Функция для сортировки данных по столбцу
function sortTableByColumn(column) {
  if (column === currentSortColumn) {
    sortDirection = sortDirection === "ascending" ? "descending" : "ascending";
  } else {
    currentSortColumn = column;
    sortDirection = "ascending";
  }

  fullData.sort((a, b) => {
    const aValue = a[column];
    const bValue = b[column];

    if (aValue < bValue) return sortDirection === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "ascending" ? 1 : -1;
    return 0;
  });

  updateTableContent(currentPage, itemsPerPage);
  updateSortIndicators(column, sortDirection);
}

// Обновление содержимого таблицы в соответствии с текущей страницей и количеством элементов на страницу
function updateTableContent(page, itemsPerPage) {
  const tbody = document.getElementById("table-body");
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = fullData.slice(startIndex, endIndex);

  tbody.innerHTML = "";

  paginatedData.forEach((item) => {
    const row = document.createElement("tr");
    Object.values(item).forEach((value) => {
      const td = document.createElement("td");
      td.innerText = value;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
}

// Функция для добавления и управления пагинацией
function addPagination(container, data, itemsPerPage) {
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination";

  const totalPages = Math.ceil(data.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      updateTableContent(currentPage, itemsPerPage);
    });
    paginationContainer.appendChild(pageButton);
  }

  container.appendChild(paginationContainer);
}

// Функция изменения индикатора сортировки
function updateSortIndicators(column, direction) {
  const indicators = document.querySelectorAll(".sort-indicator");
  indicators.forEach((indicator) => {
    if (indicator.parentNode.textContent.trim().startsWith(column)) {
      indicator.innerHTML = direction === "ascending" ? "&#x2191;" : "&#x2193;";
    } else {
      indicator.innerHTML = "&#x2195;";
    }
  });
}
