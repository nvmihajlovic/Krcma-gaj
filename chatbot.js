// ================================
// Chatbot Functionality
// ================================

// Check if Tawk.to is loaded and hide custom chatbot
if (typeof Tawk_API !== 'undefined') {
    document.body.classList.add('tawk-active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Double check for Tawk.to after DOM load
    setTimeout(() => {
        if (typeof Tawk_API !== 'undefined' || document.querySelector('#tawkchat-container')) {
            document.body.classList.add('tawk-active');
        }
    }, 1000);
    
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
        updateQuickActionLabels();
        updateChatbotHeader();
        updateChatbotFooter();
    }

    // Get translation
    function t(key) {
        if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) {
            return translations[currentLang][key];
        }
        return key;
    }

    // Update notification text based on language
    function updateNotificationText() {
        if (notification) {
            const span = notification.querySelector('span');
            if (span) {
                span.textContent = t('chatbot.greeting');
            }
        }
    }

    // Update input placeholder based on language
    function updateInputPlaceholder() {
        const input = document.getElementById('chatbotInput');
        if (input) {
            input.placeholder = t('chatbot.placeholder');
        }
    }
    
    // Update quick action labels
    function updateQuickActionLabels() {
        quickActions.forEach(action => {
            const span = action.querySelector('span');
            const actionType = action.dataset.action;
            if (span && actionType) {
                span.textContent = t(`chatbot.action.${actionType}`);
            }
        });
    }
    
    // Update chatbot header
    function updateChatbotHeader() {
        const title = document.querySelector('.chatbot-header h3');
        const status = document.querySelector('.chatbot-header p');
        if (title) title.textContent = t('chatbot.title');
        if (status) status.textContent = t('chatbot.status');
    }
    
    // Update chatbot footer
    function updateChatbotFooter() {
        const footer = document.querySelector('.chatbot-footer small');
        if (footer) footer.textContent = t('chatbot.disclaimer');
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
            addBotMessage(t('chatbot.welcome'));
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
        
        switch(action) {
            case 'menu':
                addUserMessage(t('chatbot.menu.user'));
                setTimeout(() => {
                    addBotMessage(t('chatbot.menu.bot'));
                    setTimeout(() => {
                        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                }, 500);
                break;
                
            case 'contact':
                addUserMessage(t('chatbot.contact.user'));
                setTimeout(() => {
                    addBotMessage(t('chatbot.contact.bot'));
                }, 500);
                break;
                
            case 'location':
                addUserMessage(t('chatbot.location.user'));
                setTimeout(() => {
                    addBotMessage(t('chatbot.location.bot'));
                    setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                }, 500);
                break;
                
            case 'hours':
                addUserMessage(t('chatbot.hours.user'));
                setTimeout(() => {
                    addBotMessage(t('chatbot.hours.bot'));
                }, 500);
                break;
        }
    }
    
    // Handle user input
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    
    function handleUserInput() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        hasInteracted = true;
        addUserMessage(message);
        chatbotInput.value = '';
        
        // Analyze message and respond
        setTimeout(() => {
            const response = analyzeMessage(message);
            addBotMessage(response.text);
            
            if (response.action) {
                setTimeout(() => {
                    document.getElementById(response.action)?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }, 500);
    }
    
    // Analyze user message and generate response
    function analyzeMessage(message) {
        const msg = message.toLowerCase();
        
        // Menu related
        if (msg.match(/meni|menu|jela|hrana|jesti|food|dish|eat/i)) {
            return { text: t('chatbot.menu.bot'), action: 'menu' };
        }
        
        // Location related
        if (msg.match(/lokacija|gde|adresa|kako|doći|location|where|address|how to get/i)) {
            return { text: t('chatbot.location.bot'), action: 'contact' };
        }
        
        // Hours related
        if (msg.match(/radno|vreme|kad|otvoreno|zatvoreno|working|hours|open|close/i)) {
            return { text: t('chatbot.hours.bot'), action: null };
        }
        
        // Reservation related - now returns "we don't take reservations"
        if (msg.match(/rezervacija|rezervisati|rezervišem|sto|booking|reserve|reservation|table/i)) {
            return { text: t('chatbot.reservation.bot'), action: null };
        }
        
        // Contact related
        if (msg.match(/kontakt|telefon|email|pozovite|contact|phone|call/i)) {
            return { text: t('chatbot.contact.bot'), action: null };
        }
        
        // Specialties related
        if (msg.match(/preporuka|šta|preporučujete|specijal|najbolje|recommend|special|best/i)) {
            return { text: t('chatbot.specialties.bot'), action: 'menu' };
        }
        
        // Greetings
        if (msg.match(/zdravo|ćao|cao|dobar dan|hi|hello|hey/i)) {
            return { text: t('chatbot.welcome'), action: null };
        }
        
        // Default response
        return { text: t('chatbot.notunderstood'), action: null };
    }
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', handleUserInput);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
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
