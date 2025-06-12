// Typing Animation
const typingTextElement = document.querySelector('.typing-text');
const cursorElement = document.querySelector('.cursor');
const textArray = [
    "Coding the future, one line at a time",
    "Full Stack Developer",
    "Problem Solver",
    "Tech Enthusiast"
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isTypingPaused = false;

function type() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Set typing speed
    let typingSpeed = isDeleting ? 30 : 100;
    
    // Pause at the end of typing or deleting
    if (!isDeleting && charIndex === currentText.length) {
        isTypingPaused = true;
        typingSpeed = 1500; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isTypingPaused = true;
        typingSpeed = 500; // Pause before typing next text
    }

    // Move to next text or start deleting
    setTimeout(() => {
        if (isTypingPaused) {
            isDeleting = !isDeleting;
            isTypingPaused = false;
            
            if (!isDeleting) {
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
            }
        }
        
        type();
    }, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typingTextElement) {
        setTimeout(type, 1000);
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Prevent background scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars when in viewport
const skillBars = document.querySelectorAll('.skill-per');

function animateSkillBars() {
    skillBars.forEach(skill => {
        const percentage = skill.getAttribute('per');
        skill.style.width = percentage + '%';
    });
}

// Initialize Particles.js for background effect
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00d9ff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00d9ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Project Modal Functionality
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalBody = document.querySelector('.modal-body');
const closeModal = document.querySelector('.close-modal');

// Open modal with project details
if (projectCards.length > 0 && modal) {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const image = card.querySelector('img').src;
            const techSpans = card.querySelectorAll('.project-tech span');
            let techHtml = '';
            
            techSpans.forEach(span => {
                techHtml += `<span>${span.textContent}</span>`;
            });
            
            modalBody.innerHTML = `
                <div class="modal-project">
                    <div class="modal-project-img">
                        <img src="${image}" alt="${title}">
                    </div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="project-tech">
                        ${techHtml}
                    </div>
                    <div class="project-links">
                        <a href="#" class="btn-small">View Project</a>
                        <a href="#" class="btn-small">GitHub</a>
                    </div>
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just log it
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Clear form
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill bars when About section is visible
            if (entry.target.id === 'about') {
                animateSkillBars();
            }
            
            // Add fade-in animation to sections
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Animate elements when they enter viewport
const fadeElements = document.querySelectorAll('.section-title, .project-card, .timeline-item, .contact-item');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Lazy load images for better performance
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// Add touch event listeners for better mobile interaction
document.querySelectorAll('.btn, .btn-small, .contact-btn, .resume-btn').forEach(button => {
    button.addEventListener('touchstart', () => {
        button.classList.add('touch-active');
    });
    
    button.addEventListener('touchend', () => {
        button.classList.remove('touch-active');
    });
});

// Optimize particles.js for mobile
function optimizeParticlesForMobile() {
    if (window.innerWidth < 768 && window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30 },
                size: { value: 2 },
                move: { speed: 0.5 }
            }
        });
    }
}

window.addEventListener('resize', optimizeParticlesForMobile);
document.addEventListener('DOMContentLoaded', optimizeParticlesForMobile);
