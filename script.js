/* ===================================================================
   China-Europe Green Strategy & Future Leadership Summit
   Interactive JavaScript + i18n Engine
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================
    //  i18n — Language System
    // ========================

    const LANG_FLAGS = { en: '🇬🇧', zh: '🇨🇳', fr: '🇫🇷' };
    const LANG_CODES = { en: 'EN', zh: '中文', fr: 'FR' };
    const LANG_TITLES = {
        en: 'China-Europe Green Strategy & Future Leadership Summit',
        zh: '中欧绿色战略与未来领导力峰会',
        fr: 'Sommet Chine-Europe Stratégie Verte & Leadership du Futur'
    };

    let currentLang = localStorage.getItem('cegs-lang') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('cegs-lang', lang);

        // Add transition class
        document.body.classList.add('lang-transitioning');

        setTimeout(() => {
            // Update all data-i18n elements (text only)
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key] && translations[key][lang]) {
                    el.textContent = translations[key][lang];
                }
            });

            // Update all data-i18n-html elements (with HTML like <em>, <strong>)
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                if (translations[key] && translations[key][lang]) {
                    el.innerHTML = translations[key][lang];
                }
            });

            // Update <html> lang attribute
            document.documentElement.setAttribute('lang', lang);
            document.body.setAttribute('data-lang', lang);

            // Update page title
            document.title = LANG_TITLES[lang];

            // Update language switcher display
            document.getElementById('langFlag').textContent = LANG_FLAGS[lang];
            document.getElementById('langCode').textContent = LANG_CODES[lang];

            // Update active state in dropdown
            document.querySelectorAll('.lang-option').forEach(opt => {
                opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
            });

            // Remove transition class
            document.body.classList.remove('lang-transitioning');
        }, 200);
    }

    // Language switcher toggle
    const langSwitcher = document.getElementById('langSwitcher');
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');

    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langSwitcher.classList.toggle('open');
    });

    // Language option click
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            langSwitcher.classList.remove('open');
        });
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
        langSwitcher.classList.remove('open');
    });

    // Prevent dropdown from closing when clicking inside it
    langDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Initialize language on load
    setLanguage(currentLang);


    // ========================
    //  Navbar scroll effect
    // ========================

    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========================
    //  Mobile nav toggle
    // ========================

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ========================
    //  Active nav highlighting
    // ========================

    const sections = document.querySelectorAll('.section, .hero');
    const navLinkElements = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(section => observerNav.observe(section));

    // ========================
    //  Scroll reveal animations
    // ========================

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerReveal.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => observerReveal.observe(el));

    // ========================
    //  Hero particle system
    // ========================

    const particleContainer = document.getElementById('heroParticles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const duration = Math.random() * 12 + 8;
        const delay = Math.random() * 6;

        const isGold = Math.random() > 0.7;
        const color = isGold
            ? `rgba(251, 191, 36, ${Math.random() * 0.4 + 0.1})`
            : `rgba(52, 211, 153, ${Math.random() * 0.4 + 0.1})`;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            background: ${color};
            box-shadow: 0 0 ${size * 3}px ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        particleContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    // Initial batch
    for (let i = 0; i < 15; i++) {
        createParticle();
    }

    // Continuous spawning
    setInterval(() => {
        if (particleContainer.children.length < 30) {
            createParticle();
        }
    }, 800);

    // ========================
    //  Smooth anchor scrolling
    // ========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================
    //  Timeline stagger animation
    // ========================

    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerTimeline = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observerTimeline.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        observerTimeline.observe(item);
    });

    // Override visible class for timeline items
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ========================
    //  Strength cards stagger
    // ========================

    const strengthItems = document.querySelectorAll('.strength-item');
    const observerStrength = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const items = entry.target.parentElement.querySelectorAll('.strength-item');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, i * 100);
                });
                observerStrength.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    strengthItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    if (strengthItems.length > 0) {
        observerStrength.observe(strengthItems[0]);
    }

    // ========================
    //  Stat counter animation
    // ========================

    const statNumbers = document.querySelectorAll('.stat-number');
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const num = parseInt(text);
                if (!isNaN(num) && num <= 100) {
                    let current = 0;
                    const increment = Math.ceil(num / 30);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            current = num;
                            clearInterval(timer);
                        }
                        el.textContent = current;
                    }, 40);
                }
                observerStats.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observerStats.observe(el));
});
