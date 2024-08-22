// Toggle navigation menu
// document.getElementById('menuIcon').addEventListener('click', function () {
//     var navLinks = document.getElementById('navLinks');
//     navLinks.classList.toggle('active');
// });

// 3D Card Effect
const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 40;

const calcValue = (a, b) => (a / b * range - range / 2).toFixed(1);

let timeout;
document.addEventListener('mousemove', ({ x, y }) => {
    if (timeout) cancelAnimationFrame(timeout);
    
    timeout = requestAnimationFrame(() => {
        const yValue = calcValue(y, window.innerHeight);
        const xValue = calcValue(x, window.innerWidth);

        // Update cards transform
        cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

        // Update images and backgrounds with optimized loops
        images.forEach(image => {
            image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
        });

        backgrounds.forEach(background => {
            background.style.backgroundPosition = `${xValue * 0.45}px ${-yValue * 0.45}px`;
        });
    });
});

