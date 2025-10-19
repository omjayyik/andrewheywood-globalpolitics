// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// Chapter Navigation Functions
function getCurrentChapterNumber() {
    const currentPage = window.location.pathname;
    const match = currentPage.match(/Ch(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
}

function getPreviousChapter() {
    const currentChapter = getCurrentChapterNumber();
    if (currentChapter && currentChapter > 1) {
        return `Ch${currentChapter - 1}.html`;
    }
    return null;
}

function getNextChapter() {
    const currentChapter = getCurrentChapterNumber();
    if (currentChapter && currentChapter < 21) {
        return `Ch${currentChapter + 1}.html`;
    }
    return null;
}

function updateChapterNavigation() {
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');
    const currentChapter = getCurrentChapterNumber();
    
    if (prevBtn) {
        const prevChapter = getPreviousChapter();
        if (prevChapter) {
            prevBtn.href = prevChapter;
            prevBtn.style.display = 'inline-block';
        } else {
            prevBtn.style.display = 'none';
        }
    }
    
    if (nextBtn) {
        const nextChapter = getNextChapter();
        if (nextChapter) {
            nextBtn.href = nextChapter;
            nextBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'none';
        }
    }
}

// Initialize chapter navigation when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateChapterNavigation();
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add animation classes to elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe chapter cards and other elements
    const elementsToAnimate = document.querySelectorAll('.chapter-card, .section-title, .section-description');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Only handle keyboard navigation on chapter pages
    if (!window.location.pathname.includes('Ch') || window.location.pathname === '/index.html') {
        return;
    }
    
    const currentChapter = getCurrentChapterNumber();
    
    // Left arrow key - previous chapter
    if (e.key === 'ArrowLeft' && currentChapter && currentChapter > 1) {
        const prevChapter = getPreviousChapter();
        if (prevChapter) {
            window.location.href = prevChapter;
        }
    }
    
    // Right arrow key - next chapter
    if (e.key === 'ArrowRight' && currentChapter && currentChapter < 21) {
        const nextChapter = getNextChapter();
        if (nextChapter) {
            window.location.href = nextChapter;
        }
    }
    
    // Home key - go to index
    if (e.key === 'Home') {
        window.location.href = 'index.html';
    }
});

// Add loading state to navigation buttons
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Reset after a short delay
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 500);
        });
    });
});

// Chapter progress tracking (optional feature)
function updateChapterProgress() {
    const currentChapter = getCurrentChapterNumber();
    if (currentChapter) {
        const progress = (currentChapter / 21) * 100;
        const progressBar = document.getElementById('chapter-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }
}

// Initialize progress tracking
document.addEventListener('DOMContentLoaded', function() {
    updateChapterProgress();
});

// Print functionality
function printPage() {
    window.print();
}

// Add print button to chapter pages (optional)
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('Ch')) {
        const printBtn = document.createElement('button');
        printBtn.textContent = '🖨️ Print';
        printBtn.className = 'nav-btn secondary';
        printBtn.onclick = printPage;
        
        const chapterNav = document.querySelector('.chapter-nav-links');
        if (chapterNav) {
            chapterNav.appendChild(printBtn);
        }
    }
});

// Error handling for missing pages
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
    }
});

// Console welcome message
console.log('📘 Social Research Methods - Learning Summary');
console.log('Website loaded successfully!');
console.log('Use arrow keys to navigate between chapters.');
