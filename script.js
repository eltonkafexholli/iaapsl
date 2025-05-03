// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            isNavigating = true;
            const targetPosition = target.offsetTop - 100;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            setTimeout(() => {
                isNavigating = false;
            }, 1000);
        }
    });
});

// Book and Timeline initialization
const book = document.querySelector('.book');
const timeline = document.querySelector('.timeline');
const timelineItems = document.querySelectorAll('.timeline-item');
const yearIndicator = document.querySelector('.year-indicator');

let isScrolling = false;
let isNavigating = false;
let currentIndex = 0;
let lastScrollTime = Date.now();
let isTimelineClosing = false;
let timelineStepLock = false;
let lastTimelineScrollY = 0;

if (book && timeline) {
    // Hide timeline initially
    timeline.style.display = 'none';
    
    // Book click handler
    book.addEventListener('click', () => {
        if (book.classList.contains('open')) return;
        
        book.classList.add('open');
        
        setTimeout(() => {
            timeline.style.display = 'block';
            requestAnimationFrame(() => {
                timeline.classList.add('visible');
                if (isMobile()) updateMobileTimeline();
            });
            
            timelineItems.forEach((item, index) => {
                item.style.setProperty('--item-index', index);
            });

            // Initialize timeline functionality after elements are visible
            setTimeout(() => {
                updateItemPositions();
                initializeTimeline();
            }, 1000);
        }, 1000);
    });
}

// Calculate and store item positions
let itemPositions = [];

function updateItemPositions() {
    itemPositions = Array.from(timelineItems).map(item => {
        const rect = item.getBoundingClientRect();
        return timeline.offsetTop + item.offsetTop;
    });
}

function updateTimeline(index) {
    if (isMobile()) return;
    if (!timeline || !timelineItems.length) return;

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });

    if (timelineItems[index]) {
        timelineItems[index].style.opacity = '1';
        timelineItems[index].style.transform = 'translateY(0)';

        const year = timelineItems[index].querySelector('.timeline-year').textContent;
        yearIndicator.textContent = year;

        const itemRect = timelineItems[index].getBoundingClientRect();
        const timelineRect = timeline.getBoundingClientRect();
        const relativePosition = itemRect.top - timelineRect.top;
        yearIndicator.style.top = `${relativePosition + itemRect.height / 2}px`;

        // Move the close button to follow the year-indicator
        if (window.innerWidth > 600) {
            const closeBtn = document.querySelector('.timeline-close-btn');
            if (closeBtn) {
                // Offset to center the button above the circle
                closeBtn.style.top = `${relativePosition + itemRect.height / 2 - 40}px`;
            }
        }
    }
}

function smoothScrollTo(target, duration = 400) {
    if (isNavigating) return;
    const start = window.pageYOffset;
    const distance = target - start;
    const startTime = Date.now();
    function scrollAnimation() {
        if (isNavigating) return;
        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeInOutCubic = progress => {
            return progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        };
        window.scrollTo(0, start + (distance * easeInOutCubic(progress)));
        if (progress < 1 && !isNavigating) {
            requestAnimationFrame(scrollAnimation);
        } else {
            isScrolling = false;
        }
    }
    requestAnimationFrame(scrollAnimation);
}

function handleScroll() {
    if (isMobile()) return;
    if (isTimelineClosing) return;
    if (timelineStepLock) return;
    if (!timeline || !timeline.classList.contains('visible') || isNavigating || isScrolling) return;

    const currentTime = Date.now();
    if (currentTime - lastScrollTime < 100) return;
    lastScrollTime = currentTime;

    const timelineRect = timeline.getBoundingClientRect();
    const viewportMiddle = window.innerHeight / 2;

    if (timelineRect.top > window.innerHeight || timelineRect.bottom < 0) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    timelineItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemMiddle = itemRect.top + (itemRect.height / 2);
        const distance = Math.abs(itemMiddle - viewportMiddle);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    // Only lock if the closest box is within 60px of the center (faster pop)
    if (closestDistance < 60 && closestIndex !== currentIndex) {
        currentIndex = closestIndex;
        isScrolling = true;
        const targetScrollPosition = itemPositions[currentIndex];
        smoothScrollTo(targetScrollPosition - (window.innerHeight / 2) + (timelineItems[currentIndex].offsetHeight / 2), 400);
        updateTimeline(currentIndex);
    }
}

function initializeTimeline() {
    // Update positions when window is resized
    window.addEventListener('resize', updateItemPositions);

    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking && !isNavigating) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!timeline.classList.contains('visible') || isNavigating) return;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (currentIndex < timelineItems.length - 1) {
                currentIndex++;
                isScrolling = true;
                smoothScrollTo(itemPositions[currentIndex] - (window.innerHeight / 2) + (timelineItems[currentIndex].offsetHeight / 2));
                updateTimeline(currentIndex);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
                isScrolling = true;
                smoothScrollTo(itemPositions[currentIndex] - (window.innerHeight / 2) + (timelineItems[currentIndex].offsetHeight / 2));
                updateTimeline(currentIndex);
            }
        }
    });

    updateTimeline(0);
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Directions scroll controls
const directionsGrid = document.querySelector('.directions-grid');
const leftControl = document.querySelector('.scroll-control.left');
const rightControl = document.querySelector('.scroll-control.right');
let speedUpTimeout;

if (directionsGrid && leftControl && rightControl) {
    const handleSpeedUp = (direction) => {
        directionsGrid.classList.add('speed-up');
        if (direction === 'left') {
            directionsGrid.style.animationDirection = 'reverse';
        } else {
            directionsGrid.style.animationDirection = 'normal';
        }
    };

    const handleSpeedNormal = () => {
        directionsGrid.classList.remove('speed-up');
        directionsGrid.classList.add('paused');
        
        clearTimeout(speedUpTimeout);
        speedUpTimeout = setTimeout(() => {
            directionsGrid.classList.remove('paused');
        }, 2000);
    };

    // Mouse events
    leftControl.addEventListener('mousedown', () => handleSpeedUp('left'));
    rightControl.addEventListener('mousedown', () => handleSpeedUp('right'));
    
    leftControl.addEventListener('mouseup', handleSpeedNormal);
    rightControl.addEventListener('mouseup', handleSpeedNormal);
    leftControl.addEventListener('mouseleave', handleSpeedNormal);
    rightControl.addEventListener('mouseleave', handleSpeedNormal);

    // Touch events for mobile
    leftControl.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleSpeedUp('left');
    });
    rightControl.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleSpeedUp('right');
    });
    
    leftControl.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleSpeedNormal();
    });
    rightControl.addEventListener('touchend', (e => {
        e.preventDefault();
        handleSpeedNormal();
    }));
}

// Direction popups functionality
const directionCards = document.querySelectorAll('.direction-card');
const popups = document.querySelectorAll('.direction-popup');
const closeButtons = document.querySelectorAll('.popup-close');

// Open popup when clicking a direction card
directionCards.forEach(card => {
    card.addEventListener('click', () => {
        const direction = card.getAttribute('data-direction');
        const popup = document.getElementById(`${direction}-popup`);
        if (popup) {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close popup when clicking close button or outside the popup
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.direction-popup');
        popup.style.display = 'none';
        document.body.style.overflow = '';
    });
});

popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// Gallery Image Popup Logic
const galleryImages = document.querySelectorAll('.masonry-gallery img');
const galleryModal = document.getElementById('gallery-image-modal');
const galleryModalImg = document.getElementById('gallery-image-modal-img');
const galleryModalClose = document.getElementById('gallery-image-modal-close');

if (galleryImages.length && galleryModal && galleryModalImg && galleryModalClose) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            galleryModalImg.src = img.src;
            galleryModalImg.alt = img.alt;
            galleryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    galleryModalClose.addEventListener('click', () => {
        galleryModal.style.display = 'none';
        galleryModalImg.src = '';
        document.body.style.overflow = '';
    });
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            galleryModalImg.src = '';
            document.body.style.overflow = '';
        }
    });
}

// Timeline mobile behavior: only one box visible, no locking, no year-indicator
function isMobile() {
    return window.innerWidth <= 600;
}

function updateMobileTimeline() {
    if (!isMobile() || !timeline || !timelineItems.length) return;
    // On mobile, show all timeline items
    timelineItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.classList.add('active');
        item.style.pointerEvents = 'auto';
    });
}

if (timeline && timelineItems.length) {
    window.addEventListener('scroll', () => {
        if (isMobile()) {
            updateMobileTimeline();
        }
    });
    window.addEventListener('resize', () => {
        if (isMobile()) {
            updateMobileTimeline();
        }
    });
    // Initial state
    if (isMobile()) {
        updateMobileTimeline();
    }
}

const timelineCloseBtn = document.querySelector('.timeline-close-btn');
if (timelineCloseBtn && book && timeline) {
    timelineCloseBtn.addEventListener('click', () => {
        if (window.innerWidth > 600) {
            isTimelineClosing = true;
            let closed = false;
            function closeTimelineAfterScroll() {
                const rect = book.getBoundingClientRect();
                const center = window.innerHeight / 2;
                if (Math.abs(rect.top + rect.height / 2 - center) < 60) {
                    if (!closed) {
                        closed = true;
                        book.classList.remove('open');
                        timeline.classList.remove('visible');
                        setTimeout(() => {
                            timeline.style.display = 'none';
                            isTimelineClosing = false;
                        }, 300);
                        window.removeEventListener('scroll', closeTimelineAfterScroll);
                    }
                }
            }
            window.addEventListener('scroll', closeTimelineAfterScroll);
            book.scrollIntoView({behavior: 'smooth', block: 'center'});
            // Fallback: close after 2s if scroll event doesn't fire
            setTimeout(() => {
                if (!closed) {
                    closed = true;
                    book.classList.remove('open');
                    timeline.classList.remove('visible');
                    setTimeout(() => {
                        timeline.style.display = 'none';
                        isTimelineClosing = false;
                    }, 300);
                    window.removeEventListener('scroll', closeTimelineAfterScroll);
                }
            }, 2000);
        }
    });
}

if (timeline && window.innerWidth > 600) {
    timeline.addEventListener('wheel', function(e) {
        if (!timeline.classList.contains('visible') || isTimelineClosing) return;
        if (timelineStepLock) return;
        e.preventDefault();
        let direction = e.deltaY > 0 ? 1 : -1;
        let nextIndex = currentIndex + direction;
        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex > timelineItems.length - 1) nextIndex = timelineItems.length - 1;
        if (nextIndex !== currentIndex) {
            currentIndex = nextIndex;
            isScrolling = true;
            const targetScrollPosition = itemPositions[currentIndex];
            smoothScrollTo(targetScrollPosition - (window.innerHeight / 2) + (timelineItems[currentIndex].offsetHeight / 2), 400);
            updateTimeline(currentIndex);
        }
        timelineStepLock = true;
        setTimeout(() => {
            timelineStepLock = false;
        }, 1500);
    }, { passive: false });
}























// Modern Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.modern-navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navIndicator = document.querySelector('.nav-indicator');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Active link indicator
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            // Check if the href matches the current section ID
            if (href === `#${currentSection}`) {
                item.classList.add('active');
                
                // Update indicator position
                const itemRect = item.getBoundingClientRect();
                const navbarRect = navbar.getBoundingClientRect();
                
                navIndicator.style.width = `${itemRect.width}px`;
                navIndicator.style.left = `${itemRect.left - navbarRect.left}px`;
                navIndicator.classList.add('visible');
            }
        });
    }
    
    // Set active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Set active link on page load
    setActiveLink();
    
    // Smooth scroll for nav links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
}); 