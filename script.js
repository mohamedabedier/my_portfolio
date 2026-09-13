// ========================================
// 1. Dynamic Text Swapper Logic
// ========================================
const roles = [
    { role: "Data Analyst", desc: "I turn raw data into actionable insights, dashboards, and business decisions — while building strong data engineering foundations." },
    { role: "BI Developer", desc: "Building interactive dashboards and KPI reporting systems in Power BI and Tableau that drive smarter decisions." },
    { role: "Data Modeler", desc: "Designing Star Schemas, data warehouses, and analytical models that make data fast and reliable to query." },
    { role: "Data Engineer", desc: "Building ETL pipelines with PySpark, Hive, Kafka, and Spark Streaming — the systems behind the analytics." }
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

// ========================================
// 2. Dynamic Header Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
}

// ========================================
// 3. Mobile Menu Logic
// ========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        closeMenuBtn.focus();
    });
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.focus();
    });
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// ========================================
// 4. Tab Logic (delegated, no inline onclick)
// ========================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        if (!tabId) return;
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
        });
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.remove('hidden');
        }
        btn.classList.add('active');
    });
});

// ========================================
// 5. Blog Carousel with Arrow Buttons
// ========================================
const carousel = document.getElementById('blog-carousel');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let isDragging = false;

if (carousel) {
    let isDown = false;
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
            e.stopPropagation();
            isDragging = false;
        }
    }, true);

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            carousel.scrollBy({ left: -370, behavior: 'smooth' });
        });
        btnNext.addEventListener('click', () => {
            carousel.scrollBy({ left: 370, behavior: 'smooth' });
        });
    }
}

// ========================================
// 6. Modal Logic (delegated, no inline onclick)
// ========================================
let lastFocusedElement = null;

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        lastFocusedElement = document.activeElement;
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        const innerDiv = modal.querySelector('div');
        if (innerDiv) innerDiv.classList.remove('scale-95');
        document.body.style.overflow = 'hidden';
        
        // Focus the close button for accessibility
        const closeBtn = modal.querySelector('.modal-close-btn');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('opacity-0');
        const innerDiv = modal.querySelector('div');
        if (innerDiv) innerDiv.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            // Restore focus
            if (lastFocusedElement) {
                lastFocusedElement.focus();
                lastFocusedElement = null;
            }
        }, 300);
    }
}

// Close modal on backdrop click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeModal(event.target.id);
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal-overlay:not(.hidden)');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Delegated click handlers for modal close buttons
document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        if (modalId) closeModal(modalId);
    });
});

// Delegated click handlers for project cards
document.querySelectorAll('.project-card[data-modal]').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // Don't open modal if clicking a link
        openModal(card.dataset.modal);
    });
    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card.dataset.modal);
        }
    });
});

// Delegated click handlers for blog cards
document.querySelectorAll('.blog-card[data-modal]').forEach(card => {
    card.addEventListener('click', (e) => {
        if (isDragging) return;
        if (e.target.closest('a')) return;
        openModal(card.dataset.modal);
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card.dataset.modal);
        }
    });
});

// Delegated click handlers for certificate buttons
document.querySelectorAll('.cert-btn[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btn.dataset.modal);
    });
});

// ========================================
// 7. Scroll-triggered fade-in animations
// ========================================
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

// ========================================
// 8. Animated stat counter with smart formatting
// ========================================
function formatCount(n, el) {
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix !== undefined ? el.dataset.prefix : '';
    return prefix + n.toLocaleString() + suffix;
}

function animateCounter(el, target, duration = 1000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = formatCount(target, el);
            clearInterval(timer);
        } else {
            el.textContent = formatCount(Math.floor(start), el);
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

// ========================================
// 9. Active navigation highlight
// ========================================
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

if (navLinks.length && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('text-primary', 'font-bold');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('text-primary');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => navObserver.observe(section));
}

// ========================================
// 10. Show More Courses
// ========================================
const seeMoreCoursesBtn = document.getElementById('see-more-courses-btn');
const extraCoursesGrid = document.getElementById('extra-courses-grid');
const extraCoursesWrapper = document.getElementById('extra-courses-wrapper');

if (seeMoreCoursesBtn && extraCoursesGrid) {
    seeMoreCoursesBtn.addEventListener('click', () => {
        extraCoursesGrid.style.maxHeight = extraCoursesGrid.scrollHeight + 'px';
        extraCoursesGrid.style.maskImage = 'none';
        extraCoursesGrid.style.webkitMaskImage = 'none';
        seeMoreCoursesBtn.style.display = 'none';
    });
}

// ========================================
// 11. Show More Projects
// ========================================
const seeMoreProjectsBtn = document.getElementById('see-more-projects-btn');
const extraProjectsGrid = document.getElementById('extra-projects-grid');

if (seeMoreProjectsBtn && extraProjectsGrid) {
    seeMoreProjectsBtn.addEventListener('click', () => {
        extraProjectsGrid.style.maxHeight = extraProjectsGrid.scrollHeight + 'px';
        extraProjectsGrid.style.maskImage = 'none';
        extraProjectsGrid.style.webkitMaskImage = 'none';
        seeMoreProjectsBtn.style.display = 'none';
    });
}

// ========================================
// 12. Skill Tag Colored Hover
// ========================================
const colorMap = {
    orange: { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa', shadow: 'rgba(194, 65, 12, 0.3)' },
    purple: { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff', shadow: 'rgba(126, 34, 206, 0.3)' },
    amber:  { bg: '#fffbeb', text: '#b45309', border: '#fde68a', shadow: 'rgba(180, 83, 9, 0.3)' },
    blue:   { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe', shadow: 'rgba(29, 78, 216, 0.3)' }
};

document.querySelectorAll('.skill-tag[data-color]').forEach(tag => {
    const color = tag.dataset.color;
    const scheme = colorMap[color];
    if (!scheme) return;

    tag.addEventListener('mouseenter', () => {
        tag.style.backgroundColor = scheme.bg;
        tag.style.color = scheme.text;
        tag.style.borderColor = scheme.border;
        tag.style.transform = 'translateY(-2px)';
        tag.style.boxShadow = `0 4px 12px ${scheme.shadow}`;
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.backgroundColor = '';
        tag.style.color = '';
        tag.style.borderColor = '';
        tag.style.transform = '';
        tag.style.boxShadow = '';
    });
});
