document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            let offsetTop = targetElement.offsetTop - headerHeight - 20;

            if (targetId === '#home') {
                offsetTop = 0;
            }

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            this.closest('.nav-item').classList.add('active');
        });
    });

    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Kích hoạt fade-in cho content section
                // Không cần thêm animate-title vào đây vì section-title::after đã có animation riêng
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Kích hoạt animation cho section-title::after khi nó xuất hiện
    document.querySelectorAll('.section-title').forEach(title => {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Lớp 'show-line' không tồn tại trong CSS của bạn, animation expandLine đã được định nghĩa trực tiếp cho ::after
                    // Vì vậy, không cần thêm class ở đây. Animation sẽ tự động chạy khi section-title hiển thị.
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        titleObserver.observe(title);
    });


    const highlightNavItem = () => {
        let currentSectionId = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            const linkHref = item.querySelector('a').getAttribute('href');
            if (linkHref === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });

        if (scrollPosition === 0) {
            document.querySelector('.nav-item a[href="#home"]').closest('.nav-item').classList.add('active');
        }
    };

    window.addEventListener('scroll', highlightNavItem);
    highlightNavItem();

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioModal = document.getElementById('portfolio-modal');
    const portfolioModalTitle = portfolioModal.querySelector('#modal-title');
    const portfolioModalDescription = portfolioModal.querySelector('#modal-description');
    const portfolioCloseButton = portfolioModal.querySelector('.close-button');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');

            portfolioModalTitle.textContent = title;
            portfolioModalDescription.textContent = description;
            portfolioModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    portfolioCloseButton.addEventListener('click', () => {
        portfolioModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === portfolioModal) {
            portfolioModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    const skillItems = document.querySelectorAll('.skills-grid .skill-item');
    const skillDetailModal = document.getElementById('skill-detail-modal');
    const skillModalTitle = skillDetailModal.querySelector('#skill-modal-title');
    const skillNameDisplay = skillDetailModal.querySelector('#skill-name-display');
    const currentSkillBar = skillDetailModal.querySelector('#current-skill-bar');
    const skillCloseButton = skillDetailModal.querySelector('.close-button');

    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            const skillName = item.getAttribute('data-skill-name');
            const skillLevel = item.getAttribute('data-level');

            skillModalTitle.textContent = `Mức độ Kỹ năng: ${skillName}`;
            skillNameDisplay.textContent = skillName;
            currentSkillBar.setAttribute('data-level', skillLevel);
            currentSkillBar.style.width = '0%'; // Reset width to 0 for animation

            skillDetailModal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                currentSkillBar.style.width = `${skillLevel}%`; // Start animation after a slight delay
            }, 100);
        });
    });

    skillCloseButton.addEventListener('click', () => {
        skillDetailModal.style.display = 'none';
        document.body.style.overflow = '';
        currentSkillBar.style.width = '0%'; // Reset bar width when closing
    });

    window.addEventListener('click', (event) => {
        if (event.target === skillDetailModal) {
            skillDetailModal.style.display = 'none';
            document.body.style.overflow = '';
            currentSkillBar.style.width = '0%'; // Reset bar width when clicking outside
        }
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã gửi tin nhắn! Tôi sẽ liên hệ lại với bạn sớm nhất.');
            contactForm.reset();
        });
    }

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            header.style.borderBottom = '1px solid #e2e8f0';
        }
    });
});