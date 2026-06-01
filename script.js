
const imagesData = [

    // Природа
    {
        id: 1,
        title: "Лесное озеро",
        description: "Красивый пейзаж с озером и лесом.",
        date: "12 мая 2025",
        category: "nature",
        tags: ["природа", "озеро"],
        image: "https://images.pexels.com/photos/158607/forest-trees-path-sunlight-158607.jpeg",
        alt: "Лесное озеро",
        likes: 0,
        liked: false
    },
    // Город
    {
        id: 2,
        title: "Ночной город",
        description: "Панорама мегаполиса ночью.",
        date: "18 июня 2025",
        category: "city",
        tags: ["город", "ночь"],
        image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg",
        alt: "Ночной город",
        likes: 0,
        liked: false
    },
    // Животные
    {
        id: 3,
        title: "Рыжая лиса",
        description: "Лиса в естественной среде обитания.",
        date: "22 сентября 2025",
        category: "animals",
        tags: ["лиса", "животные"],
        image: "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg",
        alt: "Рыжая лиса",
        likes: 0,
        liked: false
    }
];
];

// Глобальные переменные
let currentFilter = "all";
let currentView = "grid";   // "grid" или "list"
let totalLikesGlobal = 0;

// ========== ФУНКЦИЯ ОТРИСОВКИ ГАЛЕРЕИ ==========
function renderGallery() {
    const galleryContainer = document.getElementById("image-gallery");
    if (!galleryContainer) return;
    
    // Фильтруем изображения по выбранной категории
    let filteredImages = imagesData;
    if (currentFilter !== "all") {
        filteredImages = imagesData.filter(img => img.category === currentFilter);
    }
    
    // Обновляем счётчик количества изображений
    const imageCounterSpan = document.getElementById("image-counter");
    if (imageCounterSpan) {
        imageCounterSpan.textContent = filteredImages.length;
    }
    
    // Создаём HTML для каждой карточки
    let galleryHTML = "";
    
    filteredImages.forEach(image => {
        // Определяем, лайкнут ли уже этот элемент (сохраняем состояние из объекта)
        const likedClass = image.liked ? "liked" : "";
        const heartIconClass = image.liked ? "fas fa-heart" : "far fa-heart";
        
        galleryHTML += `
            <article class="image-card ${currentView === "list" ? "list-card" : ""}" data-category="${image.category}" data-id="${image.id}">
                <div class="card-image">
                    <img src="${image.image}" 
                         alt="${image.alt}"
                         class="gallery-img"
                         loading="lazy"
                         onerror="this.src='https://placehold.co/400x300?text=Image+Not+Found'">
                    <div class="image-overlay">
                        <button class="like-btn ${likedClass}" data-id="${image.id}">
                            <i class="${heartIconClass}"></i>
                            <span class="like-count">${image.likes}</span>
                        </button>
                        <button class="zoom-btn" data-img="${image.image}">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="image-title">${image.title}</h3>
                    <p class="image-date"><i class="far fa-calendar"></i> ${image.date}</p>
                    <p class="image-description">${image.description}</p>
                    <div class="image-tags">
                        ${image.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
    });
    
    // Если нет изображений после фильтрации
    if (filteredImages.length === 0) {
        galleryHTML = `<div class="no-results">
            <i class="fas fa-search"></i>
            <p>Нет изображений в этой категории</p>
        </div>`;
    }
    
    galleryContainer.innerHTML = galleryHTML;
    
    // Переключаем класс для отображения (сетка или список)
    if (currentView === "list") {
        galleryContainer.classList.add("list-view");
    } else {
        galleryContainer.classList.remove("list-view");
    }
    
    // Обновляем общий счётчик лайков (пересчитываем из объектов)
    updateTotalLikesDisplay();
    
    // Перепривязываем обработчики к новым кнопкам
    attachLikeEventListeners();
    attachZoomEventListeners();
}

// ========== ОБНОВЛЕНИЕ ОБЩЕГО СЧЁТЧИКА ЛАЙКОВ ==========
function updateTotalLikesDisplay() {
    totalLikesGlobal = imagesData.reduce((sum, img) => sum + img.likes, 0);
    const totalLikesSpan = document.getElementById("total-likes");
    if (totalLikesSpan) {
        totalLikesSpan.textContent = totalLikesGlobal;
    }
}

// ========== ПРИВЯЗКА СОБЫТИЙ ДЛЯ КНОПОК ЛАЙКОВ ==========
function attachLikeEventListeners() {
    const likeButtons = document.querySelectorAll(".like-btn");
    
    likeButtons.forEach(button => {
        // Убираем старые обработчики, чтобы не было дублирования
        button.removeEventListener("click", handleLikeClick);
        button.addEventListener("click", handleLikeClick);
    });
}

// Обработчик клика по лайку
function handleLikeClick(event) {
    event.stopPropagation();
    const button = event.currentTarget;
    const imageId = parseInt(button.getAttribute("data-id"));
    
    // Находим изображение в массиве данных
    const image = imagesData.find(img => img.id === imageId);
    if (!image) return;
    
    // Проверяем, лайкнут ли уже
    if (image.liked) {
        // Убираем лайк
        image.likes--;
        image.liked = false;
        button.classList.remove("liked");
        // Меняем иконку на пустое сердечко
        const icon = button.querySelector("i");
        if (icon) {
            icon.className = "far fa-heart";
        }
    } else {
        // Добавляем лайк
        image.likes++;
        image.liked = true;
        button.classList.add("liked");
        const icon = button.querySelector("i");
        if (icon) {
            icon.className = "fas fa-heart";
        }
    }
    
    // Обновляем счётчик лайков на кнопке
    const likesSpan = button.querySelector(".like-count");
    if (likesSpan) {
        likesSpan.textContent = image.likes;
    }
    
    // Обновляем общий счётчик лайков
    updateTotalLikesDisplay();
    
    // Анимация нажатия
    button.style.transform = "scale(1.2)";
    setTimeout(() => {
        button.style.transform = "scale(1)";
    }, 200);
    
    console.log(`Изображение ${image.title}: лайков = ${image.likes}`);
}

// ========== ПРИВЯЗКА СОБЫТИЙ ДЛЯ КНОПОК УВЕЛИЧЕНИЯ (ZOOM) ==========
function attachZoomEventListeners() {
    const zoomButtons = document.querySelectorAll(".zoom-btn");
    
    zoomButtons.forEach(button => {
        button.removeEventListener("click", handleZoomClick);
        button.addEventListener("click", handleZoomClick);
    });
}

function handleZoomClick(event) {
    event.stopPropagation();
    const imgSrc = button.getAttribute("data-img");
    // Можно открыть в новом окне или показать модальное окно (упрощённый вариант)
    window.open(imgSrc, "_blank");
}

// ========== НАСТРОЙКА ФИЛЬТРОВ ==========
function setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Получаем значение фильтра
            const filterValue = btn.getAttribute("data-filter");
            currentFilter = filterValue;
            
            // Перерисовываем галерею
            renderGallery();
        });
    });
}

// ========== ПЕРЕКЛЮЧЕНИЕ ВИДА (СЕТКА / СПИСОК) ==========
function setupViewSwitcher() {
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    
    if (gridViewBtn) {
        gridViewBtn.addEventListener("click", () => {
            currentView = "grid";
            gridViewBtn.classList.add("active");
            listViewBtn.classList.remove("active");
            renderGallery();
        });
    }
    
    if (listViewBtn) {
        listViewBtn.addEventListener("click", () => {
            currentView = "list";
            listViewBtn.classList.add("active");
            gridViewBtn.classList.remove("active");
            renderGallery();
        });
    }
}

// ========== УСТАНОВКА ТЕКУЩЕГО ГОДА ==========
function setCurrentYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ========== ЗАГРУЗКА ПРИМЕРНЫХ ИЗОБРАЖЕНИЙ (ЗАГЛУШКИ ЕСЛИ ФАЙЛОВ НЕТ) ==========
// Эта функция проверяет, загрузились ли реальные изображения, 
// и при необходимости подставляет placeholder'ы (для удобства тестирования)
function setupImageFallbacks() {
    // Если изображения не найдены, браузер вызовет onerror, который уже прописан в теге img
    console.log("Галерея использует изображения из папки images/");
    console.log("Рекомендуемые названия файлов: forest-lake.jpg, night-city.jpg, waterfall.jpg, fox.jpg, modern-building.jpg, sunset-sea.jpg, panda.jpg, old-town.jpg");
}

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========
document.addEventListener("DOMContentLoaded", () => {
    console.log("Страница галереи загружена, запускаем JavaScript...");
    
    // Добавляем свойство liked в каждый объект (если ещё нет)
    imagesData.forEach(img => {
        if (img.liked === undefined) {
            img.liked = false;
        }
    });
    
    // Отрисовываем галерею
    renderGallery();
    
    // Настраиваем фильтры
    setupFilters();
    
    // Настраиваем переключение вида (сетка/список)
    setupViewSwitcher();
    
    // Устанавливаем текущий год в подвале
    setCurrentYear();
    
    // Настройка fallback'ов
    setupImageFallbacks();
    
    console.log("✅ Галерея готова! Лайки, фильтры и переключение вида работают.");
});
