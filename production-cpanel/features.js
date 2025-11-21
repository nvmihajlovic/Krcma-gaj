// ================================
// Instagram Feed Integration
// ================================
const instagramFeed = {
    // Mock data за демо (замени са правим Instagram API-јем)
    posts: [
        {
            id: 1,
            image: 'images/jelo-specijalitet.jpg',
            caption: 'Наш специјалитет куће - традиционално српско јело припремљено по старим рецептима 🍽️',
            likes: 248,
            comments: 15
        },
        {
            id: 2,
            image: 'images/restoran-unutra.jpg',
            caption: 'Топао амбијент и аутентичан декор за незаборавне тренутке 🏡',
            likes: 189,
            comments: 12
        },
        {
            id: 3,
            image: 'images/pogled na cigotu.jpg',
            caption: 'Предиван поглед на Чиготу док уживате у оброку 🏔️',
            likes: 312,
            comments: 24
        },
        {
            id: 4,
            image: 'images/cigota i terasa.jpg',
            caption: 'Наша тераса - савршено место за летње дане ☀️',
            likes: 275,
            comments: 18
        },
        {
            id: 5,
            image: 'images/restoran spolja cigota.jpg',
            caption: 'Добродошли у Крчму Гај - ваш дом на Златибору 🌲',
            likes: 198,
            comments: 9
        },
        {
            id: 6,
            image: 'images/terasa cigota.jpg',
            caption: 'Романтичне вечери уз прелеп залазак сунца 🌅',
            likes: 331,
            comments: 21
        }
    ],
    
    init() {
        this.renderFeed();
        this.setupEventListeners();
    },
    
    renderFeed() {
        const grid = document.getElementById('instagramGrid');
        if (!grid) return;
        
        grid.innerHTML = this.posts.map(post => `
            <div class="instagram-post" data-post-id="${post.id}">
                <img src="${post.image}" alt="${post.caption}" loading="lazy">
                <div class="instagram-overlay">
                    <div class="instagram-stats">
                        <div class="instagram-stat">
                            <i class="fas fa-heart"></i>
                            <span>${post.likes}</span>
                        </div>
                        <div class="instagram-stat">
                            <i class="fas fa-comment"></i>
                            <span>${post.comments}</span>
                        </div>
                    </div>
                    <p class="instagram-caption">${post.caption}</p>
                </div>
            </div>
        `).join('');
    },
    
    setupEventListeners() {
        document.querySelectorAll('.instagram-post').forEach(post => {
            post.addEventListener('click', function() {
                window.open('https://www.instagram.com/krcmagaj/', '_blank');
            });
        });
    }
};

// ================================
// Custom Cursor
// ================================
const customCursor = {
    cursor: null,
    follower: null,
    icon: null,
    
    init() {
        // Креирај cursor елементе
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        
        this.follower = document.createElement('div');
        this.follower.className = 'custom-cursor-follower';
        
        this.icon = document.createElement('i');
        this.icon.className = 'cursor-icon fas fa-utensils';
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.follower);
        document.body.appendChild(this.icon);
        
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let iconX = 0, iconY = 0;
        
        // Прати позицију миша
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
            this.icon.style.left = mouseX + 'px';
            this.icon.style.top = mouseY + 'px';
        });
        
        // Smooth следбеник
        const followMouse = () => {
            const speed = 0.15;
            
            followerX += (mouseX - followerX) * speed;
            followerY += (mouseY - followerY) * speed;
            
            this.follower.style.left = followerX + 'px';
            this.follower.style.top = followerY + 'px';
            
            requestAnimationFrame(followMouse);
        };
        followMouse();
        
        // Hover на кликабилне елементе
        const clickables = document.querySelectorAll('a, button, .menu-item, .gallery-item, .testimonial-card, input, textarea, select');
        
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.follower.classList.add('hover');
                this.icon.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.follower.classList.remove('hover');
                this.icon.classList.remove('active');
            });
        });
    }
};

// ================================
// Chatbot Widget
// ================================
const chatbot = {
    isOpen: false,
    messages: [],
    
    init() {
        this.setupEventListeners();
        this.sendWelcomeMessage();
    },
    
    setupEventListeners() {
        const button = document.getElementById('chatbotButton');
        const window = document.getElementById('chatbotWindow');
        const closeBtn = document.getElementById('chatbotClose');
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('chatbotSend');
        
        if (!button) return;
        
        // Toggle chatbot
        button.addEventListener('click', () => {
            this.toggle();
        });
        
        closeBtn?.addEventListener('click', () => {
            this.close();
        });
        
        // Пошаљи поруку
        sendBtn?.addEventListener('click', () => {
            this.sendUserMessage();
        });
        
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendUserMessage();
            }
        });
        
        // Quick actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action-btn')) {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            }
        });
    },
    
    toggle() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbotWindow');
        const badge = document.querySelector('.chatbot-badge');
        
        if (this.isOpen) {
            window.classList.add('active');
            if (badge) badge.style.display = 'none';
        } else {
            window.classList.remove('active');
        }
    },
    
    close() {
        this.isOpen = false;
        document.getElementById('chatbotWindow').classList.remove('active');
    },
    
    sendWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage(
                'Добродошли у Крчму Гај! 👋<br>Како могу да вам помогнем данас?',
                this.getQuickActions()
            );
        }, 1000);
    },
    
    sendUserMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        // Симулирај одговор
        setTimeout(() => {
            this.showTyping();
            setTimeout(() => {
                this.hideTyping();
                this.generateResponse(message);
            }, 1500);
        }, 500);
    },
    
    addUserMessage(text) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const time = new Date().toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
        
        const messageHTML = `
            <div class="chatbot-message user">
                <div class="message-content">
                    <p class="message-text">${text}</p>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    addBotMessage(text, quickActions = null) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const time = new Date().toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
        
        let actionsHTML = '';
        if (quickActions) {
            actionsHTML = '<div class="quick-actions">' + 
                quickActions.map(action => 
                    `<button class="quick-action-btn" data-action="${action.value}">
                        <i class="${action.icon}"></i>
                        ${action.label}
                    </button>`
                ).join('') + 
            '</div>';
        }
        
        const messageHTML = `
            <div class="chatbot-message">
                <div class="message-avatar">
                    <i class="fas fa-utensils"></i>
                </div>
                <div class="message-content">
                    <p class="message-text">${text}</p>
                    <span class="message-time">${time}</span>
                    ${actionsHTML}
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    showTyping() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingHTML = `
            <div class="chatbot-message typing-message">
                <div class="message-avatar">
                    <i class="fas fa-utensils"></i>
                </div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    hideTyping() {
        const typing = document.querySelector('.typing-message');
        if (typing) typing.remove();
    },
    
    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response = '';
        let actions = null;
        
        if (message.includes('јеловник') || message.includes('храна') || message.includes('јело')) {
            response = 'Наш јеловник нуди традиционална златиборска јела припремљена по старим рецептима. Желите ли да погледате комплетан јеловник?';
            actions = [
                { label: 'Погледај јеловник', value: 'menu', icon: 'fas fa-utensils' },
                { label: 'Карта пића', value: 'drinks', icon: 'fas fa-wine-glass' }
            ];
        } else if (message.includes('резервација') || message.includes('сто')) {
            response = 'Можете резервисати сто позивом на +381 31 3841962 или путем нашег онлајн формулара. Радно време: 09:00 - 22:00.';
            actions = [
                { label: 'Позови сада', value: 'call', icon: 'fas fa-phone' }
            ];
        } else if (message.includes('радно време') || message.includes('отворено')) {
            response = 'Отворени смо сваког дана од 09:00 до 22:00 часова. Паркинг је бесплатан и на располагању је игралиште за децу! 🎉';
        } else if (message.includes('локација') || message.includes('адреса') || message.includes('где')) {
            response = 'Налазимо се на Златибору, у Гајевима, са прелепим погледом на Чиготу. Паркинг је бесплатан! 🗺️';
            actions = [
                { label: 'Погледај мапу', value: 'map', icon: 'fas fa-map-marker-alt' }
            ];
        } else if (message.includes('цена') || message.includes('цене')) {
            response = 'Наше цене су приступачне, а квалитет је врхунски! Проверите јеловник за детаљне цене или нас позовите за више информација. 💰';
        } else {
            response = 'Хвала на питању! За било које информације можете нас позвати на +381 31 3841962 или проверити наш јеловник и информације на сајту. 😊';
            actions = this.getQuickActions();
        }
        
        this.addBotMessage(response, actions);
    },
    
    getQuickActions() {
        return [
            { label: '📖 Јеловник', value: 'menu', icon: 'fas fa-utensils' },
            { label: '📞 Контакт', value: 'contact', icon: 'fas fa-phone' },
            { label: '📍 Локација', value: 'map', icon: 'fas fa-map-marker-alt' },
            { label: '🕐 Радно време', value: 'hours', icon: 'fas fa-clock' }
        ];
    },
    
    handleQuickAction(action) {
        switch(action) {
            case 'menu':
                document.querySelector('a[href="#jelovnik"]')?.click();
                this.addBotMessage('Водим вас до јеловника! 🍽️');
                setTimeout(() => this.close(), 1000);
                break;
            case 'drinks':
                document.querySelector('a[href="#karta-pica"]')?.click();
                this.addBotMessage('Погледајте нашу богату карту пића! 🍷');
                setTimeout(() => this.close(), 1000);
                break;
            case 'contact':
                document.querySelector('a[href="#kontakt"]')?.click();
                this.addBotMessage('Водим вас до контакт секције! 📧');
                setTimeout(() => this.close(), 1000);
                break;
            case 'map':
                document.querySelector('a[href="#kontakt"]')?.click();
                this.addBotMessage('Погледајте нашу локацију на мапи! 🗺️');
                setTimeout(() => this.close(), 1000);
                break;
            case 'call':
                window.location.href = 'tel:+381313841962';
                break;
            case 'hours':
                this.addBotMessage('Радно време: Сваког дана од 09:00 до 22:00 часова. Чекамо вас! 🕐');
                break;
        }
    }
};

// ================================
// Initialize на учитавању странице
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Instagram Feed
    if (document.getElementById('instagramGrid')) {
        instagramFeed.init();
    }
    
    // Custom Cursor (DISABLED - usporava kretanje)
    // if (window.innerWidth > 1024) {
    //     customCursor.init();
    // }
    
    // Chatbot
    if (document.getElementById('chatbotButton')) {
        chatbot.init();
    }
});
