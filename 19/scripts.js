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
const widgetContainer = document.querySelector(".widget");
const postsContainer = document.querySelector(".widget__posts");
let currentOffset = 0;

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
      console.log(response);
      if (response.response) {
        renderNewPosts(response.response.items);
        currentOffset += postsToLoad; // Обновляем смещение
      } else {
        console.error("Ошибка при загрузке постов:", response);
      }
      loadingInProgress = false;
      console.log("fetchPostsFromVK завершена");
    }
  );
}

// Рендеринг новых постов
function renderNewPosts(newPosts) {
  console.log("Начало рендеринга постов");

  newPosts.forEach((postData) => {
    const postElement = document.createElement("li");
    postElement.className = "widget__post post";
    let imgHTML = ``;
    if (postData.attachments && postData.attachments[0] && postData.attachments[0]["photo"]) {
      const optimalHeight = 450;
      let closestImage = postData.attachments[0]["photo"].sizes[0]; // Начальное изображение для сравнения

      postData.attachments[0]["photo"].sizes.forEach((imgSize) => {
        if (
          Math.abs(imgSize.height - optimalHeight) < Math.abs(closestImage.height - optimalHeight)
        ) {
          closestImage = imgSize; // Обновление ближайшего изображения
        }
      });

      imgHTML = `<img class="post__img" src="${closestImage.url}">`;
    }

    postElement.innerHTML = `
    <div class="post__date">${new Date(postData.date * 1000).toLocaleDateString()}</div>
    <div class="post__title">${postData.text}</div>
    ${imgHTML}`;
    postsContainer.append(postElement);
  });
  savePostsToCache(newPosts);
  console.log("Рендеринг постов завершен");
}

widgetContainer.addEventListener("scroll", () => {
  if (widgetContainer.scrollHeight - widgetContainer.scrollTop === widgetContainer.clientHeight) {
    fetchPostsFromVK();
  }
});

function savePostsToCache(newPosts) {
  try {
    console.log("Попытка сохранить новые посты в localStorage");
    // Попытка получить уже сохраненные посты из localStorage
    let cachedPosts = JSON.parse(localStorage.getItem("cachedPosts")) || [];
    console.log("Текущее количество сохраненных постов:", cachedPosts.length);
    // Объединение старых сохраненных постов с новыми постами
    const updatedPosts = [...cachedPosts, ...newPosts];
    localStorage.setItem("cachedPosts", JSON.stringify(updatedPosts));

    // Попытка сохранить обновленный массив постов в localStorage
    localStorage.setItem("cachedPosts", JSON.stringify(updatedPosts));
    console.log("Новые посты успешно добавлены, общее количество постов:", updatedPosts.length);
  } catch (e) {
    console.log("Ошибка при сохранении в localStorage:", e.message);

    // Если произошла ошибка (обычно это QuotaExceededError при переполнении localStorage)
    if (e.name === "QuotaExceededError") {
      console.log("LocalStorage переполнен, попытка удалить старые посты");

      // Повторная попытка получения и обработки сохраненных постов
      let cachedPosts = JSON.parse(localStorage.getItem("cachedPosts")) || [];
      while (cachedPosts.length > 0 && e.name === "QuotaExceededError") {
        try {
          // Удаляем самый старый пост (первый элемент массива) для освобождения места
          cachedPosts.shift();

          // Повторная попытка сохранить обновленный массив постов в localStorage
          console.log("Пост удален, попытка повторного сохранения");
          localStorage.setItem("cachedPosts", JSON.stringify([...cachedPosts, ...newPosts]));

          // Очищаем ошибку, если сохранение прошло успешно
          e = null;
          console.log("Сохранение прошло успешно");
        } catch (err) {
          // Если удаление одного поста не решило проблему, повторяем цикл
          e = err;
          console.log("Ошибка при повторном сохранении:", e.message);
        }
      }

      // Если после всех попыток ошибка все еще существует, выводим сообщение об ошибке
      if (e) {
        console.error("Не удалось сохранить посты после всех попыток: ", e);
      } else {
        console.log("Новые посты успешно сохранены после удаления старых");
      }
    }
  }
}

function initWidget() {
  // При инициализации виджета проверяем localStorage
  const cachedPosts = JSON.parse(localStorage.getItem("cachedPosts"));
  if (cachedPosts && cachedPosts.length > 0) {
    renderNewPosts(cachedPosts);
    // Обновляем смещение, чтобы загружать новые посты после последнего сохраненного
    currentOffset += cachedPosts.length;
  } else {
    fetchPostsFromVK();
  }
}

// Инициализация виджета
initWidget();
