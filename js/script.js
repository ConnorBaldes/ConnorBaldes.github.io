// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const collapsibleButtons = document.querySelectorAll('.collapsible-button');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Collapsible content
collapsibleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            this.textContent = 'Hide Courses';
        } else {
            this.textContent = 'View Notable Courses';
        }
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        // Simple validation
        if (!nameField.value || !emailField.value || !messageField.value) {
            alert('Please fill out all fields');
            return;
        }
        
        // Here you would typically send form data to a backend service
        // For a GitHub Pages site without backend, we'll just show a success message
        alert('Thank you for your message! In a real application, this would be sent to a backend service.');
        
        // Reset form
        contactForm.reset();
    });
}

// Animation on scroll - Simple implementation
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.project-card, .timeline-content, .skill-category, .contact-content > *');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize elements with fade-in animation styles and set up contact icons
document.addEventListener('DOMContentLoaded', function() {
    // Set up animations
    const elements = document.querySelectorAll('.project-card, .timeline-content, .skill-category, .contact-content > *');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Make contact icons clickable
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        const paragraph = item.querySelector('p');
        
        if (icon && paragraph) {
            const linkElement = paragraph.querySelector('a');
            if (linkElement) {
                const linkUrl = linkElement.getAttribute('href');
                
                // Create a new anchor element
                const anchor = document.createElement('a');
                anchor.setAttribute('href', linkUrl);
                
                // If it's not an email link, open in new tab
                if (!linkUrl.startsWith('mailto:')) {
                    anchor.setAttribute('target', '_blank');
                    anchor.setAttribute('rel', 'noopener noreferrer'); // Security best practice
                }
                
                // Clone the icon and append it to the anchor
                const clonedIcon = icon.cloneNode(true);
                anchor.appendChild(clonedIcon);
                
                // Replace the original icon with the linked icon
                icon.parentNode.replaceChild(anchor, icon);
                
                // Remove the paragraph with the text link
                item.removeChild(paragraph);
            }
        }
    });
    
    // Trigger scroll event to check elements in initial viewport
    window.dispatchEvent(new Event('scroll'));
});