// ================================
// Chatbot Functionality
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('chatbotClose');
    const chatMessages = document.getElementById('chatMessages');
    const quickActions = document.querySelectorAll('.quick-action');
    const notification = document.getElementById('chatbotNotification');
    const welcomeImage = document.querySelector('.chatbot-welcome-image');
    
    let isOpen = false;
    let hasInteracted = false;
    let currentLang = 'sr';
    let messageCount = 0;

    // Detect language changes
    function updateLanguage() {
        currentLang = document.documentElement.lang || 'sr';
        updateNotificationText();
        updateInputPlaceholder();
    }

    // Update notification text based on language
    function updateNotificationText() {
        if (notification) {
            const span = notification.querySelector('span');
            if (span) {
                span.textContent = currentLang === 'en' 
                    ? 'Hey! Can I help? 👋' 
                    : 'Хеј! Могу ли да помогнем? 👋';
            }
        }
    }

    // Update input placeholder based on language
    function updateInputPlaceholder() {
        const input = document.getElementById('chatbotInput');
        if (input) {
            input.placeholder = currentLang === 'en'
                ? 'Type your message...'
                : 'Упишите вашу поруку...';
        }
    }

    // Show notification periodically
    function showNotification() {
        if (!isOpen && !hasInteracted && notification) {
            notification.style.animation = 'none';
            setTimeout(() => {
                notification.style.animation = 'slideInUp 0.5s ease forwards, fadeOutNotification 8s ease forwards';
            }, 10);
        }
    }

    // Hide welcome image when messages appear
    function hideWelcomeImage() {
        if (welcomeImage && messageCount > 0) {
            welcomeImage.style.display = 'none';
        }
    }

    // Show initial notification after 3 seconds
    setTimeout(showNotification, 3000);

    // Show notification every 30 seconds if not interacted
    setInterval(() => {
        if (!hasInteracted) {
            showNotification();
        }
    }, 30000);

    // Watch for language changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'lang') {
                updateLanguage();
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });
    updateLanguage();

    // Toggle chatbot
    chatbotButton.addEventListener('click', function() {
        isOpen = !isOpen;
        hasInteracted = true;
        chatbotWindow.classList.toggle('active');
        
        if (isOpen && messageCount === 0) {
            const welcomeMsg = currentLang === 'en' 
                ? 'Welcome! How can I help you today? 😊'
                : 'Добродошли! Како могу да вам помогнем данас? 😊';
            addBotMessage(welcomeMsg);
        }
    });

    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        isOpen = false;
        chatbotWindow.classList.remove('active');
    });

    // Quick actions
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.dataset.action;
            handleQuickAction(actionType);
        });
    });

    // Handle quick actions
    function handleQuickAction(action) {
        hasInteracted = true;
        
        const messages = {
            sr: {
                menu: {
                    user: 'Прикажи мени',
                    bot: 'Ево нашег менија! Можете кликнути на "Мени" у навигацији или скроловати до секције менија. Имамо традиционална јела, пића и десерте. 🍴'
                },
                contact: {
                    user: 'Контакт информације',
                    bot: 'Можете нас контактирати на:\n📞 031 3841962\n✉️ krcmagaj@gmail.com\n📍 Његошева 186, Златибор\n🕐 Радно време: Сваки дан 10:00 - 23:00'
                }
            },
            en: {
                menu: {
                    user: 'Show menu',
                    bot: 'Here\'s our menu! You can click "Menu" in the navigation or scroll to the menu section. We have traditional dishes, drinks and desserts. 🍴'
                },
                contact: {
                    user: 'Contact information',
                    bot: 'You can contact us at:\n📞 031 3841962\n✉️ krcmagaj@gmail.com\n📍 Njegoševa 186, Zlatibor\n🕐 Working hours: Every day 10:00 - 23:00'
                }
            }
        };
        
        const lang = messages[currentLang] || messages.sr;
        
        switch(action) {
            case 'menu':
                addUserMessage(lang.menu.user);
                setTimeout(() => {
                    addBotMessage(lang.menu.bot);
                    setTimeout(() => {
                        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                }, 500);
                break;
                
            case 'contact':
                addUserMessage(lang.contact.user);
                setTimeout(() => {
                    addBotMessage(lang.contact.bot);
                }, 500);
                break;
        }
    }

    // Add user message
    function addUserMessage(text) {
        messageCount++;
        hideWelcomeImage();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Add bot message
    function addBotMessage(text) {
        messageCount++;
        hideWelcomeImage();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">${text.replace(/\n/g, '<br>')}</div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Get current time
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    // Scroll to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Note: This is a basic FAQ chatbot with automated responses.
    // For REAL two-way communication with website visitors, you need to integrate:
    // 
    // FREE OPTIONS:
    // 1. Tawk.to - https://www.tawk.to/ (most popular, completely free)
    // 2. Tidio - https://www.tidio.com/ (free plan available)
    // 3. JivoChat - https://www.jivochat.com/ (free trial)
    // 
    // PAID OPTIONS:
    // 4. Intercom - https://www.intercom.com/
    // 5. Drift - https://www.drift.com/
    // 6. LiveChat - https://www.livechat.com/
    // 
    // SOCIAL MEDIA:
    // 7. Facebook Messenger Plugin
    // 8. WhatsApp Business API
    // 
    // To add Tawk.to (FREE & RECOMMENDED):
    // 1. Sign up at https://www.tawk.to/
    // 2. Create a widget
    // 3. Copy the widget code
    // 4. Paste it before </body> in index.html
    // 5. Remove this custom chatbot or keep both
});
