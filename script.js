/* ===================================================================
   SEE the Green Future Summit (SEEGFS)
   Interactive JavaScript + i18n Engine
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================
    //  i18n — Language System
    // ========================

    const LANG_FLAGS = { en: '🇬🇧', zh: '🇨🇳', fr: '🇫🇷' };
    const LANG_CODES = { en: 'EN', zh: '中文', fr: 'FR' };
    const LANG_TITLES = {
        en: 'SEE the Green Future Summit — Sino-European Exchange',
        zh: 'SEE绿色未来峰会 — 中欧交流协会',
        fr: 'SEE the Green Future Summit — Le Sino-European Exchange'
    };

    let currentLang = localStorage.getItem('gfs-lang') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('gfs-lang', lang);

        // Add transition class
        document.body.classList.add('lang-transitioning');

        setTimeout(() => {
            // Update all data-i18n elements (text only)
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key] && translations[key][lang]) {
                // Use innerHTML instead of textContent if it has data-i18n-html
                // Actually, since we need strong tags, let's just use innerHTML for everything safely or specifically for data-i18n-html.
                // Wait, if I change textContent to innerHTML here, it will affect all normal data-i18n tags. That is perfectly fine since the translations are trusted.
                el.innerHTML = translations[key][lang];
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

        const rand = Math.random();
        let color;
        if (rand > 0.7) {
            color = `rgba(251, 191, 36, ${Math.random() * 0.4 + 0.1})`;
        } else if (rand > 0.4) {
            color = `rgba(45, 212, 191, ${Math.random() * 0.4 + 0.1})`;
        } else {
            color = `rgba(52, 211, 153, ${Math.random() * 0.4 + 0.1})`;
        }

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
    //  Pillar & Focus card stagger
    // ========================

    const staggerContainers = [
        { selector: '.pillar-card', parentSelector: '.pillars-grid' }
    ];

    staggerContainers.forEach(({ selector, parentSelector }) => {
        const items = document.querySelectorAll(selector);
        if (items.length === 0) return;

        const observerStagger = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const parent = entry.target.closest(parentSelector);
                    if (parent) {
                        const children = parent.querySelectorAll(selector);
                        children.forEach((item, i) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, i * 120);
                        });
                    }
                    observerStagger.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(24px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        if (items.length > 0) {
            observerStagger.observe(items[0]);
        }
    });

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

    // ========================
    //  Contact Modal
    // ========================

    const contactModal = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');
    const contactBtn = document.getElementById('contactBtn');
    const contactBtnPartner = document.getElementById('contactBtnPartner');

    function openModal() {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (contactBtn) contactBtn.addEventListener('click', openModal);
    if (contactBtnPartner) contactBtnPartner.addEventListener('click', openModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);

    // Close on overlay click
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) closeModal();
    });

    // ========================
    //  Logo PNG Downloader
    // ========================
    const downloadLogoLink = document.getElementById('downloadLogoLink');
    if (downloadLogoLink) {
        downloadLogoLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            const width = 1024;
            const height = 341;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 36" width="${width}" height="${height}">
                <defs>
                    <linearGradient id="gfs-leaf-grad-export" x1="15" y1="10" x2="85" y2="70">
                        <stop offset="0%" stop-color="#10b981" />
                        <stop offset="100%" stop-color="#059669" />
                    </linearGradient>
                    <linearGradient id="gfs-text-grad-export" x1="44" y1="0" x2="86" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="#10b981" />
                        <stop offset="100%" stop-color="#059669" />
                    </linearGradient>
                </defs>
                <g transform="scale(0.36)">
                    <path d="M50 12 C30 12 15 28 15 50 C15 68 28 80 48 83 C49 81 51 81 52 83 C72 80 85 68 85 48 C85 28 70 12 50 12Z" fill="url(#gfs-leaf-grad-export)" stroke="#059669" stroke-width="2" stroke-linejoin="round" />
                    <path d="M50 15 L50 78" stroke="#059669" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M50 35 C40 31 30 35 24 40" stroke="#059669" stroke-width="1.5" stroke-linecap="round" fill="none" />
                    <path d="M50 50 C60 46 70 48 76 52" stroke="#059669" stroke-width="1.5" stroke-linecap="round" fill="none" />
                    <path d="M50 65 C42 61 34 62 26 66" stroke="#059669" stroke-width="1.5" stroke-linecap="round" fill="none" />
                </g>
                <text x="44" y="26" fill="url(#gfs-text-grad-export)" font-family="'Outfit', sans-serif" font-weight="700" font-size="20px" letter-spacing="0.08em">GFS</text>
            </svg>`;
            
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const URL = window.URL || window.webkitURL || window;
            const blobURL = URL.createObjectURL(svgBlob);
            
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);
                
                const pngURL = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = pngURL;
                downloadLink.download = 'gfs-logo.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                URL.revokeObjectURL(blobURL);
            };
            img.src = blobURL;
        });
    }
});
