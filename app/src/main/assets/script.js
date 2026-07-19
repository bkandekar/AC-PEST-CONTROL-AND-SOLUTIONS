// CONFIG CONSTANTS
        const WHATSAPP_PHONE = "8329931123"; // Real phone format: country code + numbers (no special chars)

        // STICKY HEADER & SCROLL SHADOW
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // RESPONSIVE MENU TOGGLE
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        function closeMenu() {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.replace('fa-xmark', 'fa-bars');
        }

        // Close menu when clicking outside of it on mobile
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // BOOK NOW LINK DROPDOWN AUTO-SELECTOR
        const serviceBookLinks = document.querySelectorAll('.service-book-link');
        const serviceSelect = document.getElementById('service');

        serviceBookLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const serviceVal = link.getAttribute('data-service');
                if (serviceVal) {
                    serviceSelect.value = serviceVal;
                }
            });
        });

        function selectPricing(serviceVal) {
            if (serviceVal) {
                serviceSelect.value = serviceVal;
            }
        }

        const viewAllBtn = document.getElementById('view-all-services-btn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                serviceSelect.focus();
            });
        }

        // TESTIMONIALS CAROUSEL ENGINE
        const testimonials = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const dotsContainer = document.getElementById('carousel-dots-container');
        let currentTestimonialIndex = 0;
        let carouselInterval;

        // Create dots dynamically
        testimonials.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (idx === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
            dot.addEventListener('click', () => {
                showTestimonial(idx);
                resetCarouselTimer();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carousel-dot');

        function showTestimonial(index) {
            testimonials[currentTestimonialIndex].classList.remove('active');
            dots[currentTestimonialIndex].classList.remove('active');
            
            currentTestimonialIndex = (index + testimonials.length) % testimonials.length;
            
            testimonials[currentTestimonialIndex].classList.add('active');
            dots[currentTestimonialIndex].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonialIndex - 1);
            resetCarouselTimer();
        });

        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonialIndex + 1);
            resetCarouselTimer();
        });

        function startCarouselTimer() {
            carouselInterval = setInterval(() => {
                showTestimonial(currentTestimonialIndex + 1);
            }, 6000);
        }

        function resetCarouselTimer() {
            clearInterval(carouselInterval);
            startCarouselTimer();
        }

        startCarouselTimer();

        // FAQ ACCORDION ENGINE
        const faqHeaders = document.querySelectorAll('.faq-header');

        faqHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = item.querySelector('.faq-content');
                const isActive = item.classList.contains('active');

                // Collapse other active FAQs
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = null;
                    }
                });

                item.classList.toggle('active');

                if (!isActive) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        });

        // GOOGLE ANALYTICS EVENT TRACKING SNIPPETS
        // WhatsApp button clicked tracker
        function trackWhatsAppClick(locationLabel) {
            console.log(`GA Event Triggered: whatsapp_button_click - Location: ${locationLabel}`);
            /* HTML Comment: Active GA4 call */
            if (typeof gtag === 'function') {
                gtag('event', 'whatsapp_button_click', {
                    'button_location': locationLabel
                });
            }
        }

        // Form submit tracker
        function trackFormSubmit(selectedService) {
            console.log(`GA Event Triggered: booking_form_submit - Service: ${selectedService}`);
            /* HTML Comment: Active GA4 call */
            if (typeof gtag === 'function') {
                gtag('event', 'booking_form_submit', {
                    'selected_service': selectedService
                });
            }
        }

        // Attach GA events to pure WhatsApp anchors
        const floatingWhatsApp = document.getElementById('whatsapp-floating-btn');
        if (floatingWhatsApp) {
            floatingWhatsApp.addEventListener('click', () => trackWhatsAppClick('Floating Button'));
        }

        const heroWhatsApp = document.getElementById('hero-whatsapp-btn');
        if (heroWhatsApp) {
            heroWhatsApp.addEventListener('click', () => trackWhatsAppClick('Hero Section Button'));
        }

        // LEAD FORM SUBMISSION + REDIRECT TO WHATSAPP
        const leadForm = document.getElementById('leadForm');

        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameField = document.getElementById('name');
            const phoneField = document.getElementById('phone');
            const addressField = document.getElementById('address');
            const serviceField = document.getElementById('service');
            const messageField = document.getElementById('message');

            // Client side validation check
            let isValid = true;

            // Reset focus states
            [nameField, phoneField, addressField, serviceField].forEach(field => {
                field.style.borderColor = '';
            });

            if (!nameField.value.trim()) {
                nameField.style.borderColor = '#dc3545';
                isValid = false;
            }
            if (!phoneField.value.trim() || phoneField.value.trim().length < 7) {
                phoneField.style.borderColor = '#dc3545';
                isValid = false;
            }
            if (!addressField.value.trim()) {
                addressField.style.borderColor = '#dc3545';
                isValid = false;
            }
            if (!serviceField.value) {
                serviceField.style.borderColor = '#dc3545';
                isValid = false;
            }

            if (!isValid) {
                alert("Please complete all required fields correctly before submitting.");
                return;
            }

            // Tracking GA Event before redirect
            trackFormSubmit(serviceField.value);

            // Constructing WhatsApp pre-filled text
            // Format:
            // Hi, I want pest control service.
            // Name: [value]
            // Address: [value]
            // Service Needed: [value]
            // Phone: [value]
            // Message: [value] (if any)
            let messageText = `Hi, I want pest control service.\n`;
            messageText += `Name: ${nameField.value.trim()}\n`;
            messageText += `Address: ${addressField.value.trim()}\n`;
            messageText += `Service Needed: ${serviceField.value}\n`;
            messageText += `Phone: ${phoneField.value.trim()}`;

            if (messageField.value.trim()) {
                messageText += `\nMessage: ${messageField.value.trim()}`;
            }

            // Encode text for URL safety
            const urlEncodedMessage = encodeURIComponent(messageText);

            // Create WhatsApp Link
            const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${urlEncodedMessage}`;

            // Reset form inputs after redirection layout
            leadForm.reset();

            // Redirect in a new tab
            window.open(whatsappUrl, '_blank');
        });