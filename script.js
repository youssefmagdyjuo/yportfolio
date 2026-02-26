// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Optional: Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
// Mobile navigation toggle
const navBtn = document.querySelector('.nav_btn');
const navMenu = document.querySelector('.nav-menu');
navBtn.addEventListener('click', () => {
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
});
// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
        }

    });
});



/* showToast(message, durationMs) */
function showToast(message, duration = 15000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<span class="toast-msg"></span><button class="toast-close" aria-label="Close">&times;</button>';
    toast.querySelector('.toast-msg').textContent = message;
    container.appendChild(toast);

    // enter
    requestAnimationFrame(() => toast.classList.add('show'));

    // close handler
    const remove = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
    };
    toast.querySelector('.toast-close').addEventListener('click', remove);

    // auto remove
    if (duration > 0) setTimeout(remove, duration);
}

/* Auto demo toast on page load */
// document.addEventListener('DOMContentLoaded', () => {
//     showToast(`I apologize if my recent code did not meet expectations. This is not my usual standard.
//                 I had a surgery two days ago and did my best to contribute despite 
//                 my current health condition.
// Thank you for your understanding. I will make sure my work 
// reflects my normal performance as soon as I fully recover.`);
// });

