document.addEventListener('DOMContentLoaded', function() {

    // Terminal Typewriter Effect
    function initTerminalTypewriter() {
        const commands = [
            { cmd: 'whoami', output: 'Rudyard Fuster - Tech Lead & Senior Software Engineer' },
            { cmd: 'cat skills.txt', output: 'Ruby on Rails, React.js, AWS, PostgreSQL, Redis, Docker...' },
            { cmd: 'git log --oneline', output: '• 10+ years building scalable web applications\n• Led teams of 20+ developers\n• Implemented CI/CD with Jenkins & GitHub Actions\n• Built Data Warehouse with BigQuery\n• Y Combinator 2021 winner' },
            { cmd: 'ls experience/', output: 'poliglota_tech_lead.rb  poliglota_head_of_tech.rb  senior_fullstack.rb' }
        ];

        let currentCommand = 0;
        let currentChar = 0;
        let isTyping = false;

        const commandElement = document.getElementById('typewriter-command');
        const outputElement = document.getElementById('terminal-output');

        function typeCommand() {
            if (!isTyping && currentCommand < commands.length) {
                isTyping = true;
                const cmd = commands[currentCommand].cmd;

                function typeChar() {
                    if (currentChar < cmd.length) {
                        commandElement.textContent += cmd[currentChar];
                        currentChar++;
                        setTimeout(typeChar, 100);
                    } else {
                        setTimeout(() => {
                            const output = commands[currentCommand].output;
                            const outputLine = document.createElement('div');
                            outputLine.innerHTML = `<span class="prompt">rudyard@portfolio:~$ </span><span style="color: white;">${cmd}</span><br>${output.replace(/\n/g, '<br>')}`;
                            outputElement.appendChild(outputLine);

                            commandElement.textContent = '';
                            currentChar = 0;
                            currentCommand++;
                            isTyping = false;

                            if (currentCommand < commands.length) {
                                setTimeout(typeCommand, 2000);
                            }
                        }, 1000);
                    }
                }

                typeChar();
            }
        }

        // Start terminal animation after a delay
        setTimeout(() => {
            typeCommand();
        }, 3000);
    }

    initTerminalTypewriter();

    // Binary Clock
    function initBinaryClock() {
        function createBinaryDots(containerId, maxValue) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = '';
            const bits = maxValue === 6 ? 3 : 4; // 3 bits for 0-5, 4 bits for 0-9

            for (let i = bits - 1; i >= 0; i--) {
                const dot = document.createElement('div');
                dot.className = 'binary-dot';
                dot.dataset.bit = i;
                container.appendChild(dot);
            }
        }

        function updateBinaryDisplay() {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            updateBinaryValue('hours-tens', Math.floor(hours / 10), 3);
            updateBinaryValue('hours-ones', hours % 10, 4);
            updateBinaryValue('minutes-tens', Math.floor(minutes / 10), 3);
            updateBinaryValue('minutes-ones', minutes % 10, 4);
            updateBinaryValue('seconds-tens', Math.floor(seconds / 10), 3);
            updateBinaryValue('seconds-ones', seconds % 10, 4);
        }

        function updateBinaryValue(containerId, value, bits) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const dots = container.querySelectorAll('.binary-dot');

            for (let i = 0; i < bits; i++) {
                const bitValue = (value >> i) & 1;
                const dotIndex = bits - 1 - i;
                if (dots[dotIndex]) {
                    if (bitValue) {
                        dots[dotIndex].classList.add('active');
                    } else {
                        dots[dotIndex].classList.remove('active');
                    }
                }
            }
        }

        // Initialize binary displays
        createBinaryDots('hours-tens', 2);
        createBinaryDots('hours-ones', 9);
        createBinaryDots('minutes-tens', 5);
        createBinaryDots('minutes-ones', 9);
        createBinaryDots('seconds-tens', 5);
        createBinaryDots('seconds-ones', 9);

        // Update every second
        updateBinaryDisplay();
        setInterval(updateBinaryDisplay, 1000);
    }

    initBinaryClock();

    // Konami Code Easter Egg
    function initKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];

        let userInput = [];
        let konamiModal = null;

        function createKonamiModal() {
            konamiModal = document.createElement('div');
            konamiModal.className = 'konami-modal';
            konamiModal.innerHTML = `
                <div class="konami-content">
                    <div class="konami-header">
                        <h2>🎉 Konami Code Activated!</h2>
                        <button class="konami-close" onclick="closeKonami()">&times;</button>
                    </div>
                    <div class="konami-body">
                        <div class="ascii-celebration">
                            <pre>
    ╔══════════════════════════════════╗
    ║  🚀 DEVELOPER MODE ACTIVATED! 🚀  ║
    ║                                  ║
    ║    You found the secret code!    ║
    ║                                  ║
    ║   Greetings fellow developer!    ║
    ║     Thanks for exploring! 🤓     ║
    ╚══════════════════════════════════╝
                            </pre>
                        </div>
                        <div class="secret-stats">
                            <h3>🎯 Secret Developer Stats:</h3>
                            <ul>
                                <li>☕ Coffee consumed: 9999+ cups</li>
                                <li>🐛 Bugs fixed: Countless</li>
                                <li>🌙 Late nights coding: Too many</li>
                                <li>💡 Eureka moments: Priceless</li>
                                <li>🎮 Easter eggs hidden: This one!</li>
                            </ul>
                        </div>
                        <div class="secret-message">
                            <p>🎊 Congratulations! You've unlocked the secret developer achievement!</p>
                            <p>Keep exploring, keep coding, and never stop learning! 💻✨</p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(konamiModal);

            // Close function for global scope
            window.closeKonami = function() {
                if (konamiModal) {
                    konamiModal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(konamiModal);
                        konamiModal = null;
                    }, 300);
                }
            };

            // Animate in
            setTimeout(() => {
                konamiModal.style.opacity = '1';
            }, 50);
        }

        document.addEventListener('keydown', function(event) {
            userInput.push(event.code);

            // Keep only the last 10 inputs
            if (userInput.length > konamiCode.length) {
                userInput.shift();
            }

            // Check if the last inputs match the Konami code
            if (userInput.length === konamiCode.length) {
                let isMatch = true;
                for (let i = 0; i < konamiCode.length; i++) {
                    if (userInput[i] !== konamiCode[i]) {
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch && !konamiModal) {
                    createKonamiModal();
                    userInput = []; // Reset after activation
                }
            }
        });
    }

    initKonamiCode();

    // Developer Console Messages
    function initConsoleMessages() {
        const styles = {
            title: 'color: #00ff41; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00ff41;',
            welcome: 'color: #6366f1; font-size: 16px; font-weight: bold;',
            code: 'color: #8b5cf6; font-size: 14px; background: #1e1e1e; padding: 10px; border-radius: 5px; font-family: monospace;',
            easter: 'color: #f59e0b; font-size: 12px; font-style: italic;',
            warning: 'color: #ef4444; font-size: 14px; font-weight: bold;',
            info: 'color: #06b6d4; font-size: 12px;'
        };

        console.log('%c🚀 Welcome to Rudyard\'s Portfolio!', styles.title);
        console.log('%cHey there, curious developer! 👨‍💻', styles.welcome);
        console.log('%cI see you\'re checking under the hood. I like that! 🔍', styles.info);

        console.log('\n%c📊 Portfolio Stats:', styles.welcome);
        console.log('%c• Lines of code: 1000+\n• Coffee consumed: ☕☕☕☕☕\n• Bugs fixed: Countless\n• Easter eggs: Try the Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', styles.code);

        console.log('\n%c🎮 Hidden Features:', styles.easter);
        console.log('%c• Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', styles.info);
        console.log('%c• Watch the Matrix rain in the background', styles.info);
        console.log('%c• Check out the binary clock in the hero section', styles.info);
        console.log('%c• Terminal animation shows my skills', styles.info);

        console.log('\n%c⚠️ Security Notice:', styles.warning);
        console.log('%cThis is a portfolio website. No sensitive data is stored here.', styles.info);
        console.log('%cBut hey, if you\'re looking to hire, let\'s talk! 💼', styles.welcome);

        console.log('\n%c🛠️ Built with:', styles.welcome);
        console.log('%cVanilla JavaScript, CSS3, HTML5, and lots of ❤️', styles.code);

        console.log('\n%c📬 Want to connect?', styles.welcome);
        console.log('%cruyar410@gmail.com | github.com/ruyar4', styles.info);

        console.log('\n%c🎨 ASCII Art Time!', styles.easter);
        console.log(`%c
    ██████╗ ██╗   ██╗██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗
    ██╔══██╗██║   ██║██╔══██╗╚██╗ ██╔╝██╔══██╗██╔══██╗██╔══██╗
    ██████╔╝██║   ██║██║  ██║ ╚████╔╝ ███████║██████╔╝██║  ██║
    ██╔══██╗██║   ██║██║  ██║  ╚██╔╝  ██╔══██║██╔══██╗██║  ██║
    ██║  ██║╚██████╔╝██████╔╝   ██║   ██║  ██║██║  ██║██████╔╝
    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
        `, 'color: #00ff41; font-family: monospace; font-size: 10px;');

        // Fun interaction
        window.hire = function() {
            console.log('%c🎉 Awesome! Let\'s build something amazing together!', 'color: #10b981; font-size: 18px; font-weight: bold;');
            console.log('%c📧 Reach out: ruyar410@gmail.com', 'color: #6366f1; font-size: 14px;');
            console.log('%c🔗 GitHub: github.com/ruyar4', 'color: #6366f1; font-size: 14px;');
            console.log('%c💼 I\'m ready when you are! 🚀', 'color: #f59e0b; font-size: 14px;');
        };

        console.log('\n%c💡 Pro tip: Type hire() in this console if you want to work together! 🤝', styles.easter);
    }

    initConsoleMessages();
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optimized header scroll effect with throttling
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrollTicking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
        scrollTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            requestAnimationFrame(updateHeader);
            scrollTicking = true;
        }
    }, { passive: true });

    // Optimize scroll animations with throttling
    let ticking = false;

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        if (!ticking) {
            requestAnimationFrame(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-on-scroll');
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    }, observerOptions);

    // Observe elements efficiently
    const elementsToObserve = [
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.skill-category'),
        ...document.querySelectorAll('.contact-card'),
        ...document.querySelectorAll('.education-item')
    ];

    elementsToObserve.forEach(item => observer.observe(item));

    // Optimized navigation highlighting with throttling
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    let navTicking = false;

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        navTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!navTicking) {
            requestAnimationFrame(highlightNavigation);
            navTicking = true;
        }
    }, { passive: true });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero h1');
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < titleText.length) {
            heroTitle.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);

    // Skill tags hover effect
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add mobile menu styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 2rem;
                transition: left 0.3s ease;
                z-index: 999;
            }

            .nav-menu.active {
                left: 0;
            }

            .nav-menu li {
                margin: 1rem 0;
            }

            .nav-menu a {
                font-size: 1.2rem;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                transition: all 0.3s ease;
            }

            .nav-menu a:hover {
                background: var(--surface);
                transform: translateX(10px);
            }

            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }

            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }

            .nav-menu a.active {
                color: white;
                background: var(--primary-color);
            }
        }
    `;
    document.head.appendChild(style);

    // Simplified parallax effect with throttling
    let parallaxTicking = false;

    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    }, { passive: true });

    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});