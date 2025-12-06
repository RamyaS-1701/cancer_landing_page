// Fetch and display a motivational quote on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchQuote();
    setupFormListener();
    initializeCarousel();
});

// Function to fetch quote from the API
async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        displayQuote(data.content, data.author);
    } catch (error) {
        console.error('Error fetching quote:', error);
        // Fallback quote if API fails
        displayQuote(
            'Every moment is a chance to turn your life around.',
            'Zig Ziglar'
        );
    }
}

// Display quote in the DOM
function displayQuote(quote, author) {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    // Add fade effect
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    // Update content after fade out
    setTimeout(() => {
        quoteText.textContent = `"${quote}"`;
        quoteAuthor.textContent = `— ${author}`;
        
        // Fade in
        quoteText.style.transition = 'opacity 0.6s ease-in';
        quoteAuthor.style.transition = 'opacity 0.6s ease-in';
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 300);
}

// Setup form submission listener
function setupFormListener() {
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(contactForm, formNote);
    });
}

// Handle form submission
function handleFormSubmit(form, noteElement) {
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        showMessage(noteElement, 'Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showMessage(noteElement, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (no backend)
    submitForm(name, email, message, noteElement, form);
}

// Simple email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission
function submitForm(name, email, message, noteElement, form) {
    // Show loading state
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate network delay
    setTimeout(() => {
        // Store data in localStorage (for demonstration)
        const formData = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toLocaleString()
        };
        
        let submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('submissions', JSON.stringify(submissions));
        
        // Clear form note
        noteElement.textContent = '';
        noteElement.className = '';
        
        // Show welcome message and trigger hope celebration
        showWelcomeMessage();
        triggerHopeCelebration();
        
        // Reset form
        form.reset();
        
        // Restore button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Show message to user
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = type;
}

// Show welcome message
function showWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.classList.remove('hidden');
}

// Close welcome message
function closeWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.classList.add('hidden');
}

// Celebration flowers/emojis
const celebrationEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🎀', '🎊', '💕', '✨'];

// Hope colors for particles - soft, meaningful palette
const hopeColors = [
    '#ff69b4',  // Pink
    '#e891c9',  // Soft Pink
    '#d4a5d4',  // Lavender
    '#f0b3e6',  // Light Pink
    '#e6c0f0',  // Light Purple
    '#ff8fa3',  // Salmon Pink
    '#ffb3d9'   // Light Rose
];

// Hope symbols/ribbons
const hopeSymbols = ['♥', '✨', '💚', '✦', '※'];

// Store hope celebration state
let isHopeCelebrating = false;
let hopeIntervalId = null;

// Trigger hope celebration animation (upward floating ribbons & particles)
function triggerHopeCelebration() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        console.log('Reduced motion preference detected - skipping animation');
        return;
    }
    
    // Stop any existing celebration
    if (isHopeCelebrating) {
        return;
    }
    
    isHopeCelebrating = true;
    const container = document.getElementById('hopeContainer');
    
    // Create initial burst of particles and ribbons
    for (let i = 0; i < 8; i++) {
        const ribbon = createHopeRibbon();
        container.appendChild(ribbon);
    }
    for (let i = 0; i < 12; i++) {
        const particle = createHopeParticle();
        container.appendChild(particle);
    }
    
    // Continuously add new particles and ribbons
    hopeIntervalId = setInterval(() => {
        if (isHopeCelebrating) {
            // Add particle
            if (Math.random() > 0.4) {
                const particle = createHopeParticle();
                container.appendChild(particle);
                
                // Remove particle after it rises off screen
                const animationDuration = parseFloat(particle.style.animationDuration.split(',')[0]) * 1000;
                setTimeout(() => {
                    particle.remove();
                }, animationDuration);
            }
            
            // Add ribbon occasionally
            if (Math.random() > 0.7) {
                const ribbon = createHopeRibbon();
                container.appendChild(ribbon);
                
                // Remove ribbon after it rises off screen
                const animationDuration = parseFloat(ribbon.style.animationDuration.split(',')[0]) * 1000;
                setTimeout(() => {
                    ribbon.remove();
                }, animationDuration);
            }
        }
    }, 400); // Add particles every 400ms
}

// Stop hope celebration
function stopHopeCelebration() {
    isHopeCelebrating = false;
    
    if (hopeIntervalId) {
        clearInterval(hopeIntervalId);
        hopeIntervalId = null;
    }
}

// Create individual hope ribbon element
function createHopeRibbon() {
    const ribbon = document.createElement('div');
    ribbon.classList.add('hope-ribbon', 'rising');
    
    // Random hope symbol
    const randomSymbol = hopeSymbols[Math.floor(Math.random() * hopeSymbols.length)];
    ribbon.textContent = randomSymbol;
    
    // Random horizontal position
    const randomLeft = Math.random() * 100;
    ribbon.style.left = randomLeft + '%';
    
    // Random color
    const randomColor = hopeColors[Math.floor(Math.random() * hopeColors.length)];
    ribbon.style.color = randomColor;
    
    // Random size
    const randomSize = 1.5 + Math.random() * 2;
    ribbon.style.fontSize = randomSize + 'rem';
    
    // Random animation duration (6-9 seconds for slower, more meaningful rise)
    const randomDuration = 6 + Math.random() * 3;
    ribbon.style.animationDuration = randomDuration + 's';
    
    // Random sway speed
    const randomSwayDuration = 4 + Math.random() * 2;
    ribbon.style.setProperty('--sway-duration', randomSwayDuration + 's');
    
    // Apply custom animation timings
    ribbon.style.animation = `
        riseUp ${randomDuration}s linear,
        floatSway ${randomSwayDuration}s ease-in-out infinite
    `;
    
    // Add hover interactivity
    ribbon.addEventListener('mouseenter', () => {
        ribbon.style.animationPlayState = 'paused';
    });
    
    ribbon.addEventListener('mouseleave', () => {
        ribbon.style.animationPlayState = 'running';
    });
    
    return ribbon;
}

// Create individual hope particle element (glowing dot)
function createHopeParticle() {
    const particle = document.createElement('div');
    particle.classList.add('hope-particle', 'rising');
    
    // Random horizontal position
    const randomLeft = Math.random() * 100;
    particle.style.left = randomLeft + '%';
    
    // Random color
    const randomColor = hopeColors[Math.floor(Math.random() * hopeColors.length)];
    particle.style.color = randomColor;
    particle.style.backgroundColor = randomColor;
    
    // Random size (8-18px)
    const randomSize = 8 + Math.random() * 10;
    particle.style.width = randomSize + 'px';
    particle.style.height = randomSize + 'px';
    
    // Random animation duration (5-8 seconds)
    const randomDuration = 5 + Math.random() * 3;
    particle.style.animationDuration = randomDuration + 's';
    
    // Apply custom animation timings
    particle.style.animation = `
        riseUp ${randomDuration}s linear,
        glow 1.5s ease-in-out infinite
    `;
    
    // Add hover interactivity - bounce effect
    particle.addEventListener('mouseenter', () => {
        particle.style.animationPlayState = 'paused';
        particle.style.transform = 'scale(1.4)';
        particle.style.filter = 'brightness(1.3)';
    });
    
    particle.addEventListener('mouseleave', () => {
        particle.style.animationPlayState = 'running';
        particle.style.transform = 'scale(1)';
        particle.style.filter = 'brightness(1)';
    });
    
    return particle;
}

// ===== SURVIVOR STORIES CAROUSEL =====

// Sample survivor stories data
const survivorStories = [
    {
        name: 'Emily Chen',
        type: 'Leukemia',
        years: '7 years cancer-free',
        quote: '"My diagnosis at 28 felt devastating, but the community of survivors I found gave me strength. We are warriors, not victims. Every day cancer-free is a victory I celebrate."',
        initials: 'EC',
        color: '#FF9F43'
    },
    {
        name: 'Sarah Johnson',
        type: 'Breast Cancer',
        years: '5 years cancer-free',
        quote: '"The support system around me changed everything. From my family to doctors to fellow survivors—we lifted each other up. Together, we shine brighter than any darkness."',
        initials: 'SJ',
        color: '#FF6B9D'
    },
    {
        name: 'Michael Torres',
        type: 'Lymphoma',
        years: '10 years cancer-free',
        quote: '"Hope isn\'t just a feeling; it\'s a choice we make every single day. I chose hope, and it brought me here. If I can inspire one person, then this journey was worth it."',
        initials: 'MT',
        color: '#D4A5D4'
    },
    {
        name: 'Jessica Martinez',
        type: 'Ovarian Cancer',
        years: '3 years cancer-free',
        quote: '"My fight against cancer taught me resilience. I discovered strength I never knew I had. Now I use that strength to support others on their journeys."',
        initials: 'JM',
        color: '#A8E6CF'
    },
    {
        name: 'David Park',
        type: 'Lung Cancer',
        years: '8 years cancer-free',
        quote: '"Awareness saved my life. Early detection and a strong support network made all the difference. I\'m here today to tell you—never lose hope."',
        initials: 'DP',
        color: '#FFB6C1'
    }
];

let currentStoryIndex = 0;

// Initialize carousel
function initializeCarousel() {
    renderCarousel();
    renderIndicators();
}

// Render carousel stories
function renderCarousel() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';
    
    survivorStories.forEach((story, index) => {
        const card = document.createElement('div');
        card.classList.add('story-card');
        
        card.innerHTML = `
            <p class="story-quote">${story.quote}</p>
            <div class="story-avatar" style="background: linear-gradient(135deg, ${story.color} 0%, ${adjustBrightness(story.color, -20)} 100%);">
                ${story.initials}
            </div>
            <h3 class="story-name">${story.name}</h3>
            <p class="story-info">${story.type} • ${story.years}</p>
            <span class="survivor-badge">✨ Survivor</span>
        `;
        
        track.appendChild(card);
    });
    
    updateCarouselPosition();
}

// Render indicators
function renderIndicators() {
    const indicators = document.getElementById('carouselIndicators');
    indicators.innerHTML = '';
    
    survivorStories.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === currentStoryIndex) {
            indicator.classList.add('active');
        }
        indicator.onclick = () => goToStory(index);
        indicators.appendChild(indicator);
    });
}

// Update carousel position
function updateCarouselPosition() {
    const track = document.getElementById('carouselTrack');
    const offset = currentStoryIndex * -100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentStoryIndex);
    });
}

// Navigate to next story
function nextStory() {
    currentStoryIndex = (currentStoryIndex + 1) % survivorStories.length;
    updateCarouselPosition();
}

// Navigate to previous story
function prevStory() {
    currentStoryIndex = (currentStoryIndex - 1 + survivorStories.length) % survivorStories.length;
    updateCarouselPosition();
}

// Go to specific story
function goToStory(index) {
    currentStoryIndex = index;
    updateCarouselPosition();
}

// Helper function to adjust color brightness
function adjustBrightness(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
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

// Add animation on scroll (optional enhancement)
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

// Observe sections for fade-in effect
document.querySelectorAll('.quotes-section, .contact-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
