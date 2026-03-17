// 1. Dynamic Text Swapper Logic
const roles = [
    { role: "Data Analyst", desc: "turning raw data into actionable insights and helping you make smarter decisions." },
    { role: "Power BI Developer", desc: "designing interactive, enterprise-grade dashboards to track your key metrics." },
    { role: "Tableau Developer", desc: "crafting beautiful, intuitive data visualizations that tell a compelling story." },
    { role: "Data Visualization Specialist", desc: "transforming complex datasets into clear, visual business strategies." }
];


let currentRoleIndex = 0;
const roleContainer = document.getElementById('role-container');
const roleElement = document.getElementById('dynamic-role');
const descElement = document.getElementById('dynamic-desc');

if (roleContainer && roleElement && descElement) {
    setInterval(() => {
        // Fade out
        roleContainer.style.opacity = 0;
        descElement.style.opacity = 0;

        setTimeout(() => {
            // Update Text
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleElement.innerText = roles[currentRoleIndex].role;
            descElement.innerText = roles[currentRoleIndex].desc;
            
            // Fade in
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

// 3. Mobile Menu Logic (With Safety Checks)
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

// 4. About Me Tabs Logic
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabId).classList.remove('hidden');
    event.target.classList.add('active');
}

// 5. Static Draggable Blog Carousel with Arrow Buttons
const carousel = document.getElementById('blog-carousel');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

if (carousel) {
    let isDown = false;
    let isDragging = false; 
    let startX;
    let scrollLeft;

    // Mouse Drag Logic
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false; 
        carousel.classList.add('active:cursor-grabbing');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => { 
        isDown = false; 
        carousel.classList.remove('active:cursor-grabbing');
    });

    carousel.addEventListener('mouseup', () => { 
        isDown = false; 
        carousel.classList.remove('active:cursor-grabbing');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault(); // Prevents ghost dragging of links/images
        isDragging = true; 
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll fast
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Prevent link click if dragging
    carousel.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
            isDragging = false;
        }
    });

    // Arrow Buttons Logic
    if(btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            carousel.scrollBy({ left: -370, behavior: 'smooth' }); // Scrolls left by one card width approx
        });
        
        btnNext.addEventListener('click', () => {
            carousel.scrollBy({ left: 370, behavior: 'smooth' }); // Scrolls right by one card width approx
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
            if (proj.classList.contains('hidden')) {
                isHidden = true;
            }
        });

        // تغيير النص بتاع الزرار بناءً على الحالة
        if (isHidden) {
            seeMoreBtn.innerHTML = 'See More Projects &rarr;';
        } else {
            seeMoreBtn.innerHTML = 'See Less Projects &uarr;';
        }
    });
}