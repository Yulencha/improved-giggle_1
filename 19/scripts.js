/*
Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много). 
Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки. 
При прокрутке содержимого виджета до конца должны подгружаться новые посты. Необходимо реализовать возможность 
кэширования уже загруженных данных: если пользователь закрыл страницу, а потом снова открыл ее, 
виджет должен отображать все загруженные ранее данные 
(новые данные должны подгружаться из учетом уже загруженных ранее).

При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.
*/

// https://oauth.vk.com/authorize?client_id=51794998&display=page&redirect_uri=https://yulencha.github.io/improved-giggle_1&scope=wall&response_type=token&v=5.131&state=123456

// Токен авторизации для взаимодействия с API VK
const authToken = window.location.hash.split("=")[1].split("&")[0];

// Элементы и переменные для работы виджета

const postsContainer = document.querySelector(".widget__posts");
let currentOffset = 0;
let cachedPosts = [];
let loadingInProgress = false;

// Функция для загрузки постов из VK API
function fetchPostsFromVK() {
  if (loadingInProgress) return;
  loadingInProgress = true;
  const postsToLoad = 5;

  VK.Api.call(
    "wall.get",
    {
      owner_id: -44148670,
      domain: "igor_knyazev_audobooks",
      count: postsToLoad,
      offset: currentOffset,
      access_token: authToken,
      v: 5.131,
    },
    function (response) {
      if (response.response) {
        renderNewPosts(response.response.items);
        currentOffset += postsToLoad;
        loadingInProgress = false;
        monitorLastPostForLoadingMore();
      }
    }
  );
}

// Рендеринг новых постов
function renderNewPosts(newPosts) {
  const postsHTML = newPosts
    .map(function (post) {
      console.log(post);
      const img =
        post.attachments[0] && post.attachments[0]["photo"]
          ? `<img class="post__img" src=${post.attachments[0]["photo"].sizes[7].url}`
          : "";
      return `
      <li class="widget__post post">
        <div class="post__date">${new Date(post.date * 1000).toLocaleDateString()}</div>
        <div class="post__title">${post.text}</div>
        ${img}
      </li>
    `;
    })
    .join("");

  postsContainer.insertAdjacentHTML("beforeend", postsHTML);
  cachedPosts = cachedPosts.concat(newPosts);
  savePostsData();
}

// Наблюдение за последним постом для подгрузки новых
function monitorLastPostForLoadingMore() {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        fetchPostsFromVK();
      }
    });
  });

  const lastPost = document.querySelector(".widget__post:last-child");
  if (lastPost) {
    observer.observe(lastPost);
  }
}

// Сохранение данных постов в localStorage
function savePostsData() {
  localStorage.setItem("cachedPosts", JSON.stringify(cachedPosts));
  localStorage.setItem("currentOffset", currentOffset);
  checkLocalStorageCapacity();
}

// Загрузка данных из кэша при перезагрузке страницы
function loadCachedData() {
  const storedPosts = localStorage.getItem("cachedPosts");
  const storedOffset = localStorage.getItem("currentOffset");

  if (storedPosts) {
    cachedPosts = JSON.parse(storedPosts);
    currentOffset = parseInt(storedOffset) || 0;
    renderNewPosts(cachedPosts);
  }
}

// Удаление старых данных при переполнении localStorage
function evictOldPosts() {
  const halfLength = Math.floor(cachedPosts.length / 2);
  cachedPosts.splice(0, halfLength);
  savePostsData();
}

// Проверка на переполнение localStorage
function checkLocalStorageCapacity() {
  const maxSize = 5000000; // Максимальный размер для localStorage
  if (JSON.stringify(cachedPosts).length > maxSize) {
    evictOldPosts();
  }
}

// Инициализация виджета
loadCachedData();
fetchPostsFromVK();
setInterval(checkLocalStorageCapacity, 1000);
