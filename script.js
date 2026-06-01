/**
 * ПРАКТИЧЕСКАЯ РАБОТА №3: ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ
 * CSS Grid + JavaScript (лайки, счётчики, фильтры, переключение вида)
 */

// ========== ДАННЫЕ ДЛЯ ГАЛЕРЕИ (6+ изображений) ==========
const imagesData = [
    {
        id: 1,
        title: "Лесное озеро",
        description: "Тихий рассвет на лесном озере, отражение сосен в воде создаёт атмосферу умиротворения.",
        date: "12 мая 2025",
        category: "nature",
        tags: ["природа", "озеро", "рассвет"],
        image: "images/forest-lake.jpg",
        alt: "Лесное озеро на рассвете, отражение деревьев в воде",
        likes: 0
    },
    {
        id: 2,
        title: "Ночной мегаполис",
        description: "Панорама ночного города с небоскрёбами и миллионами огней. Снимок сделан со смотровой площадки.",
        date: "18 июня 2025",
        category: "city",
        tags: ["город", "ночь", "огни"],
        image: "images/night-city.jpg",
        alt: "Ночной город с яркими огнями и небоскрёбами",
        likes: 0
    },
    {
        id: 3,
        title: "Горный водопад",
        description: "Мощный поток воды среди скал. Звуки природы и свежесть горного воздуха.",
        date: "03 марта 2025",
        category: "nature",
        tags: ["водопад", "горы", "природа"],
        image: "images/waterfall.jpg",
        alt: "Живописный водопад в горах",
        likes: 0
    },
    {
        id: 4,
        title: "Лиса в лесу",
        description: "Рыжая лисица выглядывает из-за дерева. Удивительная встреча в дикой природе.",
        date: "22 сентября 2025",
        category: "animals",
        tags: ["лиса", "животные", "лес"],
        image: "images/fox.jpg",
        alt: "Рыжая лиса в осеннем лесу",
        likes: 0
    },
    {
        id: 5,
        title: "Архитектура будущего",
        description: "Современное здание с необычными формами и стеклянными фасадами.",
        date: "05 ноября 2025",
        category: "city",
        tags: ["архитектура", "современный", "город"],
        image: "images/modern-building.jpg",
        alt: "Футуристическое здание из стекла и бетона",
        likes: 0
    },
    {
        id: 6,
        title: "Морской закат",
        description: "Солнце медленно опускается за горизонт, окрашивая небо и море в оранжевые тона.",
        date: "30 июля 2025",
        category: "nature",
        tags: ["море", "закат", "пляж"],
        image: "images/sunset-sea.jpg",
        alt: "Красивый закат над морем",
        likes: 0
    },
    {
        id: 7,
        title: "Панда в зоопарке",
        description: "Милый медведь панда лениво жуёт бамбук. Эти животные находятся под охраной.",
        date: "14 декабря 2025",
        category: "animals",
        tags: ["панда", "животные", "милота"],
        image: "images/panda.jpg",
        alt: "Большая панда ест бамбук",
        likes: 0
    },
    {
        id: 8,
        title: "Старый город",
        description: "Узкие улочки европейского города с историческими зданиями и брусчаткой.",
        date: "09 апреля 2025",
        category: "city",
        tags: ["история", "улицы", "Европа"],
        image: "images/old-town.jpg",
        alt: "Старинная улочка с каменными зданиями",
        likes: 0
    }
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
