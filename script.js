/* =================================
   1. CUSTOM MOUSE CURSOR
================================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

if (window.matchMedia("(pointer: fine)").matches && cursor && follower) {

    window.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

    });

    function animateCursor() {

        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        follower.style.left = followerX + "px";
        follower.style.top = followerY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();

    document.querySelectorAll("a, button").forEach((element) => {

        element.addEventListener("mouseenter", () => {
            follower.classList.add("hover");
        });

        element.addEventListener("mouseleave", () => {
            follower.classList.remove("hover");
        });

    });

}


/* =================================
   2. 3D MOUSE MOVEMENT
================================= */

const scene = document.querySelector("#scene");
const heroVisual = document.querySelector(".hero-visual");

if (
    window.matchMedia("(pointer: fine)").matches &&
    heroVisual &&
    scene
) {

    heroVisual.addEventListener("mousemove", (e) => {

        const rect = heroVisual.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 25;
        const rotateX = (0.5 - y) * 25;

        scene.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    heroVisual.addEventListener("mouseleave", () => {

        scene.style.transform = "";

    });

}


/* =================================
   3. TYPING ANIMATION
================================= */

const typingElement = document.querySelector("#typing");

const words = [
    "modern websites.",
    "creative designs.",
    "interactive interfaces.",
    "responsive experiences.",
    "new digital ideas."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent =
        currentWord.substring(0, charIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex === currentWord.length) {

        deleting = true;
        speed = 1500;

    }

    else if (deleting && charIndex === 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        speed = 400;

    }

    setTimeout(typeEffect, speed);

}

typeEffect();


/* =================================
   4. PARTICLE BACKGROUND
================================= */

const canvas = document.querySelector("#particles");
const ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];

function resizeCanvas() {

    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

if (canvas && ctx) {

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    class Particle {

        constructor() {

            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;

            this.size = Math.random() * 2 + 0.5;

            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;

            this.opacity = Math.random() * 0.6 + 0.2;

        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > window.innerWidth) {
                this.speedX *= -1;
            }

            if (this.y < 0 || this.y > window.innerHeight) {
                this.speedY *= -1;
            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0, 217, 255, ${this.opacity})`;

            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00d9ff";

            ctx.fill();

            ctx.shadowBlur = 0;

        }

    }


    function createParticles() {

        particles = [];

        const amount = Math.min(
            80,
            Math.floor(window.innerWidth / 15)
        );

        for (let i = 0; i < amount; i++) {

            particles.push(new Particle());

        }

    }

    createParticles();

    window.addEventListener("resize", createParticles);


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        particles.forEach((particle) => {

            particle.update();
            particle.draw();

        });

        requestAnimationFrame(animateParticles);

    }

    animateParticles();

}


/* =================================
   5. SCROLL REVEAL
================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach((element) => {

        observer.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("active");

    });

}


/* =================================
   6. 3D PROJECT CARD TILT
================================= */

const cards = document.querySelectorAll("[data-tilt]");

if (window.matchMedia("(pointer: fine)").matches) {

    cards.forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        });

    });

}


/* =================================
   7. MOBILE NAVIGATION
================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    document.querySelectorAll(".nav-links a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });

}


/* =================================
   8. PROJECT CARD GLOW POSITION
================================= */

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background =
            `radial-gradient(circle at ${x}px ${y}px, #18334a, #101827 65%)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background = "#101827";

    });

});