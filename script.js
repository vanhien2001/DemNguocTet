// ===== Events Data =====
const events = [
    // ======== Month 1 ========
    { name: "Tết Dương Lịch 2026", date: new Date("2026-01-01T00:00:00+07:00"), icon: "🎉" },

    // ======== Month 2 ========
    { name: "Ông Táo (23/12 AL)", date: new Date("2026-02-12T00:00:00+07:00"), icon: "🔥" },
    { name: "Valentine 2026", date: new Date("2026-02-14T00:00:00+07:00"), icon: "💝" },
    { name: "Tết Nguyên Đán 2026", date: new Date("2026-02-17T00:00:00+07:00"), icon: "🎊" },

    // ======== Month 3 ========
    { name: "Rằm tháng Giêng", date: new Date("2026-03-06T00:00:00+07:00"), icon: "🌕" },
    { name: "Quốc Tế Phụ Nữ 8/3", date: new Date("2026-03-08T00:00:00+07:00"), icon: "🌹" },

    // ======== Month 4 ========
    { name: "Giỗ Tổ Hùng Vương 2026", date: new Date("2026-04-26T00:00:00+07:00"), icon: "🏛️" },
    { name: "Giải Phóng Miền Nam 30/4", date: new Date("2026-04-30T00:00:00+07:00"), icon: "⭐" },

    // ======== Month 5 ========
    { name: "Quốc Tế Lao Động 1/5", date: new Date("2026-05-01T00:00:00+07:00"), icon: "⚒️" },
    { name: "Ngày của Mẹ", date: new Date("2026-05-10T00:00:00+07:00"), icon: "👩‍🍼" },

    // ======== Month 6 ========
    { name: "Phật Đản (15/4 AL)", date: new Date("2026-06-02T00:00:00+07:00"), icon: "🪷" },
    { name: "Ngày của Cha", date: new Date("2026-06-21T00:00:00+07:00"), icon: "👨‍🍼" },

    // ======== Month 7 ========
    { name: "Ngày Thương binh – Liệt sĩ", date: new Date("2026-07-27T00:00:00+07:00"), icon: "🕯️" },

    // ======== Month 8 ========
    { name: "Vu Lan", date: new Date("2026-08-24T00:00:00+07:00"), icon: "🕯️" },

    // ======== Month 9 ========
    { name: "Quốc Khánh 2/9", date: new Date("2026-09-02T00:00:00+07:00"), icon: "🎆" },
    { name: "Tết Trung Thu 2026", date: new Date("2026-09-25T00:00:00+07:00"), icon: "🏮" },

    // ======== Month 10 ========
    { name: "Ngày Phụ Nữ Việt Nam 20/10", date: new Date("2026-10-20T00:00:00+07:00"), icon: "💐" },
    { name: "Halloween 2026", date: new Date("2026-10-31T00:00:00+07:00"), icon: "🎃" },

    // ======== Month 11 ========
    { name: "Ngày Nhà Giáo Việt Nam 20/11", date: new Date("2026-11-20T00:00:00+07:00"), icon: "📚" },
    { name: "Black Friday 2026", date: new Date("2026-11-27T00:00:00+07:00"), icon: "🛍️" },
    { name: "Cyber Monday 2026", date: new Date("2026-11-30T00:00:00+07:00"), icon: "💻" },

    // ======== Month 12 ========
    { name: "Giáng Sinh 2026", date: new Date("2026-12-25T00:00:00+07:00"), icon: "🎄" },
];

// ===== Global Variables =====
let currentSlideIndex = 0;

// ===== Utility Functions =====
function getVietnamTime() {
    // Get current time in Vietnam timezone (GMT+7)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const vietnamTime = new Date(utc + (3600000 * 7));
    return vietnamTime;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function calculateTimeRemaining(targetDate) {
    const now = getVietnamTime();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0
        };
    }
    
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference
    };
}

function formatCountdown(days) {
    if (days === 0) {
        return "Hôm nay!";
    } else if (days === 1) {
        return "Còn 1 ngày";
    } else {
        return `Còn ${days} ngày`;
    }
}

// ===== Display Current Date =====
function displayCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    const now = getVietnamTime();
    currentDateElement.textContent = formatDate(now);
}

// ===== Main Countdown (Tết Nguyên Đán) =====
function updateMainCountdown() {
    const tetDate = new Date("2026-02-17T00:00:00+07:00");
    const timeRemaining = calculateTimeRemaining(tetDate);
    
    document.getElementById('days').textContent = String(timeRemaining.days).padStart(2, '0');
    document.getElementById('hours').textContent = String(timeRemaining.hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(timeRemaining.minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(timeRemaining.seconds).padStart(2, '0');
    
    if (timeRemaining.total <= 0) {
        document.querySelector('.subtitle').textContent = "Chúc Mừng Năm Mới! 🎊";
    }
}

// ===== Events Slider =====
function createEventCard(event) {
    const now = getVietnamTime();
    const timeRemaining = calculateTimeRemaining(event.date);
    
    // Skip past events
    if (timeRemaining.total <= 0) {
        return null;
    }
    
    const article = document.createElement('article');
    article.className = 'event-card';
    
    article.innerHTML = `
        <div class="event-icon">${event.icon}</div>
        <h3 class="event-name">${event.name}</h3>
        <p class="event-date">${formatDate(event.date)}</p>
        <div class="event-countdown">${formatCountdown(timeRemaining.days)}</div>
    `;
    
    return article;
}

function initializeSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    sliderTrack.innerHTML = '';
    
    // Filter and sort upcoming events
    const now = getVietnamTime();
    const upcomingEvents = events
        .filter(event => event.date > now)
        .sort((a, b) => a.date - b.date);
    
    upcomingEvents.forEach(event => {
        const card = createEventCard(event);
        if (card) {
            sliderTrack.appendChild(card);
        }
    });
    
    // Defer button update to avoid layout shift
    requestAnimationFrame(() => {
        updateSliderButtons();
    });
}

function updateSliderButtons() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    
    if (!sliderTrack || !prevBtn || !nextBtn) return;
    
    const totalCards = sliderTrack.children.length;
    const containerWidth = sliderWrapper.getBoundingClientRect().width;
    const cardWidth = 300; // card width
    const gap = 24; // gap between cards
    const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
    const maxSlideIndex = Math.max(0, totalCards - visibleCards);
    
    // Show/hide buttons based on need
    if (totalCards <= visibleCards) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
    
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex >= maxSlideIndex;
}

function slideEvents(direction) {
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const totalCards = sliderTrack.children.length;
    const containerWidth = sliderWrapper.getBoundingClientRect().width;
    const cardWidth = 300;
    const gap = 24;
    const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    currentSlideIndex += direction;
    currentSlideIndex = Math.max(0, Math.min(currentSlideIndex, maxIndex));
    
    const translateX = -(currentSlideIndex * (cardWidth + gap));
    sliderTrack.style.transform = `translateX(${translateX}px)`;
    
    updateSliderButtons();
}

// ===== Tab Navigation =====
function initializeTabNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and tabs
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding tab
            const tabId = link.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ===== Event Listeners =====
function initializeEventListeners() {
    // Slider buttons
    document.querySelector('.prev-btn').addEventListener('click', () => slideEvents(-1));
    document.querySelector('.next-btn').addEventListener('click', () => slideEvents(1));
    
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderTrack = document.getElementById('sliderTrack');
    
    // Variables for drag/swipe
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    
    // Touch events for mobile
    sliderWrapper.addEventListener('touchstart', touchStart);
    sliderWrapper.addEventListener('touchend', touchEnd);
    sliderWrapper.addEventListener('touchmove', touchMove);
    
    // Mouse events for desktop
    sliderWrapper.addEventListener('mousedown', touchStart);
    sliderWrapper.addEventListener('mouseup', touchEnd);
    sliderWrapper.addEventListener('mouseleave', touchEnd);
    sliderWrapper.addEventListener('mousemove', touchMove);
    
    function touchStart(event) {
        if (event.type === 'touchstart') {
            startX = event.touches[0].clientX;
        } else {
            startX = event.clientX;
            event.preventDefault();
        }
        
        isDragging = true;
        sliderWrapper.style.cursor = 'grabbing';
        
        // Get current transform value
        const transformValue = sliderTrack.style.transform;
        if (transformValue && transformValue !== 'none') {
            const matrix = transformValue.match(/translateX\(([^)]+)px\)/);
            if (matrix) {
                prevTranslate = parseFloat(matrix[1]);
            }
        }
        
        animationID = requestAnimationFrame(animation);
    }
    
    function touchMove(event) {
        if (!isDragging) return;
        
        const currentX = event.type === 'touchmove' 
            ? event.touches[0].clientX 
            : event.clientX;
        
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        
        // Add resistance at boundaries
        const sliderTrack = document.getElementById('sliderTrack');
        const containerWidth = sliderWrapper.offsetWidth;
        const cardWidth = 300;
        const gap = 24;
        const totalCards = sliderTrack.children.length;
        const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
        const maxTranslate = 0;
        const minTranslate = -((totalCards - visibleCards) * (cardWidth + gap));
        
        if (currentTranslate > maxTranslate) {
            currentTranslate = maxTranslate + (currentTranslate - maxTranslate) * 0.3;
        } else if (currentTranslate < minTranslate) {
            currentTranslate = minTranslate + (currentTranslate - minTranslate) * 0.3;
        }
    }
    
    function touchEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        sliderWrapper.style.cursor = 'grab';
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        
        // If moved enough, slide to next/prev
        if (movedBy < -50) {
            slideEvents(1);
        } else if (movedBy > 50) {
            slideEvents(-1);
        } else {
            // Snap back to current position
            const cardWidth = 300;
            const gap = 24;
            const translateX = -(currentSlideIndex * (cardWidth + gap));
            sliderTrack.style.transform = `translateX(${translateX}px)`;
        }
    }
    
    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }
    
    function setSliderPosition() {
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    // Set cursor style
    sliderWrapper.style.cursor = 'grab';
    
    // Prevent default drag behavior on images/links
    sliderWrapper.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Window resize
    window.addEventListener('resize', () => {
        currentSlideIndex = 0;
        currentTranslate = 0;
        prevTranslate = 0;
        sliderTrack.style.transform = 'translateX(0)';
        updateSliderButtons();
    });
}

// ===== Initialize Everything =====
function initialize() {
    // Display current date
    displayCurrentDate();
    
    // Initialize main countdown
    updateMainCountdown();
    setInterval(updateMainCountdown, 1000);
    
    // Initialize slider
    initializeSlider();
    
    // Update slider every minute to refresh countdowns
    setInterval(initializeSlider, 60000);
    
    // Initialize tab navigation
    initializeTabNavigation();
    
    // Initialize event listeners
    initializeEventListeners();
}

// ===== Start the Application =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    // DOM is already loaded
    initialize();
}
