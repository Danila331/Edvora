// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, observerOptions);

// Observe all sections only
[...document.querySelectorAll('section')].forEach(el => {
    observer.observe(el);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Chat message animation
const chatMessages = document.querySelector('.chat-messages');
const messages = chatMessages.querySelectorAll('.message');

messages.forEach((message, index) => {
    message.style.opacity = '0';
    message.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        message.style.transition = 'all 0.5s ease';
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
    }, index * 1000);
});

// Telegram button hover effect
const telegramButton = document.querySelector('.telegram-button');
telegramButton.addEventListener('mouseover', () => {
    telegramButton.style.transform = 'scale(1.05)';
});
telegramButton.addEventListener('mouseout', () => {
    telegramButton.style.transform = 'scale(1)';
});

// Image loading animation
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Add typing indicator to chat
function addTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot typing';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingIndicator);
    return typingIndicator;
}

// Simulate bot response
function simulateBotResponse(message) {
    const typingIndicator = addTypingIndicator();
    
    setTimeout(() => {
        typingIndicator.remove();
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
        `;
        chatMessages.appendChild(botMessage);
        botMessage.style.opacity = '0';
        botMessage.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            botMessage.style.transition = 'all 0.5s ease';
            botMessage.style.opacity = '1';
            botMessage.style.transform = 'translateY(0)';
        }, 100);
    }, 1500);
}

// Add click event to the last bot message
const lastBotMessage = document.querySelector('.message.bot:last-child');
if (lastBotMessage) {
    lastBotMessage.addEventListener('click', () => {
        simulateBotResponse('Отлично! Давайте начнем с первого задания. Вы готовы?');
    });
} 