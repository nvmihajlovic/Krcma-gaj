// ================================
// Честице - визуелни ефекат
// ================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
        console.warn('Честице контејнер није пронађен');
        return;
    }
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ================================
// Ефекат куцања текста у Hero секцији
// ================================
const typingText = document.querySelector('.typing-text');
window.typingInterval = null;
window.isTyping = false;
window.currentTypingElement = null;

window.startTypingEffect = function(element, delay = 1000) {
    if (!element) return;
    
    // Очисти постојеће интервале и timeout-ове
    if (window.typingInterval) {
        clearTimeout(window.typingInterval);
        window.typingInterval = null;
    }
    
    // Ресетуј претходно стање куцања текста
    window.isTyping = false;
    
    // Узми текст који треба да се прикаже
    const text = element.getAttribute('data-text');
    if (!text) {
        return;
    }
    
    // Комплетан reset елемента
    element.innerHTML = '';
    element.textContent = '';
    element.style.borderRight = '3px solid';
    element.style.opacity = '1';
    
    window.currentTypingElement = element;
    
    let index = 0;
    
    function typeWriter() {
        if (!window.isTyping || window.currentTypingElement !== element) {
            return;
        }
        
        if (index < text.length) {
            // Комплетна замена садржаја сваки пут
            element.innerHTML = '';
            element.textContent = text.substring(0, index + 1);
            index++;
            window.typingInterval = setTimeout(typeWriter, 150);
        } else {
            setTimeout(() => {
                if (element.style) {
                    element.style.borderRight = 'none';
                }
                window.isTyping = false;
                window.currentTypingElement = null;
            }, 500);
        }
    }
    
    setTimeout(() => {
        window.isTyping = true;
        typeWriter();
    }, delay);
}

if (typingText) {
    startTypingEffect(typingText, 1000);
}

// ================================
// Restaurant Guru искачући прозор
// ================================
const guruPopup = document.getElementById('guru-popup');
const guruPopupClose = document.getElementById('guru-popup-close');

if (guruPopup && guruPopupClose) {
    // Прикажи прозор након 2 секунде
    setTimeout(() => {
        guruPopup.classList.add('show');
    }, 2000);

    // Аутоматски сакриј након 5 секунди (укупно 7 секунди од учитавања)
    setTimeout(() => {
        guruPopup.classList.remove('show');
    }, 7000);

    // Дугме за затварање
    guruPopupClose.addEventListener('click', () => {
        guruPopup.classList.remove('show');
    });

    // Затвори при клику ван прозора
    guruPopup.addEventListener('click', (e) => {
        if (e.target === guruPopup) {
            guruPopup.classList.remove('show');
        }
    });
}

// ================================
// Пребацивање теме - Лето/Зима
// ================================
const themeToggle = document.getElementById('theme-toggle');
const themeSuggestion = document.getElementById('theme-suggestion');
const themeSuggestionText = document.getElementById('theme-suggestion-text');

console.log('Theme toggle:', themeToggle);
console.log('Theme suggestion element:', themeSuggestion);
console.log('Theme suggestion text:', themeSuggestionText);

// Провери сачувану тему или користи летњу као подразумевану
const currentTheme = localStorage.getItem('theme') || 'summer';
const hasSeenSuggestion = localStorage.getItem('themeToggleSeen');

console.log('Current theme:', currentTheme);
console.log('Has seen suggestion:', hasSeenSuggestion);

if (currentTheme === 'winter') {
    document.documentElement.classList.add('winter-theme');
    document.body.classList.add('winter-theme');
}

// Прикажи предлог само први пут (ако тема није мењана раније)
if (!hasSeenSuggestion && themeSuggestion && themeSuggestionText) {
    console.log('Will show theme suggestion popup');
    setTimeout(() => {
        // Постави текст на основу тренутне теме
        if (currentTheme === 'winter') {
            themeSuggestionText.textContent = 'Провери и нашу летњу тему!';
        } else {
            themeSuggestionText.textContent = 'Провери и нашу зимску тему!';
        }
        
        themeSuggestion.classList.add('show');
        console.log('Theme suggestion popup shown');
        
        // Пусти пријатан звук обавештења
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Пријатан звук обавештења - две ноте
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            
            // Друга нота
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.value = 800;
                osc2.type = 'sine';
                gain2.gain.setValueAtTime(0.15, audioContext.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                osc2.start(audioContext.currentTime);
                osc2.stop(audioContext.currentTime + 0.3);
            }, 100);
        } catch (e) {
            console.log('Audio not supported:', e);
        }
        
        // Сакриј након 5 секунди
        setTimeout(() => {
            themeSuggestion.classList.remove('show');
        }, 5000);
    }, 2000);
}

// Промена теме
themeToggle.addEventListener('click', () => {
    // Пусти пријатан звук клика користећи Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Пријатан "поп" звук - кратак синусни талас
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio not supported:', e);
    }
    
    // Означи да је корисник видео и интеракцију са променом теме
    localStorage.setItem('themeToggleSeen', 'true');
    
    // Сакриј предлог ако је видљив
    if (themeSuggestion) {
        themeSuggestion.classList.remove('show');
    }
    document.documentElement.classList.toggle('winter-theme');
    document.body.classList.toggle('winter-theme');
    
    // Сачувај преференцу
    const theme = document.body.classList.contains('winter-theme') ? 'winter' : 'summer';
    localStorage.setItem('theme', theme);
    
    // Додај малу bounce анимацију при клику
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 150);
});

// ================================
// Промена језика - Српски/Енглески
// ================================
const languageToggle = document.getElementById('language-toggle');
const langText = document.querySelector('.lang-text');

// Провери сачувани језик или користи српски као подразумевани
const currentLang = localStorage.getItem('language') || 'sr';
if (currentLang === 'en') {
    document.body.classList.add('lang-en');
}

// Промена језика
languageToggle.addEventListener('click', () => {
    document.body.classList.toggle('lang-en');
    
    // Ажурирај језик и преведи страницу
    if (document.body.classList.contains('lang-en')) {
        localStorage.setItem('language', 'en');
        translatePage('en');
        console.log('Switched to English');
    } else {
        localStorage.setItem('language', 'sr');
        translatePage('sr');
        console.log('Switched to Serbian');
    }
    
    // Додај bounce анимацију
    languageToggle.style.transform = 'scale(0.9) rotate(15deg)';
    setTimeout(() => {
        languageToggle.style.transform = '';
    }, 150);
});

// Примени сачувани језик при учитавању странице
if (currentLang === 'en') {
    translatePage('en');
}

// ================================
// Плутајуће дугме за контакт - приказ само у Hero секцији
// ================================
const floatingContact = document.getElementById('floating-contact');
const backToTop = document.getElementById('back-to-top');
const heroSection = document.getElementById('pocetna');

console.log('Floating contact button:', floatingContact);
console.log('Back to top button:', backToTop);
console.log('Hero section:', heroSection);

if (floatingContact && heroSection && backToTop) {
    // Почетно сакриј оба дугмета
    floatingContact.classList.remove('visible');
    backToTop.classList.remove('visible');
    
    // Прикажи/сакриј дугмад на основу видљивости hero секције
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-100px 0px 0px 0px'
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('Hero intersecting:', entry.isIntersecting);
            console.log('Intersection ratio:', entry.intersectionRatio);
            
            if (entry.isIntersecting) {
                console.log('Showing contact, hiding back-to-top');
                floatingContact.classList.add('visible');
                backToTop.classList.remove('visible');
            } else {
                console.log('Hiding contact, showing back-to-top');
                floatingContact.classList.remove('visible');
                backToTop.classList.add('visible');
            }
        });
    }, observerOptions);

    heroObserver.observe(heroSection);
    
    // Скролуј до контакт секције при клику
    floatingContact.addEventListener('click', () => {
        const contactSection = document.getElementById('kontakt');
        if (contactSection) {
            const targetPosition = contactSection.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1200;
            let start = null;

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }
    });
}

// Функционалност повратка на врх странице
if (backToTop) {
    backToTop.addEventListener('click', () => {
        const startPosition = window.pageYOffset;
        const distance = -startPosition;
        const duration = 1000;
        let start = null;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });
}

// ================================
// Модал за резервацију (чува се за будућу употребу)
// ================================
const reservationModal = document.getElementById('reservation-modal');
if (reservationModal) {
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = reservationModal.querySelector('.modal-overlay');

    function closeReservationModal() {
        reservationModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeReservationModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeReservationModal);
}

// Обрада формулара за резервацију
const reservationForm = document.getElementById('reservation-form');
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('res-name').value,
        phone: document.getElementById('res-phone').value,
        date: document.getElementById('res-date').value,
        time: document.getElementById('res-time').value,
        guests: document.getElementById('res-guests').value,
        occasion: document.getElementById('res-occasion').value,
        note: document.getElementById('res-note').value
    };
    
    console.log('Reservation:', formData);
    showNotification('Ваша резервација је успешно примљена! Контактираћемо вас ускоро.', 'success');
    reservationForm.reset();
    closeReservationModal();
});

// Постави минимални датум на данашњи
document.getElementById('res-date').min = new Date().toISOString().split('T')[0];

// ================================
// Учитавање Google рецензија
// ================================
function loadGoogleReviews() {
    const placeId = 'ChIJYRQqGd8GWEQR5JTHGK7X0R0'; // Krčma Gaj Place ID - ZAMENI SA PRAVIM
    
    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);
    
    service.getDetails({
        placeId: placeId,
        fields: ['reviews', 'rating', 'user_ratings_total']
    }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            displayReviews(place.reviews);
        } else {
            console.error('Error loading reviews:', status);
            // Користи демо рецензије ако API не ради
            loadDemoReviews();
        }
    });
}

function displayReviews(reviews) {
    const wrapper = document.querySelector('.testimonials-wrapper');
    const dotsContainer = document.querySelector('.slider-dots');
    
    wrapper.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Сортирај по оцени (највише прво) и узми топ 5
    const topReviews = reviews
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
    
    topReviews.forEach((review, index) => {
        // Креирај картицу са рецензијом
        const card = document.createElement('div');
        card.className = `testimonial-card ${index === 0 ? 'active' : ''}`;
        
        // Генериши звездице за оцену
        const stars = Array(5).fill(0).map((_, i) => 
            `<i class="fas fa-star${i < review.rating ? '' : ' inactive'}"></i>`
        ).join('');
        
        // Форматирај датум
        const reviewDate = new Date(review.time * 1000);
        const timeAgo = getTimeAgo(reviewDate);
        
        card.innerHTML = `
            <div class="testimonial-rating">${stars}</div>
            <p class="testimonial-text">"${review.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <img src="${review.profile_photo_url || 'https://via.placeholder.com/100'}" 
                         alt="${review.author_name}"
                         onerror="this.src='https://via.placeholder.com/100'">
                </div>
                <div class="author-info">
                    <h4>${review.author_name}</h4>
                    <span>${timeAgo}</span>
                </div>
            </div>
            <div class="google-badge">
                <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="Google">
                <span>Рецензија</span>
            </div>
        `;
        
        wrapper.appendChild(card);
        
        // Креирај тачку за навигацију
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', index);
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
        dotsContainer.appendChild(dot);
    });
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' година' + (Math.floor(interval) > 1 ? '' : '') + ' раније';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' месец' + (Math.floor(interval) > 1 ? 'и' : '') + ' раније';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' дан' + (Math.floor(interval) > 1 ? 'а' : '') + ' раније';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' сат' + (Math.floor(interval) > 1 ? 'и' : '') + ' раније';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' минут' + (Math.floor(interval) > 1 ? 'а' : '') + ' раније';
    
    return Math.floor(seconds) + ' секунд' + (Math.floor(seconds) > 1 ? 'и' : 'у') + ' раније';
}

function loadDemoReviews() {
    // Демо рецензије ако API не ради
    const demoReviews = [
        {
            rating: 5,
            text: "Невероватно искуство! Храна је фантастична, а поглед на Чиготу је једноставно спектакуларан. Качамак са кајмаком је најбољи који сам икада пробао.",
            author_name: "Марко Петровић",
            profile_photo_url: "https://i.pravatar.cc/100?img=1",
            time: Date.now() / 1000 - 86400 * 7
        },
        {
            rating: 5,
            text: "Савршено место за породични ручак. Деца су била одушевљена игралиштем, а ми смо уживали у традиционалној храни и прелепој атмосфери.",
            author_name: "Ана Јовановић",
            profile_photo_url: "https://i.pravatar.cc/100?img=5",
            time: Date.now() / 1000 - 86400 * 14
        },
        {
            rating: 5,
            text: "Аутентично искуство злаборске гастрономије. Сви састојци су свежи и домаћи. Пита од хељде је нешто посебно.",
            author_name: "Немања Стојковић",
            profile_photo_url: "https://i.pravatar.cc/100?img=12",
            time: Date.now() / 1000 - 86400 * 21
        }
    ];
    
    displayReviews(demoReviews);
}

// Иницијализуј Google рецензије када се API учита
if (typeof google !== 'undefined') {
    google.maps.event.addDomListener(window, 'load', loadGoogleReviews);
} else {
    // Ако Google API није учитан, користи демо рецензије
    window.addEventListener('load', loadDemoReviews);
}

// ================================
// Клизач рецензија
// ================================
let currentSlide = 0;
let autoPlayInterval;

function showSlide(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialCards.length === 0) return;
    
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next');
        if (i === index) {
            card.classList.add('active');
        } else if (i === index - 1 || (index === 0 && i === testimonialCards.length - 1)) {
            card.classList.add('prev');
        } else if (i === index + 1 || (index === testimonialCards.length - 1 && i === 0)) {
            card.classList.add('next');
        }
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;
    
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
}

function prevSlide() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;
    
    currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    showSlide(currentSlide);
}

function initializeSlider() {
    const sliderNext = document.querySelector('.slider-next');
    const sliderPrev = document.querySelector('.slider-prev');
    
    if (sliderNext && sliderPrev) {
        sliderNext.addEventListener('click', nextSlide);
        sliderPrev.addEventListener('click', prevSlide);
        
        // Аутоматско пуштање рецензија
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
}

// Иницијализуј клизач након учитавања рецензија
setTimeout(initializeSlider, 1000);

// ================================
// Ефекат скроловања навигације
// ================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================================
// Мобилни мени - пребацивање
// ================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('navOverlay');

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
    
    // Пусти звук
    if (isActive) {
        playSound(700, 0.1, 'sine', 0.1);
    } else {
        playSound(600, 0.1, 'sine', 0.1);
    }
});

// Затвори мени при клику на overlay
navOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
    playSound(600, 0.1, 'sine', 0.1);
});

// Затвори мени при клику на линк
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        playSound(650, 0.1, 'sine', 0.1);
    });
});

// ================================
// Активни линк у навигацији при скроловању
// ================================
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ================================
// Глатко скроловање са убрзањем/успоравањем
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const targetPosition = target.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1200; // 1.2 секунде за елегантну трanzицију
                let start = null;

                // Easing функција за глатко убрзање и успоравање
                function easeInOutCubic(t) {
                    return t < 0.5
                        ? 4 * t * t * t
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        }
    });
});

// ================================
// Анимација бројача
// ================================
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 секунде
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 10000 ? '+' : '');
            }
        };

        updateCounter();
    });
}

// Покрени анимацију бројача када је about секција видљива
const aboutSection = document.querySelector('.about');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            animateCounters();
            counterAnimated = true;
        }
    });
}, observerOptions);

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// ================================
// Филтер функционалност за мени
// ================================
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Уклони active класу са свих дугмади
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Додај active класу на кликнуто дугме
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        menuItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `slideUp 0.6s ease forwards ${index * 0.05}s`;
                }, 10);
            } else {
                item.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Додај scroll анимацију за ставке менија при првом учитавању
const menuObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            entry.target.classList.add('menu-item-visible');
            menuObserver.unobserve(entry.target);
        }
    });
}, menuObserverOptions);

menuItems.forEach(item => {
    item.style.opacity = '0';
    menuObserver.observe(item);
});

// ================================
// Филтер функционалност за пића
// ================================
const drinksFilterButtons = document.querySelectorAll('.drinks-filter-btn');
const drinksCategories = document.querySelectorAll('.drinks-category');

drinksFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Уклони active класу са свих дугмади
        drinksFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Додај active класу на кликнуто дугме
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        drinksCategories.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `slideUp 0.6s ease forwards ${index * 0.05}s`;
                }, 10);
            } else {
                item.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Додај scroll анимацију за категорије пића при првом учитавању
const drinksObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const drinksObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            entry.target.classList.add('drinks-visible');
            drinksObserver.unobserve(entry.target);
        }
    });
}, drinksObserverOptions);

drinksCategories.forEach(item => {
    item.style.opacity = '0';
    drinksObserver.observe(item);
});

// ================================
// Lightbox за галерију
// ================================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    lightboxImage.src = galleryImages[currentImageIndex];
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Затвори lightbox при клику на позадину
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Навигација тастатуром за lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    }
});

// ================================
// Обрада контакт формулара
// ================================
const contactForm = document.getElementById('contact-form');

// Провери да ли је порука успешно послата (FormSubmit редирекција)
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    
    if (hash === '#message-sent') {
        // Успешно послата порука
        showToast(
            'success',
            'Порука успешно послата!',
            'Хвала вам! Ваша порука је примљена. Одговорићемо вам у најкраћем могућем року.',
            'У реду'
        );
        // Уклони hash из URL-а
        history.replaceState(null, null, ' ');
    } else if (hash === '#message-error') {
        // Грешка при слању
        showToast(
            'error',
            'Грешка при слању',
            'Дошло је до проблема при слању поруке. Молимо покушајте поново или нас контактирајте директно.',
            'Покушај поново'
        );
        // Уклони hash из URL-а
        history.replaceState(null, null, ' ');
    }
});

// Додај визуелни feedback при submit-у
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // НЕ позивамо e.preventDefault() - пуштамо FormSubmit да ради
        
        // Прикажи loading стање на дугмету
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Шаљем...</span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        }
    });
}

// ================================
// Професионалне Toast Нотификације
// ================================
function showToast(type, title, message, actionText = null) {
    // Уклони постојећу нотификацију ако постоји
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Икона на основу типа
    const icon = type === 'success' 
        ? '<i class="fas fa-check-circle"></i>' 
        : '<i class="fas fa-exclamation-circle"></i>';

    // Креирај toast елемент
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.closest('.toast-notification').classList.add('hide')">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
        ${actionText ? `
        <div class="toast-action">
            <button class="toast-action-btn" onclick="window.location.href='#kontakt'; this.closest('.toast-notification').classList.add('hide')">
                ${actionText}
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        ` : ''}
    `;

    document.body.appendChild(toast);

    // Покажи toast са анимацијом
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Пусти звук обавештења
    playNotificationSound(type);

    // Аутоматски сакриј након 5 секунди
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

// Звук обавештења
function playNotificationSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'success') {
            // Весели звук за успех (два тона)
            oscillator.frequency.value = 523.25; // C5
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            
            // Други тон
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.value = 659.25; // E5
                gain2.gain.setValueAtTime(0.1, audioContext.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                osc2.start(audioContext.currentTime);
                osc2.stop(audioContext.currentTime + 0.2);
            }, 80);
        } else {
            // Дискретан звук за грешку
            oscillator.frequency.value = 329.63; // E4
            gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.25);
        }
    } catch (e) {
        console.log('Audio not supported:', e);
    }
}

// Функција за обавештења
function showNotification(message, type = 'success') {
    // Уклони постојеће обавештење ако постоји
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Креирај елемент за обавештење
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стилизуј обавештење
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '16px 24px',
        background: type === 'success' ? '#4caf50' : '#f44336',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.5s ease',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Уклони обавештење након 5 секунди
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Додај анимације за обавештења
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================
// Scroll анимације
// ================================
const animatedElements = document.querySelectorAll('.menu-item, .drinks-category, .gallery-item, .feature-card, .contact-item, .about-card');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(element);
});

// ================================
// Parallax ефекат за Hero секцију
// ================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ================================
// ================================
// Ripple ефекат на дугмадима
// ================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Додај ripple стилове
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ================================
// Анимација учитавања (опционо)
// ================================
window.addEventListener('load', () => {
    // Додај loaded класу body-ју за додатне анимације
    document.body.classList.add('loaded');
    
    // Сакриј loading spinner ако га имаш
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
});

// ================================
// 3D Tilt ефекат на картицама
// ================================
document.querySelectorAll('.menu-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ================================
// Lazy loading за слике
// ================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// Иницијализација при учитавању DOM-а
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Крчма Гај website loaded successfully! 🍽️');
    
    // Постави транзиције за ставке менија
    menuItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});

// ================================
// Оптимизација перформанси
// ================================
// Debounce функција за scroll евенте
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Примени debounce на scroll-интензивне функције
window.addEventListener('scroll', debounce(() => {
    setActiveNavLink();
}, 10));

/* ================================
   САГЛАСНОСТ ЗА COOKIE-ЈЕ
   ================================ */
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieModal = document.getElementById('cookieModal');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    const settingsBtn = document.getElementById('cookieSettings');
    const closeModalBtn = document.getElementById('closeModal');
    const saveSettingsBtn = document.getElementById('saveCookieSettings');
    
    // Провери да ли је корисник већ направио избор
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Прикажи сагласност након 1.5 секунди
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1500);
    }
    
    // Отвори модал за cookie подешавања
    settingsBtn.addEventListener('click', () => {
        cookieModal.classList.add('show');
        
        // Пусти звук ако audio context постоји
        if (audioContext) {
            playSound(700, 0.1, 'sine');
        }
    });
    
    // Затвори модал
    closeModalBtn.addEventListener('click', () => {
        cookieModal.classList.remove('show');
    });
    
    // Затвори модал при клику ван њега
    cookieModal.addEventListener('click', (e) => {
        if (e.target === cookieModal) {
            cookieModal.classList.remove('show');
        }
    });
    
    // Прихвати све cookie-је
    acceptBtn.addEventListener('click', () => {
        const settings = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('cookieSettings', JSON.stringify(settings));
        cookieConsent.classList.remove('show');
        
        // Play sound if audio context exists
        if (audioContext) {
            playSound(800, 0.1, 'sine');
        }
        
        console.log('All cookies accepted', settings);
    });
    
    // Одбиј све cookie-је
    declineBtn.addEventListener('click', () => {
        const settings = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        
        localStorage.setItem('cookieConsent', 'declined');
        localStorage.setItem('cookieSettings', JSON.stringify(settings));
        cookieConsent.classList.remove('show');
        cookieModal.classList.remove('show');
        
        // Play sound if audio context exists
        if (audioContext) {
            playSound(600, 0.1, 'sine');
        }
        
        console.log('Cookies declined', settings);
    });
    
    // Сачувај прилагођена cookie подешавања
    saveSettingsBtn.addEventListener('click', () => {
        const analyticsCheck = document.getElementById('analyticsCheck');
        const marketingCheck = document.getElementById('marketingCheck');
        
        const settings = {
            necessary: true,
            analytics: analyticsCheck.checked,
            marketing: marketingCheck.checked
        };
        
        localStorage.setItem('cookieConsent', 'custom');
        localStorage.setItem('cookieSettings', JSON.stringify(settings));
        cookieConsent.classList.remove('show');
        cookieModal.classList.remove('show');
        
        // Play sound if audio context exists
        if (audioContext) {
            playSound(800, 0.1, 'sine');
        }
        
        console.log('Cookie settings saved', settings);
    });
}

// Иницијализуј сагласност за cookie-је
initCookieConsent();

// ================================
// Scroll Reveal анимација
// ================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Прати елементе - само картице и галерију, НЕ header
    const elementsToReveal = document.querySelectorAll(`
        .menu-item,
        .drinks-category,
        .gallery-item,
        .about-feature-card
    `);

    elementsToReveal.forEach((el, index) => {
        // Мањи delay - брже анимације
        el.style.animationDelay = `${index * 0.03}s`;
        observer.observe(el);
    });
    
    // Section header-и и testimonial-и су ОДМАХ видљиви
    const alwaysVisible = document.querySelectorAll('.section-header, .testimonial-card, .footer-column');
    alwaysVisible.forEach(el => {
        el.style.opacity = '1';
    });
}

// Иницијализуј при учитавању
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
    initScrollReveal();
}

// ================================
// PREMIUM WEATHER POPUP
// ================================
const WEATHER_API_KEY = 'a85d65046cf834c88004709546da8315';
const ZLATIBOR_COORDS = { lat: 43.7317, lon: 19.7144 };

// Weather widget deactivated per user request
// setTimeout(() => {
//     showWeatherPopup();
// }, 20000);

async function showWeatherPopup() {
    // Креирај overlay и popup
    const overlay = document.createElement('div');
    overlay.className = 'weather-overlay';
    overlay.innerHTML = `
        <div class="weather-popup">
            <div class="weather-loading">
                <div class="weather-spinner"></div>
                <div class="weather-loading-text">Учитавам податке о времену...</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Покажи overlay са анимацијом
    setTimeout(() => overlay.classList.add('show'), 100);
    
    try {
        // Fetch weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ZLATIBOR_COORDS.lat}&lon=${ZLATIBOR_COORDS.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=sr`);
        const weatherData = await weatherResponse.json();
        
        // Проверимо да ли је API вратио грешку
        if (weatherData.cod && weatherData.cod !== 200) {
            console.error('Weather API error:', weatherData);
            renderWeatherError(overlay);
            return;
        }
        
        const airResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${ZLATIBOR_COORDS.lat}&lon=${ZLATIBOR_COORDS.lon}&appid=${WEATHER_API_KEY}`);
        const airData = await airResponse.json();
        
        // Рендерујмо податке
        renderWeatherPopup(overlay, weatherData, airData);
        
    } catch (error) {
        console.error('Weather API error:', error);
        renderWeatherError(overlay);
    }
}

function renderWeatherPopup(overlay, weather, airData) {
    const popup = overlay.querySelector('.weather-popup');
    
    // Мапирање weather иконица
    const weatherIcons = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    
    const icon = weatherIcons[weather.weather[0].icon] || '🌤️';
    const temp = Math.round(weather.main.temp);
    const feelsLike = Math.round(weather.main.feels_like);
    const description = weather.weather[0].description;
    const minTemp = Math.round(weather.main.temp_min);
    const maxTemp = Math.round(weather.main.temp_max);
    const humidity = weather.main.humidity;
    const pressure = weather.main.pressure;
    const windSpeed = Math.round(weather.wind.speed * 3.6); // m/s to km/h
    const aqi = airData?.list?.[0]?.main?.aqi || 1;
    
    // AQI badge
    const aqiLabels = {
        1: { text: 'Одличан', class: 'good' },
        2: { text: 'Добар', class: 'good' },
        3: { text: 'Умерен', class: 'moderate' },
        4: { text: 'Лош', class: 'high' },
        5: { text: 'Веома лош', class: 'high' }
    };
    const aqiBadge = aqiLabels[aqi] || aqiLabels[1];
    
    // UV индекс (mock - OpenWeather One Call API потребан за реалне податке)
    const uvIndex = Math.floor(Math.random() * 5) + 3; // Mock 3-7
    const uvBadge = uvIndex <= 5 ? { text: 'Умерен', class: 'moderate' } : { text: 'Висок', class: 'unhealthy' };
    
    // Полен (mock)
    const pollenLevel = Math.floor(Math.random() * 3) + 1; // Mock 1-3
    const pollenBadge = pollenLevel === 1 ? { text: 'Низак', class: 'good' } : 
                        pollenLevel === 2 ? { text: 'Умерен', class: 'moderate' } : 
                        { text: 'Висок', class: 'high' };
    
    // Формирај датум
    const now = new Date();
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateStr = now.toLocaleDateString('sr-RS', options);
    
    popup.innerHTML = `
        <button class="weather-close" onclick="closeWeatherPopup()">
            <i class="fas fa-times"></i>
        </button>
        
        <!-- Date Badge -->
        <div class="weather-date-badge">
            <i class="fas fa-calendar-alt"></i>
            <span>${dateStr} • Златибор, Србија</span>
        </div>
        
        <!-- Main Weather -->
        <div class="weather-main">
            <div class="weather-main-left">
                <div class="weather-icon-large">${icon}</div>
                <div class="weather-desc">${description}</div>
            </div>
            <div class="weather-temp">${temp}°</div>
        </div>
        
        <div class="weather-divider"></div>
        
        <!-- Stats Grid -->
        <div class="weather-stats">
            <div class="weather-stat">
                <div class="weather-stat-icon"><i class="fas fa-wind"></i></div>
                <div class="weather-stat-content">
                    <div class="weather-stat-value">${windSpeed} km/h</div>
                    <div class="weather-stat-label">Ветар</div>
                </div>
            </div>
            
            <div class="weather-stat">
                <div class="weather-stat-icon"><i class="fas fa-tint"></i></div>
                <div class="weather-stat-content">
                    <div class="weather-stat-value">${humidity}%</div>
                    <div class="weather-stat-label">Влажност</div>
                </div>
            </div>
            
            <div class="weather-stat">
                <div class="weather-stat-icon"><i class="fas fa-compress-arrows-alt"></i></div>
                <div class="weather-stat-content">
                    <div class="weather-stat-value">${pressure} hPa</div>
                    <div class="weather-stat-label">Притисак</div>
                </div>
            </div>
            
            <div class="weather-stat">
                <div class="weather-stat-icon"><i class="fas fa-smog"></i></div>
                <div class="weather-stat-content">
                    <div class="weather-stat-value">AQI ${aqi}</div>
                    <div class="weather-stat-label">Квалитет ваздуха</div>
                </div>
            </div>
        </div>
        
        <div class="weather-divider"></div>
        
        <!-- Health Section -->
        <div class="weather-health">
            <div class="weather-health-title">
                <i class="fas fa-heartbeat"></i>
                <span>Здравствене информације</span>
            </div>
            
            <div class="weather-health-grid">
                <div class="weather-health-item">
                    <div class="weather-health-icon"><i class="fas fa-seedling"></i></div>
                    <div class="weather-health-content">
                        <div class="weather-health-label">Ниво полена</div>
                        <div class="weather-health-value ${pollenBadge.class}">${pollenBadge.text}</div>
                    </div>
                </div>
                
                <div class="weather-health-item">
                    <div class="weather-health-icon"><i class="fas fa-sun"></i></div>
                    <div class="weather-health-content">
                        <div class="weather-health-label">UV индекс</div>
                        <div class="weather-health-value ${uvBadge.class}">${uvIndex} - ${uvBadge.text}</div>
                    </div>
                </div>
                
                <div class="weather-health-item">
                    <div class="weather-health-icon"><i class="fas fa-wind"></i></div>
                    <div class="weather-health-content">
                        <div class="weather-health-label">Квалитет ваздуха</div>
                        <div class="weather-health-value ${aqiBadge.class}">${aqiBadge.text}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Аутоматски затвори након 7 секунди
    setTimeout(() => {
        closeWeatherPopup();
    }, 7000);
}

function renderWeatherError(overlay) {
    const popup = overlay.querySelector('.weather-popup');
    popup.innerHTML = `
        <div class="weather-error">
            <div class="weather-error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="weather-error-text">
                Нисмо успели да учитамо податке о времену.<br>
                API key можда још није активан (чека 10-15 мин).
            </div>
            <button class="weather-close" onclick="closeWeatherPopup()" style="margin-top: 24px; position: static; background: rgba(15, 23, 42, 0.06); color: #64748b; border: none; padding: 12px 24px; border-radius: 12px; font-size: 0.95rem; cursor: pointer;">
                Затвори
            </button>
        </div>
    `;
}

// ================================
// HERO WEATHER WIDGET (JetElements style, theme-aware)
// ================================
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroWeatherWidget);
    } else {
        initHeroWeatherWidget();
    }

    async function initHeroWeatherWidget() {
        const mount = document.getElementById('hero-weather-widget');
        if (!mount) return;

        mount.innerHTML = skeleton();

        try {
            const [weatherRes, airRes] = await Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ZLATIBOR_COORDS.lat}&lon=${ZLATIBOR_COORDS.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=sr`),
                fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${ZLATIBOR_COORDS.lat}&lon=${ZLATIBOR_COORDS.lon}&appid=${WEATHER_API_KEY}`)
            ]);
            const weather = await weatherRes.json();
            const air = await airRes.json();

            if (!weather || (weather.cod && weather.cod !== 200)) {
                mount.innerHTML = errorBlock();
                return;
            }

            mount.innerHTML = renderHeroWeather(weather, air);
        } catch (e) {
            console.error('Hero weather error:', e);
            mount.innerHTML = errorBlock();
        }
    }

    function skeleton() {
        return `
            <div class="hw-card">
                <div class="hw-badge"><i class="fa-regular fa-calendar"></i> <span>Учитавам…</span></div>
                <div class="hw-main">
                    <div class="hw-main-left">
                        <div class="hw-icon"><i class="fas fa-cloud"></i></div>
                        <div class="hw-desc">—</div>
                    </div>
                    <div class="hw-temp">--°</div>
                </div>
                <div class="hw-div"></div>
                <div class="hw-stats">
                    <div class="hw-stat"><i class="fas fa-wind"></i><div><div class="hw-stat-value">—</div><div class="hw-stat-label">Ветар</div></div></div>
                    <div class="hw-stat"><i class="fas fa-tint"></i><div><div class="hw-stat-value">—</div><div class="hw-stat-label">Влажност</div></div></div>
                    <div class="hw-stat"><i class="fas fa-compress-arrows-alt"></i><div><div class="hw-stat-value">—</div><div class="hw-stat-label">Притисак</div></div></div>
                    <div class="hw-stat"><i class="fas fa-smog"></i><div><div class="hw-stat-value">—</div><div class="hw-stat-label">Квалитет ваздуха</div></div></div>
                </div>
                <div class="hw-health">
                    <div class="hw-health-title"><i class="fas fa-heartbeat"></i><span>Здравствене информације</span></div>
                    <div class="hw-health-list">
                        <div class="hw-health-item"><div class="hw-health-left"><i class="fas fa-seedling"></i><span>Ниво полена</span></div><div class="hw-badge-val">—</div></div>
                        <div class="hw-health-item"><div class="hw-health-left"><i class="fas fa-sun"></i><span>UV индекс</span></div><div class="hw-badge-val">—</div></div>
                        <div class="hw-health-item"><div class="hw-health-left"><i class="fas fa-wind"></i><span>Квалитет ваздуха</span></div><div class="hw-badge-val">—</div></div>
                    </div>
                </div>
            </div>`;
    }

    function renderHeroWeather(weatherData, airData) {
        const main = (weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main) || '';
        const desc = (weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description) || '';
        const temp = Math.round(weatherData.main?.temp ?? 0);
        const humidity = Math.round(weatherData.main?.humidity ?? 0);
        const pressure = Math.round(weatherData.main?.pressure ?? 0);
        const windSpeed = Math.round((weatherData.wind?.speed ?? 0) * 3.6); // m/s -> km/h
        const aqi = airData?.list?.[0]?.main?.aqi ?? 1;

        const aqiLabels = {
            1: { text: 'Одличан', class: 'good' },
            2: { text: 'Добар', class: 'good' },
            3: { text: 'Умерен', class: 'moderate' },
            4: { text: 'Лош', class: 'unhealthy' },
            5: { text: 'Веома лош', class: 'unhealthy' }
        };
        const aqiBadge = aqiLabels[aqi] || aqiLabels[1];

        // Mock UV & Pollen (replace with real providers if desired)
        const uvIndex = Math.floor(Math.random() * 5) + 3; // 3-7
        const uvBadge = uvIndex <= 5 ? { text: 'Умерен', class: 'moderate' } : { text: 'Висок', class: 'unhealthy' };
        const pollenLevel = Math.floor(Math.random() * 3) + 1; // 1-3
        const pollenBadge = pollenLevel === 1 ? { text: 'Низак', class: 'good' } : pollenLevel === 2 ? { text: 'Умерен', class: 'moderate' } : { text: 'Висок', class: 'unhealthy' };

        const iconClass = mapWeatherToIcon(main);
        const now = new Date();
        const dateStr = now.toLocaleDateString('sr-RS', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

        return `
            <div class="hw-card">
                <div class="hw-badge"><i class="fa-regular fa-calendar"></i> <span>${dateStr} • Златибор, Србија</span></div>
                <div class="hw-main">
                    <div class="hw-main-left">
                        <div class="hw-icon"><i class="${iconClass}"></i></div>
                        <div class="hw-desc">${capitalize(desc)}</div>
                    </div>
                    <div class="hw-temp">${temp}°</div>
                </div>
                <div class="hw-div"></div>
                <div class="hw-stats">
                    <div class="hw-stat"><i class="fas fa-wind"></i><div><div class="hw-stat-value">${windSpeed} km/h</div><div class="hw-stat-label">Ветар</div></div></div>
                    <div class="hw-stat"><i class="fas fa-tint"></i><div><div class="hw-stat-value">${humidity}%</div><div class="hw-stat-label">Влажност</div></div></div>
                    <div class="hw-stat"><i class="fas fa-compress-arrows-alt"></i><div><div class="hw-stat-value">${pressure} hPa</div><div class="hw-stat-label">Притисак</div></div></div>
                    <div class="hw-stat"><i class="fas fa-smog"></i><div><div class="hw-stat-value">AQI ${aqi}</div><div class="hw-stat-label">Квалитет ваздуха</div></div></div>
                </div>
                <div class="hw-health">
                    <div class="hw-health-title"><i class="fas fa-heartbeat"></i><span>Здравствене информације</span></div>
                    <div class="hw-health-list">
                        <div class="hw-health-item"><div class="hw-health-left"><i class="fas fa-seedling"></i><span>Ниво полена</span></div><div class="hw-badge-val ${pollenBadge.class}">${pollenBadge.text}</div></div>
                        <div class="hw-health-item"><div class="hw-health-left"><i class="fas fa-sun"></i><span>UV индекс</span></div><div class="hw-badge-val ${uvBadge.class}">${uvIndex} - ${uvBadge.text}</div></div>
                        <div class="hw-health-item"><div class="hw-health-left"><i class="fas fa-wind"></i><span>Квалитет ваздуха</span></div><div class="hw-badge-val ${aqiBadge.class}">${aqiBadge.text}</div></div>
                    </div>
                </div>
            </div>`;
    }

    function mapWeatherToIcon(main) {
        const m = (main || '').toLowerCase();
        if (m.includes('thunder')) return 'fas fa-bolt';
        if (m.includes('drizzle') || m.includes('rain')) return 'fas fa-cloud-showers-heavy';
        if (m.includes('snow')) return 'fas fa-snowflake';
        if (m.includes('clear')) return 'fas fa-sun';
        if (m.includes('cloud')) return 'fas fa-cloud';
        if (m.includes('mist') || m.includes('fog') || m.includes('haze') || m.includes('smoke')) return 'fas fa-smog';
        return 'fas fa-cloud-sun';
    }

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
})();

// Функција за затварање weather popup-а
function closeWeatherPopup() {
    const overlay = document.querySelector('.weather-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 600);
    }
}

// Затвори на клик изван popup-а
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('weather-overlay')) {
        closeWeatherPopup();
    }
});

