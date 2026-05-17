// 1. Dynamic Text Swapper Logic
const roles = [
    { role: "Data Analyst", desc: "I help businesses uncover hidden opportunities, optimize performance, and make smarter decisions using data." },
    { role: "Power BI Developer", desc: "Turning messy business data into clear decisions, actionable insights, and growth opportunities." },
    { role: "Tableau Developer", desc: "I build dashboards and data systems that help businesses increase efficiency and make faster decisions." },
    { role: "Data Visualization Specialist", desc: "Transforming complex datasets into clear visual strategies that drive real business results." }
];

let currentRoleIndex = 0;
const roleContainer = document.getElementById('role-container');
const roleElement = document.getElementById('dynamic-role');
const descElement = document.getElementById('dynamic-desc');

if (roleContainer && roleElement && descElement) {
    setInterval(() => {
        roleContainer.style.opacity = 0;
        descElement.style.opacity = 0;

        setTimeout(() => {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleElement.innerText = roles[currentRoleIndex].role;
            descElement.innerText = roles[currentRoleIndex].desc;
            roleContainer.style.opacity = 1;
            descElement.style.opacity = 1;
        }, 500);
    }, 4000);
}

// 2. Dynamic Header Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// 3. Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });
}

// 4. About Me Tabs Logic — fixed: accepts element directly, no global event reliance
function showTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabId).classList.remove('hidden');
    el.classList.add('active');
}

// 5. Blog Carousel with Arrow Buttons
const carousel = document.getElementById('blog-carousel');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

if (carousel) {
    let isDown = false;
    let isDragging = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => { isDown = false; });
    carousel.addEventListener('mouseup', () => { isDown = false; });
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true;
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    carousel.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
            isDragging = false;
        }
    });

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            carousel.scrollBy({ left: -370, behavior: 'smooth' });
        });
        btnNext.addEventListener('click', () => {
            carousel.scrollBy({ left: 370, behavior: 'smooth' });
        });
    }
}

// 6. See More Projects Logic
const seeMoreBtn = document.getElementById('see-more-btn');
const extraProjects = document.querySelectorAll('.extra-project');

if (seeMoreBtn && extraProjects.length > 0) {
    seeMoreBtn.addEventListener('click', () => {
        let isHidden = false;
        extraProjects.forEach(proj => {
            proj.classList.toggle('hidden');
            if (proj.classList.contains('hidden')) isHidden = true;
        });
        seeMoreBtn.innerHTML = isHidden ? 'See More Projects &rarr;' : 'See Less Projects &uarr;';
    });
}

// 7. Modal Logic — FIXED cert-2 close bug
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('fixed') &&
       (event.target.id.startsWith('modal-') || event.target.id.startsWith('cert-') || event.target.id.startsWith('blog-modal-'))) {
        closeModal(event.target.id);
    }
});

// 8. Scroll-triggered fade-in animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .service-card, .project-card, .bg-accentBg').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
});

// 9. Animated stat counter with smart formatting
function formatCount(n) {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(0) + 'M+';
    if (n >= 1000) return n.toLocaleString();
    return n.toString();
}

function animateCounter(el, target, duration = 1000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = formatCount(target);
            clearInterval(timer);
        } else {
            el.textContent = formatCount(Math.floor(start));
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            animateCounter(el, target);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
