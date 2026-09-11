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

document.querySelectorAll('.project-card, .skill-category, .about-content, .certificate-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
// Mobile navigation toggle
const navBtn = document.querySelector('.nav_btn');
const navMenu = document.querySelector('.nav-menu');
const navIcon = document.querySelector('.nav_btn i');

navBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        navIcon.classList.remove('fa-bars');
        navIcon.classList.add('fa-xmark');
    } else {
        navIcon.classList.remove('fa-xmark');
        navIcon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            navIcon.classList.remove('fa-xmark');
            navIcon.classList.add('fa-bars');
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

// Certificate Image Lightbox
const certModal = document.getElementById('cert-modal');
const certModalImg = document.getElementById('cert-modal-img');
const certModalCaption = document.getElementById('cert-modal-caption');
const certModalClose = document.querySelector('.cert-modal-close');
const certModalBackdrop = document.querySelector('.cert-modal-backdrop');

function openCertModal(imgSrc, captionText) {
    if (!certModal || !certModalImg) return;
    certModalImg.src = imgSrc;
    certModalCaption.textContent = captionText || '';
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.cert-image-container').forEach(container => {
    container.addEventListener('click', (e) => {
        // Ignore if clicking the verify badge
        if (e.target.closest('.cert-link-badge')) {
            return;
        }

        // Prevent opening certificate link when clicking the image
        e.preventDefault();
        e.stopPropagation();

        const img = container.querySelector('.cert-image');
        if (!img) return;

        const card = container.closest('.certificate-card');
        const title = card ? card.querySelector('.cert-title')?.textContent : img.alt;

        openCertModal(img.src, title);
    });
});

document.querySelectorAll('.cert-link-badge').forEach(badge => {
    badge.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = badge.closest('a.has-link');
        if (card && card.href) {
            window.open(card.href, '_blank', 'noopener,noreferrer');
            e.preventDefault();
        }
    });
});

if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
        closeCertModal();
    }
});

/* Auto demo toast on page load */
// document.addEventListener('DOMContentLoaded', () => {
//     showToast(`I apologize if my recent code did not meet expectations. This is not my usual standard.
//                 I had a surgery two days ago and did my best to contribute despite 
//                 my current health condition.
// Thank you for your understanding. I will make sure my work 
// reflects my normal performance as soon as I fully recover.`);
// });

