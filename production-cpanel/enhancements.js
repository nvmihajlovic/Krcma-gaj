// ================================
// UI/UX Enhancements - Advanced Features
// ================================

// ================================
// 1. Count-Up Animation for Statistics
// ================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    // Check if this counter has a plus sign
    const numberValue = element.querySelector('.number-value');
    const hasPlus = element.querySelector('.plus-sign');
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (numberValue) {
                numberValue.textContent = Math.floor(current);
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (numberValue) {
                numberValue.textContent = target;
            } else {
                element.textContent = target;
            }
        }
    };
    
    updateCounter();
}

// Initialize counters
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounters);
} else {
    animateCounters();
}

// ================================
// 2. Form Validation with Visual Feedback
// ================================
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation
    const validateField = (input, validationType) => {
        const value = input.value.trim();
        let isValid = true;
        let errorMsg = '';
        
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMsg = input.id === 'name' ? 'Име је обавезно' : 
                       input.id === 'email' ? 'Е-mail је обавезан' : 
                       'Порука је обавезна';
        } else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMsg = 'Унесите исправну е-mail адресу';
            }
        } else if (input.hasAttribute('minlength') && value.length < input.getAttribute('minlength')) {
            isValid = false;
            errorMsg = `Минимално ${input.getAttribute('minlength')} карактера`;
        }
        
        // Visual feedback
        if (value && isValid) {
            input.classList.remove('error');
            input.classList.add('valid');
        } else if (value && !isValid) {
            input.classList.remove('valid');
            input.classList.add('error');
        } else {
            input.classList.remove('valid', 'error');
        }
        
        // Show error message
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = errorMsg;
            errorElement.style.display = errorMsg ? 'block' : 'none';
        }
        
        return isValid;
    };
    
    // Add event listeners
    if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput));
    if (emailInput) emailInput.addEventListener('blur', () => validateField(emailInput));
    if (messageInput) messageInput.addEventListener('blur', () => validateField(messageInput));
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput);
        const isEmailValid = validateField(emailInput);
        const isMessageValid = validateField(messageInput);
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showFormStatus('Молимо попуните сва обавезна поља исправно', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> <span>Шаље се...</span>';
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        showFormStatus('Порука је успешно послата! Контактираћемо вас ускоро.', 'success');
        contactForm.reset();
        
        // Reset button
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span data-i18n="contact.form.submit">Пошаљите</span><i class="fas fa-paper-plane"></i>';
        }, 2000);
    });
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Initialize form validation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormValidation);
} else {
    initFormValidation();
}

// ================================
// 3. Enhanced Scroll Indicator (Fade on Scroll)
// ================================
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateIndicator = () => {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - (scrollY / 300));
        scrollIndicator.style.opacity = opacity;
        
        if (scrollY > 300) {
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.pointerEvents = 'auto';
        }
        
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateIndicator);
            ticking = true;
        }
    });
}

// Initialize scroll indicator
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollIndicator);
} else {
    initScrollIndicator();
}

// ================================
// 4. Hero Badge Pulse Animation
// ================================
function initHeroBadgePulse() {
    const heroBadge = document.querySelector('.hero-badge');
    if (!heroBadge) return;
    
    // Add pulse class after page load
    setTimeout(() => {
        heroBadge.classList.add('pulse-animation');
    }, 1000);
}

// Initialize hero badge pulse
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroBadgePulse);
} else {
    initHeroBadgePulse();
}

// ================================
// 5. Mobile Menu Overlay Click to Close
// ================================
function initMobileMenuEnhancements() {
    const navOverlay = document.getElementById('navOverlay');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (!navOverlay || !navMenu || !hamburger) return;
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
    
    // Update aria-expanded on hamburger click
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Swipe to close (touch devices)
    let touchStartX = 0;
    let touchEndX = 0;
    
    navMenu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    navMenu.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) { // Swipe left
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
    
    // Staggered menu item animation
    const menuItems = navMenu.querySelectorAll('.nav-link');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active')) {
                menuItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.classList.add('slide-in');
                });
            } else {
                menuItems.forEach(item => {
                    item.classList.remove('slide-in');
                });
            }
        });
    });
    
    observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
}

// Initialize mobile menu enhancements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenuEnhancements);
} else {
    initMobileMenuEnhancements();
}

// ================================
// 6. Floating Contact Tooltip (Delayed) - DISABLED
// Ресторан не прима резервације
// ================================
function initFloatingContactTooltip() {
    // Tooltip је искључен јер ресторан не прима резервације
    return;
    
    /* DISABLED CODE:
    const floatingContact = document.getElementById('floating-contact');
    if (!floatingContact) return;
    
    let tooltipTimeout;
    let hasShownTooltip = sessionStorage.getItem('tooltipShown');
    
    if (!hasShownTooltip) {
        tooltipTimeout = setTimeout(() => {
            floatingContact.classList.add('show-tooltip');
            sessionStorage.setItem('tooltipShown', 'true');
            
            // Remove tooltip after 5 seconds
            setTimeout(() => {
                floatingContact.classList.remove('show-tooltip');
            }, 5000);
        }, 3000);
    }
    
    // Remove tooltip on click
    floatingContact.addEventListener('click', () => {
        clearTimeout(tooltipTimeout);
        floatingContact.classList.remove('show-tooltip');
    });
    */
}

// Tooltip је искључен - не позивам функцију
// Initialize floating contact tooltip
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initFloatingContactTooltip);
// } else {
//     initFloatingContactTooltip();
// }

// ================================
// 7. Prefers Color Scheme Detection
// ================================
function initColorSchemeDetection() {
    const savedTheme = localStorage.getItem('theme');
    
    // Only auto-set if user hasn't manually chosen a theme
    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDark) {
            document.body.classList.add('winter-theme');
            localStorage.setItem('theme', 'winter');
        }
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) { // Only if user hasn't set preference
            if (e.matches) {
                document.body.classList.add('winter-theme');
            } else {
                document.body.classList.remove('winter-theme');
            }
        }
    });
}

// Initialize color scheme detection
initColorSchemeDetection();

// ================================
// 8. Enhanced Gallery with Captions
// ================================
function initGalleryEnhancements() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        if (img && overlay && !overlay.querySelector('.gallery-label')) {
            const alt = img.getAttribute('alt');
            if (alt) {
                const label = document.createElement('span');
                label.className = 'gallery-label';
                label.textContent = alt.split(' - ')[0]; // Take first part before dash
                overlay.appendChild(label);
            }
        }
    });
}

// Initialize gallery enhancements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryEnhancements);
} else {
    initGalleryEnhancements();
}

// ================================
// 9. Ripple Effect on Buttons
// ================================
function createRipple(event) {
    const button = event.currentTarget;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .hero-badge, .filter-btn, .drinks-filter-btn');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
}

// Initialize ripple effect
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRippleEffect);
} else {
    initRippleEffect();
}

// ================================
// 10. Performance: Image Lazy Loading Fallback
// ================================
function initLazyLoadingFallback() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        return; // Browser supports it natively
    }
    
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading fallback
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoadingFallback);
} else {
    initLazyLoadingFallback();
}

console.log('✅ UI/UX Enhancements loaded successfully');
