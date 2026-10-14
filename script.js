/* ==========================================
   CYBER KIDS - script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Прелоадер
    const loader = document.getElementById("preloader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
                setTimeout(() => loader.remove(), 1000);
            }, 2000);
        });
        // Страховка на случай долгой загрузки медиа
        setTimeout(() => {
            if (loader.parentNode) {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
                setTimeout(() => loader.remove(), 1000);
            }
        }, 4000);
    }

    // 3. Анимация появления блоков при прокрутке
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".course-card, .adv-card, .stat-box, .competition-card, .review, .gallery-grid img, .contacts-grid div").forEach(el => {
        el.classList.add("hidden");
        observer.observe(el);
    });

    // 4. Анимированные счетчики
    const counters = document.querySelectorAll(".counter");
    const runCounter = (counter) => {
        const target = +counter.dataset.target;
        let count = 0;
        const speed = target / 100;
        const update = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "+";
            }
        };
        update();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 5. Кнопка «Наверх»
    const topBtn = document.createElement("button");
    topBtn.innerHTML = "↑";
    topBtn.className = "topButton";
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            topBtn.classList.add("active");
        } else {
            topBtn.classList.remove("active");
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 6. Мобильное меню (бургер)
    const headerContainer = document.querySelector("header .container");
    const nav = document.querySelector("nav");
    if (headerContainer && nav) {
        const burger = document.createElement("div");
        burger.className = "burger";
        burger.innerHTML = `<span></span><span></span><span></span>`;
        headerContainer.appendChild(burger);

        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            nav.classList.toggle("active");
        });

        // Закрывать меню при клике на пункт
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                burger.classList.remove("active");
                nav.classList.remove("active");
            });
        });
    }

    // 7. Lightbox галереи
    const images = document.querySelectorAll(".gallery-grid img");
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    document.body.appendChild(lightbox);

    images.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.classList.add("open");
            lightbox.innerHTML = `<img src="${img.src}" alt="Увеличенное фото">`;
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("open");
    });

    // 8. Кибер-сеть (Canvas Particles)
    const canvas = document.getElementById("particles");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particles = [];
        const PARTICLE_COUNT = 60;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = "#39ff14";
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(57,255,20,${1 - dist / 130})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 9. Эффект свечения за курсором
    const glow = document.createElement("div");
    glow.className = "mouseGlow";
    document.body.appendChild(glow);

    document.addEventListener("mousemove", e => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });

    // 10. Робот-помощник и смена фраз
    const robot = document.getElementById("robotAssistant");
    const robotMessage = document.getElementById("robotMessage");

    if (robot && robotMessage) {
        const robotMessages = [
            "<strong>Привет! 👋</strong><br>Хочешь собрать своего первого робота?",
            "<strong>Я робот Cyber Van 🤖</strong><br>Я помогу тебе начать путь в робототехнике!",
            "<strong>Готов к миссии! 🚀</strong><br>Запишись на пробный урок.",
            "<strong>Создавай будущее! ⚡</strong><br>Научись программировать настоящих роботов.",
            "<strong>Мне нужен напарник! 🧠</strong><br>Соберём робота вместе?"
        ];

        let messageIndex = 0;

        setTimeout(() => {
            robot.classList.add("show");
            robotMessage.classList.add("show");
        }, 2500);

        setInterval(() => {
            messageIndex = (messageIndex + 1) % robotMessages.length;
            robotMessage.innerHTML = robotMessages[messageIndex];
            robotMessage.classList.add("show");
        }, 6000);
    }

    // 11. Отправка формы без перезагрузки (Formspree) + модальное окно
    const signupForm = document.getElementById('signupForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (signupForm && successModal) {
        const showModal = () => successModal.style.display = 'flex';
        const closeModal = () => successModal.style.display = 'none';

        closeModalBtn.addEventListener('click', closeModal);
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeModal();
        });

        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Отправка...';
            btn.disabled = true;

            const formData = new FormData(this);

            try {
                const response = await fetch('https://formspree.io/f/mppwlpag', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showModal();
                    this.reset();
                } else {
                    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
                }
            } catch (error) {
                console.error('Ошибка соединения:', error);
                alert('Ошибка соединения с сервером.');
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

});