// ===== TYPING ANIMATION =====

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Systems Administrator", "Cloud Architect", "Automation Engineer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", function() {
    if (typedTextSpan && cursorSpan && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
});

// ===== DARK MODE TOGGLE =====

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Set initial icon
updateThemeIcon(savedTheme);

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Get current theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // Switch theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update DOM
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
        
        console.log(`Theme switched to: ${newTheme}`);
    });
}

// ===== SMOOTH SCROLL & NAVIGATION =====

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll with theme support
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.backgroundColor = 'rgba(30, 41, 59, 1)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 1)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        }
    }
});

// Add fade-in animation for sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add animation to timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    timelineObserver.observe(item);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-color)';
    });
});

// Add click effect to tags
document.querySelectorAll('.tag, .tech-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerElement = document.querySelector('.footer p');
if (footerElement) {
    footerElement.textContent = `© ${currentYear} Marios Xenofontos. All rights reserved.`;
}

// Console message for technical visitors
console.log('%c👋 Welcome to my portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'color: #64748b; font-size: 14px;');
console.log('%cNo frameworks - pure performance!', 'color: #10b981; font-size: 14px;');
console.log('%c🔗 LinkedIn: https://www.linkedin.com/in/marios-xenofontos/', 'color: #3b82f6; font-size: 14px;');
console.log('%c🐙 GitHub: https://github.com/mariosxen/', 'color: #3b82f6; font-size: 14px;');
