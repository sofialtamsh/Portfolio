// Particle Animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const mouseRadius = 150;
    
    // Mouse position
    let mouse = {
        x: null,
        y: null,
        radius: mouseRadius
    };
    
    // Handle window resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Track mouse movement
    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    let angle = Math.atan2(dy, dx);
                    let force = (mouse.radius - distance) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }
            
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 206, 201, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connections between particles
    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.strokeStyle = `rgba(0, 206, 201, ${1 - distance/connectionDistance})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connect();
        requestAnimationFrame(animate);
    }
    
    // Start animation
    init();
    animate();
    
    // Reset mouse position when mouse leaves window
    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });
});

// Typing Effect
document.addEventListener('DOMContentLoaded', function() {
    const typingName = document.querySelector('.typing-name');
    const typingRole = document.querySelector('.typing-role');
    const typingLocation = document.querySelector('.typing-location');
    const socialLinksContainer = document.querySelector('.social-links-container');
    
    function startTypingAnimation() {
        // Reset text content and classes
        typingName.textContent = '';
        typingRole.textContent = '';
        typingLocation.textContent = '';
        
        const texts = {
            name: 'Sofi Altamsh',
            role: 'ML/NLP Engineer',
            location: 'Bangalore, Karnataka'
        };
        
        let nameIndex = 0;
        let roleIndex = 0;
        let locationIndex = 0;
        
        // Type name
        function typeName() {
            if (nameIndex < texts.name.length) {
                typingName.textContent += texts.name.charAt(nameIndex);
                nameIndex++;
                setTimeout(typeName, 70);
            } else {
                setTimeout(typeRole, 500);
            }
        }
        
        // Type role
        function typeRole() {
            if (roleIndex < texts.role.length) {
                typingRole.textContent += texts.role.charAt(roleIndex);
                roleIndex++;
                setTimeout(typeRole, 70);
            } else {
                setTimeout(typeLocation, 500);
            }
        }
        
        // Type location
        function typeLocation() {
            if (locationIndex < texts.location.length) {
                typingLocation.textContent += texts.location.charAt(locationIndex);
                locationIndex++;
                setTimeout(typeLocation, 70);
            } else {
                // Show social links
                socialLinksContainer.classList.remove('d-none');
                socialLinksContainer.classList.add('show');
                
                // Wait before starting over
                setTimeout(() => {
                    // Hide text with fade effect
                    typingName.style.opacity = '0';
                    typingRole.style.opacity = '0';
                    typingLocation.style.opacity = '0';
                    
                    setTimeout(() => {
                        // Reset and start over
                        typingName.style.opacity = '1';
                        typingRole.style.opacity = '1';
                        typingLocation.style.opacity = '1';
                        startTypingAnimation();
                    }, 500);
                }, 4000); // Wait 4 seconds before restarting
            }
        }
        
        // Start the sequence
        setTimeout(typeName, 500);
    }
    
    // Initial start
    startTypingAnimation();
});

// Intersection Observer for section animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation classes to elements when they come into view
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe elements to animate
document.querySelectorAll('.skill-category, .project-card, .experience-item, .education-item').forEach(element => {
    animateOnScroll.observe(element);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update hero background gradients
    const x = mouseX / window.innerWidth;
    const y = mouseY / window.innerHeight;
    
    const hero = document.getElementById('hero');
    hero.style.background = `
        radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0, 206, 201, 0.15) 0%, transparent 40%),
        radial-gradient(circle at ${(1 - x) * 100}% ${y * 100}%, rgba(108, 92, 231, 0.15) 0%, transparent 40%),
        radial-gradient(circle at ${x * 100}% ${(1 - y) * 100}%, rgba(0, 184, 148, 0.1) 0%, transparent 50%),
        radial-gradient(circle at ${(1 - x) * 100}% ${(1 - y) * 100}%, rgba(0, 206, 201, 0.15) 0%, transparent 40%),
        radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(108, 92, 231, 0.15) 0%, transparent 40%),
        linear-gradient(135deg, var(--bg-color), var(--card-bg))
    `;
});

// Animate cursor
function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
document.querySelectorAll('a, button, .skill-category, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in');
    sectionObserver.observe(section);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

function submitForm() {
  const form = document.querySelector('.my-form');
  const formData = new FormData(form);
  const url = 'https://formsubmit.co/sofialtamsh123@gmail.com.com';

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    alert('Form submitted successfully!');
    form.reset();
  })
  .catch(error => {
    alert('Error submitting form: ' + error);
  });

  return false; // Prevents the default form submission and page reload
}
